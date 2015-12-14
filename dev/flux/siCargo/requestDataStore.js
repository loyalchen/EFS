import AppDispatcher from './dispatcher';
import Constant from './constant';
import {
	EventEmitter
}
from 'events';
import _ from 'underscore';
import gStyle from '../../../dev/globalStyle';
import SIBaseStore from '../../../dev/SIBaseStore';
import workflow from '../../../dev/workflow';

var CHANGE_EVENT = 'data_change';
var HASNEW_EVENT = 'has_new_records';


function formatData(data) {
	for (var i = data.length; i--;) {
		if (!data[i]) {
			data[i] = {};
		}
		if (!data[i].BookingNumber || data[i].BookingNumber == '') {
			data[i].BookingNumber = 'None';
		}
		data[i].ReceivedTime = gStyle.formatTime(data[i].ReceivedTime);
		data[i].RequestTime = gStyle.formatTime(data[i].RequestTime);
		data[i].CargoDTXTime = gStyle.formatTime(data[i].CargoDTXTime);
		data[i].DispatchTime = gStyle.formatTime(data[i].DispatchTime);
		data[i].AssignTime = gStyle.formatTime(data[i].AssignTime);
		data[i].IsProblem = data[i].IsProblem ? gStyle.constV.True : gStyle.constV.False;
		data[i].DisplayStatusName = workflow.DisplayStatusName(data[i]);
		data[i].isUpdateOne = false;
	}
	return data;
}

function detectCompare(originalData, newData) {
	var originalBkgs = _.map(originalData, function(item) {
		return item.BookingNumber;
	});
	var newBkgs = _.map(newData, function(item) {
		return item.BookingNumber;
	});
	var diff = _.difference(originalBkgs, newBkgs);
	if (diff.length > 0) {
		gStyle.debugLog(diff.join(','));
		return true;
	} else {
		return false;
	}
}

function errorAlert(data, status) {
	console.log(status + ' : ' + data);
}

var cargoStore = new SIBaseStore({
	getDataUrl: '/api/si/GetMainRequest?categoryId=3',
	detectDataUrl: '/api/si/DetectMainRequest?categoryId=3',
	analyzeOption: {
		filterColumnNames: ['OriginalType', 'StatusName', 'ExecuteeName', 'IsProblem', 'Service', 'Vessel', 'Voyage', 'POR', 'POL', 'POD', 'FD', 'HandlingOffice', 'ContractHolder']
	},
	formatFunc: formatData,
	detectCompareFunc: detectCompare,
	errorFunc: errorAlert
});

cargoStore.setIntervalProcess();

AppDispatcher.register(function(action) {
	switch (action.actionType) {
		case Constant.FILTER_CHANGED:
			if (cargoStore.changeFilter(action.filterArgs)) {
				cargoStore.emitDataChange();
			}
			break;
	}
});

module.exports = cargoStore