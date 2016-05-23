import gStyle from './globalStyle';
import keyMirror from 'keymirror';
import Immutable from 'immutable';

let status = keyMirror({
	Enter:null,
	Synchronized:null,
	Assign:null,
	Dispatch:null,
	Finished: null,
	Processing: null,
	Feedback: null
});

let requestType = keyMirror({
	SO:null,
	SICargo:null,
	SIFrtList:null,
	SIFrtInput:null
});

let sanctionCountrys = ['SYRIA', 'CRIMEA', 'SEVASTOPOL', 'RUSSIAN', 'RUSSIAN FEDERATION', 'LIBYA', 'IVORY COAST', 'COTE D\'IVOIRE', 'SUDAN'];

function SOCanExecute(currentStatus,nextStatus){

}

function SICargoCanExecute(currentStatus,nextStatus){

}

function SIFrtListCanExecute(currentStatus,nextStatus){
	
}

function SIFrtInputCanExecute(currentStatus,nextStatus){
	
}

module.exports = {
	Status: status,
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
	canExecte:function(requestType,currentStatus,nextStatus){
		switch(requestType){
			case requestType.SO:
				return SOCanExecute(currentStatus,nextStatus);
			case requestType.SICargo:
				return SICargoCanExecute(currentStatus,nextStatus);
			case requestType.SIFrtList:
				return SIFrtListCanExecute(currentStatus,nextStatus);
			case requestType.SIFrtInput:
				return SIFrtInputCanExecute(currentStatus,nextStatus);
			default:
				return false;

		}
	}

};