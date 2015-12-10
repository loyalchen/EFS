import gStyle from './globalStyle';
import keyMirror from 'keymirror';
import Immutable from 'immutable';

var status = keyMirror({
	Finished: null,
	Processing: null,
	Feedback: null
});

var sanctionCountrys = ['SYRIA', 'CRIMEA', 'SEVASTOPOL', 'RUSSIAN', 'RUSSIAN FEDERATION', 'LIBYA', 'IVORY COAST', 'COTE D\'IVOIRE', 'SUDAN'];

module.exports = {
	DisplayStatusName: function(requestItem) {
		if (requestItem.StatusName == status.Finished && requestItem.IsProblem == gStyle.constV.True) {
			return status.Processing;
		} else if (requestItem.IsFeedback) {
			return status.Feedback;
		} else {
			return requestItem.StatusName;
		}
	},
	isSanctionCountry: function (str) {
			if (!str) {
				return false;
			}
			var upperStr = str.toUpperCase();

			for (var i = sanctionCountrys.length; i--;) {
				if (upperStr.indexOf(sanctionCountrys[i]) != -1) {
					return true;
				}
			}
			return false;
		},
};