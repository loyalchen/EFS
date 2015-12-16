import React from 'react';
import ShowErrMessage from './showErrMessage';

class UserInput extends React.Component {
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onInputChange = this.props.onInputChange;
        this.visible = true;
    }

	handleInputChange() {
		this.onInputChange(this.refs.registerTextInput.value);
	}


	render() {
		var isVisible = this.visible;
		if (this.props.errorMessage !='') {
			isVisible = false;
		};

		return (
			<div className="form-group">
				<input 
					className="form-control"
					placeholder={this.props.placeholder} 
					value={this.props.inputText}
					ref="registerTextInput"
					onChange={this.handleInputChange}
				/>

				<ShowErrMessage
					visible={isVisible}
					errorMessage={this.props.errorMessage}
				/>
			</div>
		);
	}
}

module.exports = UserInput;