import moment from 'moment';

var formats = {
	time: 'YYYY-MM-DD hh:mm:ss'
}

module.exports = {

	formatTime: function(time) {
		return time ? moment(time).format(formats.time) : moment().format(formats.time);
	},

	debugLog:function(text){
		console.log(this.formatTime() + ' : ' + text);
	},

	get constV() {
		return {
			True: 'Yes',
			False: 'No'
		}
	}
}