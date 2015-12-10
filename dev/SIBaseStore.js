import {
	EventEmitter
}
from 'events';
import gStyle from './globalStyle';
import workflow from './workflow';
import async from 'async';
import $ from 'jquery';
import _ from 'underscore';
import Immutable from 'immutable';


var CHANGE_EVENT = 'data_change';
var HASNEW_EVENT = 'has_new_records';


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

		this.analyze = new AnalyzedImmutableRequestData(props.analyzeOption);
	}

	filterCollection() {
		return this.analyze.filterCollection(this.formattedData, this.filter)
	}

	// resetFilter() {
	// 	this.filter = {};
	// }

	getData(callback) {
		var that = this;
		$.ajax({
			method: 'GET',
			url: that.options.getDataUrl,
			cache: false
		}).success(function(data, status) {
			that.lastSyncTime = gStyle.formatTime();
			that.originalData = data;
			that.formattedData = that.options.formatFunc(data);
			gStyle.debugLog('get data success');
			callback(null);
		}).error(function(data, status) {
			gStyle.debugLog('get data error.' + data);
			callback(data);
		});
	}

	analyseCollection() {
		//this.filterOption = 
		return this.analyze.getFilterOption(this.formattedData);
	}

	detectData() {
		var that = this;
		$.ajax({
			method: 'GET',
			url: that.options.detectDataUrl,
			cache: false
		}).success(function(data, status) {
			if (that.options.detectCompareFunc(that.originalData, data)) {
				that.hasNewRecords = true;
				that.emitHasNew();
			}
			that.lastSyncTime = gStyle.formatTime();
			gStyle.debugLog('detect data success');
		}).error(function(data, status) {
			gStyle.debugLog('detect data error.' + data);
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

		// var result = Immutable.Map(this.options.filterColumnNames.map(item => {
		// 	var temp = {};
		// 	temp[item] = Immutable.Set();
		// 	return temp;
		// }));

		result = result.withMutations(map => {
			for (var requestItem of data.entries()) {
				for (var filterNameItem of this.options.filterColumnNames) {
					var value = map.get(filterNameItem);
					var value2 = value.add(requestItem[filterNameItem]);
					if (value !== value2) {
						map.set(filterNameItem, value2);
					}
				}
			}
		});

		result = this.addSpecialFilterOptions(result);

		return result.map(item => {
			return {
				value: item,
				label: item
			};
		});
	}

	filterCollection(data, filter) {
		var copiedData = Immutable.Seq(data);
		filter = Immutable.Map(filter);
		if(filter.size === 0){
			return copiedData; 
		}
		copiedData.filter(item => {
			for (var filterItem of filter.entries()) {
				if (filterItem.value.size == 0) {
					continue;
				} else {
					if (!filterItem.value.has(item[filterItem.key]) || (filterItem.value.has('_Blank') && (item[filterItem.key] !== null || item[filterItem.key] !== '')) || (filterItem.value.has('_Sanction Country') && !workflow.isSanctionCountry(item[filterItem.key]))) {
						return false;
					}
				}
			}
			return true;
		})

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