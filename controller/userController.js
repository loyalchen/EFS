var userData = require('../data/userData');

module.exports = function() {
	this.controllerName = 'user';

	this.GET = {
		GETUSERSETTING: function(ctx, callback) {
			userData.getUserSetting(3, callback);
		}
	};
	this.POST = {};
	this.PUT = {};
	this.DELETE = {};
}