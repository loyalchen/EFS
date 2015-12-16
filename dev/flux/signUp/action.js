import AppDispatcher from './dispatcher';

module.exports = {
	changeFullName(fullName){
		AppDispatcher.dispatch({
			actionType:Constant.FILTER_CHANGED,
			fullName:fullName
		});
	}
}