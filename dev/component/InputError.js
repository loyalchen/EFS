import React from 'react';

class InputError extends React.Component {
	render() {
		return (
			<div>
				<span>{this.props.errorMessage}</span>
			</div>
		);
	}
}

module.exports = InputError;