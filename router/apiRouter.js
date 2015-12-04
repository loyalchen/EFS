var siCtrl = require('../controller/siController');
var thunkify = require('thunkify');


var cachedControllers = null;
// var cachedRouter = null;
var controllerDictionary = null;

function getControllers() {
	if (!cachedControllers) {
		cachedControllers = [];

		cachedControllers.push(new siCtrl());
	}

	return cachedControllers;
}

function freshControllerDic(isForce) {
	//not force and cached dic, then return dic directly.
	if (!isForce && controllerDictionary != null) {
		return controllerDictionary;
	}
	
	//force refresh or no cached dic
	getControllers();
	if (!cachedControllers || cachedControllers.length === 0) {
		controllerDictionary = {};
		return;
	}
	controllerDictionary = {};
	for (var i = 0, len = cachedControllers.length; i < len; i++) {
		var type = cachedControllers[i].hasOwnProperty('controllerName') ?
			cachedControllers[i].controllerName : '';

		if (type === '') {
			throw new Error('controllerName is null.');
		} else if (controllerDictionary.hasOwnProperty(type)) {
			throw new Error('There are more than one controllers named ' + type);
		} else {
			addControllerDic(type, cachedControllers[i]);
		}
	}
}

function addControllerDic(name, controller) {
	controllerDictionary[name] = controller;
}

exports.execReq = function* (controllerName, actionName, ctx) {
	freshControllerDic(false);
	if (!controllerName || controllerName.length === 0) {
		throw new Error('Miss controller name.');
	}
	if (!actionName || actionName.length === 0) {
		throw new Error('Miss action name.');
	}
	var method = ctx.method.toUpperCase();
	if (controllerDictionary[controllerName]) {
		if (controllerDictionary[controllerName][method][actionName.toUpperCase()]) {
			var execFunc = thunkify(controllerDictionary[controllerName][method][actionName.toUpperCase()]);
			ctx.body = yield execFunc(ctx);
		} else {
			throw new Error('can\'t not find the action(' + actionName + ') in controller(' + controllerName + ')');
		}
	} else {
		throw new Error('can\'t not find the controller(' + controllerName + ')');
	}
} 