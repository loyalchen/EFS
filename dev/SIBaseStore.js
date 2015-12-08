import {EventEmitter} from 'events';
import gStyle from './globalStyle';
import async from 'async';
import $ from 'jquery';
import _ from 'underscore';


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
			forceUpdating:false,
			formatFunc: props.formatFunc,
			detectCompareFunc: props.detectCompareFunc,
			errorFunc: props.errorFunc
		}

		this.analyze = new AnalyzedData(props.analyzeOption);
	}

	filterCollection() {
		return this.analyze.filterCollection(this.formattedData, this.filter)
	}

	resetFilter() {
		this.filter = {};
	}

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
		this.filterOption = this.analyze.getFilterOption(this.formattedData, this.filter)
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
			// pageService.loadingShow('Fetching data...');
			async.waterfall([
				function(cb) {
					that.getData(cb);
				},
				function(cb) {
					// pageService.loadingChangeMessage('Analysing data...');
					that.analyseCollection();
					that.filterCollection();
					// pageService.loadingHide();
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
		}else{
			that.detectData();
			return;
		}
	}

	stopAutoSync(){
		this.options.autoSync = false;
	}

	setIntervalProcess(period) {
		var that = this;
		if(!that.options.autoSync){
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


class AnalyzedData {
	constructor(props) {
		this.options = {};
		this.options.filterColumnNames = props.filterColumnNames;
	}

	getFilterOption(data, currentFilter) {
		var columnNames = this.options.filterColumnNames;
		if (!columnNames || columnNames.length == 0) {
			return {};
		}
		var checkObj = {},
			result = {},
			i,
			k,
			CHECK_VALUE = 'checkValue',
			oldData = {};

		for (i = columnNames.length; i--;) {
			checkObj[columnNames[i]] = {};
			result[columnNames[i]] = [];
		}

		if (!_.isEmpty(currentFilter)) {
			for (k = columnNames.length; k--;) {
				oldData[columnNames[k]] = [];
				angular.forEach(currentFilter[columnNames[k]], function(v, i) {
					// if (v.checked) {
					oldData[columnNames[k]].push(v);
					// }
				});
			}
		}

		for (i = data.length; i--;) {
			(function(i) {
				var item = data[i];
				for (k = columnNames.length; k--;) {
					var propName = columnNames[k];
					if (item[propName] && item[propName].toString() != '') {
						if (!(checkObj[propName].hasOwnProperty(item[propName]) && checkObj[propName][item[propName]] == CHECK_VALUE)) {
							result[propName].push({
								value: item[propName],
								text: item[propName],
								checked: !_.isEmpty(currentFilter) ? oldData[propName].indexOf(item[propName]) != -1 : false
							});
							checkObj[propName][item[propName]] = CHECK_VALUE;
						}
					}
				}
			})(i);
		}
		this.addSpecialFilterOptions(result, oldData);
		return result;
	}

	filterCollection(data, filterOption) {
		//var result = angular.copy(data);
		var result = $.extend([],data);
		for (var prop in filterOption) {
			if (filterOption[prop].length > 0) {
				for (var i = result.length; i--;) {
					if (filterOption[prop].indexOf('_Blank') != -1) {
						if (filterOption[prop].indexOf(result[i][prop]) == -1 && result[i][prop] != '' && result[i][prop]) {
							(function(i) {
								result.splice(i, 1);
							})(i);
						}
					} else if (filterOption[prop].indexOf('_Sanction Country') != -1) { //there is no filter has both 'sanction country' and '_Blank', so in order to inprove speed,just use else if
						if (filterOption[prop].indexOf(result[i][prop]) == -1 && !ruleService.isSanctionCountry(result[i][prop])) {
							(function(i) {
								result.splice(i, 1);
							})(i);
						}
					} else if (filterOption[prop].indexOf(result[i][prop]) == -1) {
						(function(i) {
							result.splice(i, 1);
						})(i);
					}
				}
			}
		}
		return result;
	}

	addSpecialFilterOptions(filterOptions, currentFilter) {
		if (filterOptions.POR) {
			filterOptions.POR.push({
				value: '_Blank',
				text: '_Blank',
				checked: currentFilter.POR ? currentFilter.POR.indexOf('_Blank') != -1 : false
			});
		}
		if (filterOptions.POD) {
			filterOptions.POD.push({
				value: '_Sanction Country',
				text: '_Sanction Country',
				checked: currentFilter.POD ? currentFilter.POD.indexOf('_Sanction Country') != -1 : false
			});
		}
		if (filterOptions.FD) {
			filterOptions.FD.push({
				value: '_Sanction Country',
				text: '_Sanction Country',
				checked: currentFilter.FD ? currentFilter.FD.indexOf('_Sanction Country') != -1 : false
			});
		}
	}

}

module.exports = SIStore;