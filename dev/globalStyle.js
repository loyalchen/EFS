import moment from 'moment';
import keyMirror from 'keymirror';

var formats = {
	time: 'YYYY-MM-DD hh:mm:ss'
}

var _constant = keyMirror({
	PAGE_LIST: null,
	PAGE_DETAIL: null
});

module.exports = {
	formatTime: function(time) {
		return time ? moment(time).format(formats.time) : '';
	},

	debugLog: function(text) {
		console.log(this.formatTime() + ' : ' + text);
	},

	get constV() {
		return {
			True: 'Yes',
			False: 'No'
		}
	},

	get constant() {
		return _constant;
	}
}