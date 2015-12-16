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
				<span className="input-group-addon" style={styleSpan}>{this.props.errorMessage}</span>
		);
	}
}

module.exports = ShowErrMessage;