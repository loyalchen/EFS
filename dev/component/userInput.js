import React from 'react';
import ShowErrMessage from './showErrMessage';

class UserInput extends React.Component {
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onInputChange = this.props.onInputChange;
    }

	handleInputChange() {
		this.onInputChange(this.refs.textInput.value);
	}


	render() {
		return (
			<div className="form-group">
				<input
					{...this.props}
					className="form-control"
					placeholder={this.props.placeholder} 
					value={this.props.inputText}
					ref="textInput"
					onChange={this.handleInputChange}
				/>

				<ShowErrMessage
					errorMessage={this.props.errorMessage}
				/>
			</div>
		);
	}
}

module.exports = UserInput;