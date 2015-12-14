import AppDispatcher from './dispatcher';
import Constant from './constant';

module.exports = {
	changeFilter:function(filterArgs){
		AppDispatcher.dispatch({
			actionType:Constant.FILTER_CHANGED,
			filterArgs:filterArgs
		});
	}
}