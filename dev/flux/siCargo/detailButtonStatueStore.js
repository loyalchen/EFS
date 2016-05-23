import AppDispatcher from './dispatcher';
import Constant from './constant';
import {
	EventEmitter
}
from 'events';

let CHANGE_EVENT = 'btn_statue_change';

let buttons = [{
	text:'Back',
	needPermissionId:null
},{
	text:'Add Workflow',
	needPermissionId:null
},{
	text:'Dispatch',
	needPermissionId:null,
},{
	text:'Assign',
	needPermissionId:null
},{
	text:'Cancel Request',
	needPermissionId:null
},{
	text:'Finish Request',
	needPermissionId:null
},{
	text:'Force Sync',
	needPermissionId:null
}];

class DetailButton extends EventEmitter{
	constructor(props){
		super(props);
	}

	emitBtnStatusChange(){
		this.emit(CHANGE_EVENT);
	}

	addChangeListener(callback){
		this.on(CHANGE_EVENT,callback);
	}

	removeChangeListener(callback){
		this.removeListener(CHANGE_EVENT,callback);
	}



}