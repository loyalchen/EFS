var db = require('../db/dbutil');
var Parameter = require('../db/parameter');
var mssql = require('mssql');
var _ = require('underscore');
var _s = require('underscore.string');

exports.getUserSetting = function(userId, callback) {
	var params = [];
	params.push(new Parameter('userId', mssql.Int, userId));
	db.querySP('SP_GetUserSetting', params, callback);
};