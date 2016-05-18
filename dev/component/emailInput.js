import React from 'react';
import ShowErrMessage from './showErrMessage';
import RSelect from 'react-select';

class EmailInput extends React.Component {
	constructor(props)
	{
		// console.log(this);
		super(props);
		var {email} = props;
		var emailInfo = this.analyzeEmail(email); 
		this.state = {
			emailInfo: emailInfo
		};
		this.handleInputChange = this.handleInputChange.bind(this);
		this.onInputChange = this.props.onInputChange;
	}

	handleInputChange() {
		this.onInputChange(this.refs.email.value, 'email');
	}

	analyzeEmail(email){
		//TODO: depart the email value to two parts: {name & domain}. split with '@'
		return {
			name:'loychen',
			domain:'mschkg.com'
		};
	}

	componentWillReceiveProps(nextProps){
		var {email} = this.props;
		var emailInfo = this.analyzeEmail(email); 
		this.setState({
			emailInfo:emailInfo
		});
	}


	render() {
		var options1 = [
	    { value: 'one', label: 'One' },
	    { value: 'two', label: 'Two' }
	];

	    var optionsNode = this.props.options.map (options => {
	      return (
	        <option value={options.value} key={options.id}>
	          {options.label}
	        </option>
	      );
	    });
		var {emailInfo} = this.state;
		return (
			
			<div className="form-group">
				<input
					className="form-control"
					placeholder={this.props.placeholder}
					ref="email"
					value={this.props.value}
					onChange={this.handleInputChange}/>
				<ShowErrMessage 
					errorMessage={this.props.errorMessage}/>
			</div>


			// <div className="input-group">
			// 	<input
			// 		 className="form-control"
			// 		 placeholder={this.props.placeholder}
			// 		 ref="emailName"
			// 		 value={this.props.value}
			// 		 onChange={this.handleInputChange}/>
			// 	<span className="input-group-addon">@</span>
			// 	<select className="form-control select-sm ng-pristine ng-untouched ng-valid">
			// 		{optionsNode}
			// 	</select>
			// 	<ShowErrMessage 
			// 		errorMessage={this.props.errorMessage}/>
			// </div>
		);
	}
}

module.exports = EmailInput;