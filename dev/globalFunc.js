import Cookies from 'js-cookie';

var userInfo = {};

exports.getUserInfo = function() {
	if (!userInfo) {
		var str = Cookies.get('user');
		if (str) {
			userInfo = JSON.parse(str);
		}

	}
	//return userInfo;
	return {
		id: 3,
		FullName: 'Jason Liu',
		permissions: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
	}
};

exports.getuserPermissions = function() {
	if (!userInfo) {
		this.getUserInfo();
	}
	if (!userInfo) {
		return [];
	} else {
		return userInfo.permissions;
	}
}

exports.hasPermission = function(permissionId){
	return this.getuserPermissions.indexOf(permissionId) != -1;
}