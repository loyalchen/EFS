var siData = require('../data/siData');

module.exports = function() {
	this.controllerName = 'si';

	this.GET = {
		GETMAINREQUEST: function(ctx, callback) {
			siData.GetMainDisplayRequest({
					userId: 4
				}, {
					categoryId: ctx.query.categoryId
				},
				callback);
		},
		DETECTMAINREQUEST: function(ctx, callback) {
			siData.DetectMainDisplayRequest({
					userId: 4
				}, {
					categoryId: ctx.query.categoryId
				},
				callback);
		}
	};
	this.POST = {};
	this.PUT = {};
	this.DELETE = {};
}