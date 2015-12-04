var siData = require('../data/siData');

module.exports = function() {
	this.controllerName = 'si';

	this.GET = {
		GETMAINREQUEST: function(ctx, callbcak) {
			siData.GetMainDisplayRequest({
					userId: 4
				}, {
					categoryId: 3
				},
				callbcak);
		}
	};
	this.POST = {};
	this.PUT = {};
	this.DELETE = {};
}