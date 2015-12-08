import gStyle from './globalStyle';
import keyMirror from 'keymirror';

var status = keyMirror({
	Finished: null,
	Processing: null,
	Feedback: null
})

module.exports = {
	DisplayStatusName: function(requestItem) {
		if (requestItem.StatusName == status.Finished && requestItem.IsProblem == gStyle.constV.True) {
			return status.Processing;
		} else if (requestItem.IsFeedback) {
			return status.Feedback;
		} else {
			return requestItem.StatusName;
		}
	}
};