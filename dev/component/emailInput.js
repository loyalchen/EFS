import React from 'react';
import ShowErrMessage from './showErrMessage';

class EmailInput extends React.Component {
	constructor(props)
	{
		// console.log(this);
		super(props);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.onInputChange = this.props.onInputChange;
	}

	handleInputChange() {
		this.onInputChange(this.refs.emailName.value, this.props.label);
	}

	render() {
	    var optionsNode = this.props.options.map (options => {
	      return (
	        <option value={options.value} key={options.id}>
	          {options.label}
	        </option>
	      );
	    });

		return (
			<div className="input-group">
				<input
					 className="form-control"
					 placeholder={this.props.placeholder}
					 ref="emailName"
					 value={this.props.value}
					 onChange={this.handleInputChange}
				 />
				<span className="input-group-addon">@</span>
				<select className="form-control select-sm ng-pristine ng-untouched ng-valid">
					{optionsNode}
				</select>
				<ShowErrMessage 
					errorMessage={this.props.errorMessage}
				/>
			</div>
		);
	}
}

module.exports = EmailInput;