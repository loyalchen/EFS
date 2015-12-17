import AppDispatcher from './dispatcher';
import Constant from './constant';

module.exports = {
	changeUserData(userInfo, type) {
		AppDispatcher.dispatch({
			actionType: Constant.INPUT_CHANGED,
			userInfo: userInfo,
			inputName: type
		});
	},

	postRegisterData(userInfo) {
		AppDispatcher.dispatch({
			actionType: Constant.INPUT_CHANGED,
			userInfo: userInfo
		});
	}
}