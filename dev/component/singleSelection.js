import React from 'react';
import ShowErrMessage from './showErrMessage';

class SingleSelect extends React.Component {
	constructor(props)
	{
		super(props);
		this.handleSelectChange = this.handleSelectChange.bind(this);
		this.onSelectChange = this.props.onSelectChange;
	}

	handleSelectChange() {
		this.onSelectChange(this.refs.select.value, this.props.label)
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
			<div className="form-group">
				<select 
					className="form-control"
					placeholder={this.props.placeholder}
					value = {this.props.selectValue}
					onChange={this.handleSelectChange}
					ref="select" >
				{optionsNode}
				</select>

				<ShowErrMessage
					errorMessage={this.props.errorMessage} />
			</div>
		);
	}
}

module.exports = SingleSelect;