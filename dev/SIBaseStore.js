import {
	EventEmitter
}
from 'events';
import gStyle from './globalStyle';
import workflow from './workflow';
import async from 'async';
import request from 'superagent'
import noCache from 'superagent-no-cache'
import _ from 'underscore';
import Immutable from 'immutable';


var CHANGE_EVENT = 'data_change';
var HASNEW_EVENT = 'has_new_records';
var FILTER_EVENT = 'filter_change';


class SIStore extends EventEmitter {
	constructor(props) {
		super(props);
		if (!props) {
			throw new Error('Options is nessecary.');
		}
		this.options = {
			getDataUrl: props.getDataUrl,
			detectDataUrl: props.detectDataUrl,
			initializing: true,
			autoSync: true,
			forceUpdating: false,
			formatFunc: props.formatFunc,
			detectCompareFunc: props.detectCompareFunc,
			errorFunc: props.errorFunc
		}
		this.filter = Immutable.Map();

		this.analyze = new AnalyzedImmutableRequestData(props.analyzeOption);
	}

	changeFilter(filterArgs) {
		if (!filterArgs) {
			throw new Error('filter arg is null.');
		}
		var newFilter;
		if (filterArgs.selectValues === '') {
			newFilter = this.filter.set(filterArgs.filterName, Immutable.Set());
		} else {
			newFilter = this.filter.set(filterArgs.filterName, Immutable.Set(filterArgs.selectValues.split(gStyle.constV.delimiter)));
		}

		if (newFilter === this.filter) {
			return false;
		} else {
			this.filter = newFilter;
			return true;
		}
	}

	filterCollection() {
		return this.analyze.filterCollection(this.formattedData, this.filter)
	}


	getData(callback) {
		var that = this;
		request
			.get(that.options.getDataUrl)
			.use(noCache)
			.end(function(err, res) {
				if (err) {
					gStyle.debugLog('get data error.' + JSON.stringify(err));
					callback(JSON.stringify(err));
					return;
				}
				that.lastSyncTime = gStyle.formatTime();
				that.originalData = res.body;
				that.formattedData = that.options.formatFunc(res.body);
				gStyle.debugLog('get data success');
				callback(null);
			});
	}

	analyseCollection() {
		return this.analyze.getFilterOption(this.formattedData);
	}

	detectData() {
		var that = this;
		request
			.get(that.options.detectDataUrl)
			.use(noCache)
			.end(function(err, res) {
				if (err) {
					gStyle.debugLog('detect data error.' + data);
					return;
				}

				if (that.options.detectCompareFunc(that.originalData, res.body)) {
					that.hasNewRecords = true;
					that.emitHasNew();
				}
				that.lastSyncTime = gStyle.formatTime();
				gStyle.debugLog('detect data success');
			});

	}

	process(forceFetch) {
		//updating currently,then auto sync will suspend.
		var that = this;
		if (this.options.forceUpdating || this.hasNewRecords) {
			return;
		}
		if (forceFetch) {
			that.options.forceUpdating = true;
		}
		if (that.options.initializing || forceFetch === true) {
			async.waterfall([
				function(cb) {
					that.getData(cb);
				},
				function(cb) {
					that.analyseCollection();
					that.filterCollection();
					that.options.initializing = false;
					that.options.forceUpdating = false;
					that.emitDataChange();
				}
			], function(err, data) {
				if (err) {
					that.options.errorFunc(err, '');
				}
				if (forceFetch) {
					that.options.forceUpdating = false;
				}

			});
			return;
		} else {
			that.detectData();
			return;
		}
	}

	stopAutoSync() {
		this.options.autoSync = false;
	}

	setIntervalProcess(period) {
		var that = this;
		if (!that.options.autoSync) {
			return;
		}
		if (!period || isNaN(period)) {
			period = 10000;
		}
		that.process(false);
		setTimeout(function() {
			that.setIntervalProcess(period);
		}, period);
	}


	emitDataChange() {
		this.emit(CHANGE_EVENT);
	}

	emitHasNew() {
		this.emit(HASNEW_EVENT);
	}

	addHasNewListener(callback) {
		this.on(HASNEW_EVENT, callback);
	}

	removeHasNewListener(callback) {
		this.removeListener(HASNEW_EVENT, callback);
	}

	addChangeListener(callback) {
		this.on(CHANGE_EVENT, callback);
	}

	removeChangeListener(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	}
}


class AnalyzedImmutableRequestData {
	constructor(props) {
		this.options = {};
		this.options.filterColumnNames = props.filterColumnNames;
	}

	getFilterOption(data) {
		if (!data || data.length == 0) {
			return Immutable.Map();
		}
		if (!Immutable.List.isList(data)) {
			data = Immutable.List(data);
		}

		var result = Immutable.Map();

		var result = result.withMutations(map => {
			for (var item of this.options.filterColumnNames) {
				map.set(item, Immutable.Set());
			}
		});


		result = result.withMutations(map => {
			for (var [requestItemIndex, requestItemValue] of data.entries()) {
				for (var filterNameItem of this.options.filterColumnNames) {
					var columnValue = requestItemValue[filterNameItem];
					if (!columnValue) {
						continue;
					}
					var value = map.get(filterNameItem);
					var value2 = value.add(columnValue);
					if (value !== value2) {
						map.set(filterNameItem, value2);
					}
				}
			}
		});

		result = this.addSpecialFilterOptions(result);

		result = result.withMutations(map => {
			map.forEach((value, key, arr) => {
				var options = value.map(set => {
					return {
						value: set,
						label: set
					};
				});
				arr.set(key, options);
			});
		})
		return result;
	}

	filterCollection(data, filter) {
		var copiedData = Immutable.Seq(data);
		if (filter.size === 0) {
			return copiedData;
		}

		copiedData = copiedData.filter(item => {
			for (var [filterItemName, filterItemValue] of filter.entries()) {
				if (filterItemValue.size == 0) {
					continue;
				} else {
					if (!filterItemValue.has(item[filterItemName]) || (filterItemValue.has('_Blank') && (item[filterItemName] !== null || item[filterItemName] !== '')) || (filterItemValue.has('_Sanction Country') && !workflow.isSanctionCountry(item[filterItemName]))) {
						return false;
					}
				}
			}
			return true;
		});
		return copiedData;
	}

	addSpecialFilterOptions(filterOptions) {
		if (!Immutable.Map.isMap(filterOptions)) {
			filterOptions = Immutable.Map(filterOptions);
		}

		filterOptions.withMutations(map => {
			if (map.has('POR')) {
				var value = map.get('POR');
				var value2 = value.add('_Blank');
				if (value !== value2) {
					map.set('POR', value2);
				}
			}

			if (map.has('POD')) {
				var value = map.get('POD');
				var value2 = value.add('_Sanction Country');
				if (value !== value2) {
					map.set('POD', value2);
				}
			}

			if (map.has('FD')) {
				var value = map.get('FD');
				var value2 = value.add('_Sanction Country');
				if (value !== value2) {
					map.set('FD', value2);
				}
			}

		});
		return filterOptions;
	}
}


module.exports = SIStore;