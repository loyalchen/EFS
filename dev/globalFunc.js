import Cookies from 'js-cookie';

var userInfo = {};

exports.getUserInfo = function() {
	if (!userInfo) {
		var str = Cookies.get('user');
		if (str) {
			userInfo = JSON.parse(str);
		}
		
	}
	return userInfo;
}