var db = require('../db/dbutil');
var Parameter = require('../db/parameter');
var mssql = require('mssql');
var _ = require('underscore');
var _s = require('underscore.string');


exports.GetMainDisplayRequest = function(baseInfo, apiParameterObj, callback) {
	var params = [];

	var categoryId = parseInt(apiParameterObj.categoryId);
	if ([3, 4].indexOf(categoryId) != -1) {
		params.push(new Parameter('userId', mssql.Int, baseInfo.userId));
		params.push(new Parameter('jobCategoryTypeId', mssql.Int, categoryId));
		db.querySP('SP_SI_MainDisplayRequest', params, callback);
	} else if (categoryId == 2) {
		params.push(new Parameter('userId', mssql.Int, baseInfo.userId));
		db.querySP('SP_SI_MainDisplayFreightInputRequest', params, callback);
	} else {
		callback(null, 404);
	}
};

exports.DetectMainDisplayRequest = function(baseInfo, apiParameterObj, callback) {
	var params = [];
	var categoryId = parseInt(apiParameterObj.categoryId);
	if ([3, 4].indexOf(categoryId) != -1) {
		params.push(new Parameter('userId', mssql.Int, baseInfo.userId));
		params.push(new Parameter('jobCategoryTypeId', mssql.Int, apiParameterObj.categoryId));
		db.querySP('SP_SI_DetectMainDisplayRequest', params, callback);
	} else if (categoryId == 2) {
		params.push(new Parameter('userId', mssql.Int, baseInfo.userId));
		db.querySP('SP_SI_DetectMainDisplayFreightInputRequest', params, callback);
	} else {
		callback(null, 404);
	}
};