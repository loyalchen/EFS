import React from 'react';

class ShowErrMessage extends React.Component {
	render() {
		var styleSpan = this.props.visible? {
			display:'none'
		}:{}

		return (
				<span className="input-group-addon" style={styleSpan}>{this.props.errorMessage}</span>
		);
	}
}

module.exports = ShowErrMessage;