var appDispatcher = require('./dispatcher');
var Constant = require('./constant');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _cargo = [];


var CargoStore = assign({},EventEmitter.prototype,{
	emitChange:function(){
		this.emit(CHANGE_EVENT);
	},
	addChangeListener:function(callback){
		this.on(CHANGE_EVENT,callback);
	},
	removeChangeListener:function(callback){
		this.removeListener(CHANGE_EVENT,callback);
	}
});

AppDispatcher.register(function(action){
	switch(action.actionType){
		case Constant.
	}
});