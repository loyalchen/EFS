import React from 'react';
import ShowErrMessage from './showErrMessage';

class EmailInput extends React.Component {
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
				<input className="form-control"/>
				<span className="input-group-addon">@</span>
				<select className="form-control select-sm ng-pristine ng-untouched ng-valid">
					{optionsNode}
				</select>
				<ShowErrMessage 
					visible="false"
					errorMessage="Input empty"
				/>
			</div>
		);
	}
}

module.exports = EmailInput;