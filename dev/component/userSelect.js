import React from 'react';
import ShowErrMessage from './showErrMessage';

class SelectInput extends React.Component {

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
				>
				{optionsNode}
				</select>

				<ShowErrMessage
					errorMessage={this.props.errorMessage}
				/>
			</div>
		);
	}
}

module.exports = SelectInput;