
import {
	EventEmitter
}
from 'events';
import Immutable from 'immutable';
import gFunc from './globalFunc';
import gStyle from './globalStyle';
import request from 'superagent';
import noCache from 'superagent-no-cache';



var CHANGE_EVENT = 'column_change';

class ColumnStore extends EventEmitter {
	constructor(props){
		super(props);
		if(!props){
			throw new Error('props must be setted.');
		}
		this.columnType = props.columnType;
		this.fullColumnDefs = props.fullColumnDefs;
		this.fullColumnList = Immutable.List(this.fullColumnDefs);
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
			.get('/api/user/GetUserSetting')
			.use(noCache)
			.end(function(err,res){
				if(err){
					gStyle.debugLog(err.toString());
					//TODO:Alert;
					return;
				}
				that.userColumnDefs = JSON.parse(res.body[0]['PageSetting'])[that.columnType];
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
		this.emitColumnChange();
	}

	getDisplayColumns(){
		if(this.customColumnDefs.size !== 0 ){
			return this.customColumnDefs;
		}else{
			return this.fullColumnList;
		}
	}
}


module.exports = ColumnStore;