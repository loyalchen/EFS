var mssql = require('mssql');
var setting = require('../setting');

var config = setting.dbConfig;

exports.querySQL = function(sql, callback) {
	var connection = new mssql.Connection(config, function(err) {
		if (err) {
			callback(err, null);
		}
		var request = new mssql.Request(connection);
		request.query(sql, function(err, recordset) {
			callback(err, recordset);
		});
	});
}

exports.querySP = function(spName, params, callback) {
	var connection = new mssql.Connection(config, function(err) {
		if (err) {
			callback(err, null);
		}
		var request = new mssql.Request(connection);
		if (params) {
			for (var i = params.length; i--;) {
				var p = params[i];
				request.input(p.name, p.type, p.value);
			}
		}

		request.execute(spName, function(err, recordsets, returnValue) {
			if (!recordsets || recordsets.length == 0) {
				callback(err, []);
			} else {
				callback(err, recordsets[0]);
			}
		});
	});
}

exports.qureyMultipleSP = function(spName, params, callback) {
	var connection = new mssql.Connection(config, function(err) {
		if (err) {
			callback(err, null);
		}
		var request = new mssql.Request(connection);
		for (var i = params.length; i--;) {
			var p = params[i];
			request.input(p.name, p.type, p.value);
		}
		request.execute(spName, function(err, recordsets, returnValue) {
			if (!recordsets || recordsets.length == 0) {
				callback(err, []);
			} else {
				callback(err, recordsets);
			}
		});
	});
}