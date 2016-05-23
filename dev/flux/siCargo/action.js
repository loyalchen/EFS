import AppDispatcher from './dispatcher';
import Constant from './constant';

module.exports = {
	changeFilter: function(filterArgs) {
		AppDispatcher.dispatch({
			actionType: Constant.FILTER_CHANGED,
			filterArgs: filterArgs
		});
	},
	checkRequest: function(identity, checkedValue) {
		AppDispatcher.dispatch({
			actionType: Constant.REQUEST_CHECKED,
			identity: identity,
			checkedValue: checkedValue
		});
	},
	addWorkflow: function(workflowItem) {
		AppDispatcher.dispatch({
			actionType: Constant.WORKFLOW_ADD,
			workflowItem: workflowItem
		});
	},
	assign: function(args) {
		AppDispatcher.dispatch({
			actionType: Constant.REQUEST_ASSIGN,
			args: args
		});
	},
	dispatch: function(args) {
		AppDispatcher.dispatch({
			actionType: Constant.REQUEST_DISPATCH,
			args: args
		});
	},
	cancel: function(args) {
		AppDispatcher.dispatch({
			actionType: Constant.REQUEST_CANCEL,
			args: args
		});
	},
	finish: function(args) {
		AppDispatcher.dispatch({
			actionType: Constant.REQUEST_FINISH,
			args: args
		});
	},
	forceSync: function(args) {
		AppDispatcher.dispatch({
			actionType: Constant.REQUEST_FORCESYNC,
			args: args
		});
	}
}