import AppDispatcher from './dispatcher';
import Constant from './constant';
import {
	EventEmitter
}
from 'events';
import Immutable from 'immutable';
import gFunc from '../../../dev/globalFunc';
import gStyle from '../../../dev/globalStyle';
import request from 'superagent'
import noCache from 'superagent-no-cache'

var fullColumnDefs = [{
	field: 'BookingNumber',
	displayName: 'Booking',
	order: 1,
	visible: true,
	necessary: true
}, {
	field: 'OriginalType',
	displayName: 'Type',
	order: 2,
	visible: true
}, {
	field: 'BLNo',
	displayName: 'BOL',
	order: 3,
	visible: true
}, {
	field: 'ExecuteeName',
	displayName: 'Executee',
	order: 4,
	visible: true
}, {
	field: 'DisplayStatusName',
	displayName: 'Status',
	order: 5,
	visible: true
}, {
	field: 'IsProblem',
	displayName: 'IsProblem',
	order: 6,
	visible: true
}, {
	field: 'Service',
	displayName: 'Service',
	order: 7,
	visible: true
}, {
	field: 'Vessel',
	displayName: 'Vessel',
	order: 8,
	visible: true
}, {
	field: 'Voyage',
	displayName: 'Voyage',
	order: 9,
	visible: true
}, {
	field: 'POR',
	displayName: 'POR',
	order: 10,
	visible: true
}, {
	field: 'POL',
	displayName: 'POL',
	order: 11,
	visible: true
}, {
	field: 'HandlingOffice',
	displayName: 'Handling Office',
	order: 12,
	visible: true
}, {
	field: 'ContractHolder',
	displayName: 'Contract Holder',
	order: 13,
	visible: true
}, {
	field: 'ContainerCount',
	displayName: 'Cntr Count',
	order: 14,
	visible: true
}, {
	field: 'ReceivedTime',
	displayName: 'Received Time',
	order: 15,
	visible: true
}, {
	field: 'Remark',
	displayName: 'Remark',
	order: 999,
	visible: false
}, {
	field: 'SICutOffTime',
	displayName: 'SICutOffTime',
	order: 999,
	visible: false
}, {
	field: 'CargoDTXTime',
	displayName: 'CargoDTXTime',
	order: 999,
	visible: false
}, {
	field: 'MailCounter',
	displayName: 'Update Count',
	order: 999,
	visible: false
}, {
	field: 'POD',
	displayName: 'POD',
	order: 999,
	visible: false
}, {
	field: 'FD',
	displayName: 'FD',
	order: 999,
	visible: false
}, {
	field: 'DispatchTime',
	displayName: 'Dispatch Time',
	order: 999,
	visible: false
}, {
	field: 'AssignTime',
	displayName: 'Assign Time',
	order: 999,
	visible: false
}];

var CHANGE_EVENT = 'column_change';

class ColumnStore extends EventEmitter {
	constructor(props){
		super(props);
		if(!props){
			throw new Error('props must be setted.');
		}
		this.columnType = this.props;
		this.fullColumnList = Immutable.List(fullColumnDefs);
		this.customColumnDefs = Immutable.List();
	}

	emitColumnChange(){
		this.emit(CHANGE_EVENT);
	}

	addChangeListener(callback){
		this.on(CHANGE_EVENT,callback);
	}

	removeChangeListener(callback){
		this.removeListener(CHANGE_EVENT,callback);
	}

	getPersonalSetting(){
		var that = this;
		var userInfo = gFunc.getUserInfo();
		if(!userInfo){
			//TODO:Alert
			return;
		}
		request
			.use(noCache)
			.get(url)
			.query({userId:userInfo.id})
			.end(function(err,res){
				if(err){
					gStyle.debugLog(err.toString());
					//TODO:Alert;
					return;
				}
				that.userColumnDefs = res.body[that.columnType];
				that.initialDisplayColumns();
			})
	}

	initialDisplayColumns() {
		this.customColumnDefs = this.fullColumnList.withMutations(list => {
			for (var i = 0; i < list.size; i++) {
				if (this.userColumnDefs[i] !== null) {
					var value = list.get(i);
					value.order = this.userColumnDefs[i].order;
					list.set(i,value);
				}
			}
		}).sort((a,b)=>{
			if(a.visible>b.visible){
				return 1;
			}else if(a.visible < b.visible){
				return -1;
			}else{
				if(a.order > b.order){
					return 1;
				}else if(a.order < b.order){
					return -1;
				}else{
					return 0
				}
			}
		});
		emitColumnChange();
	}

	getDisplayColumns(){
		if(this.customColumnDefs.size !== 0 ){
			return this.customColumnDefs;
		}else{
			return this.fullColumnList;
		}
	}
}