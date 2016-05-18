import React from 'react';

class ShowErrMessage extends React.Component {
	render() {
		var styleSpan = {
			display:'none'
		};

		if (this.props.errorMessage !='') {
			styleSpan = {};
		}

		return (
				<span className="label label-danger" style={styleSpan}>{this.props.errorMessage}</span>
		);
	}
}

module.exports = ShowErrMessage;