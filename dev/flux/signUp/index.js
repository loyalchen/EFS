import React from 'react';
import ReactDom from 'react-dom';
import UserInput from '../../component/userInput';
import EmailInput from '../../component/emailInput';
import UserSelect from '../../component/userSelect';

class RegisterForm extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
        	fullName : '',
            loginName : '',
            userGroup: '',
            userOffice: ''
        }
        this.handleFullNameChange = this.handleFullNameChange.bind(this);
        this.handleLoginNameChange = this.handleLoginNameChange.bind(this);
        this.validateFullName = this.validateFullName.bind(this);
    }

    handleFullNameChange(value) {
    	this.setState ({
    		fullName : value
    	});
    }

    handleLoginNameChange(value) {
    	this.setState ({
    		loginName : value
    	});
    }

    postRegisterInfo(e) {
	    e.preventDefault();
	    var canPost = true;

	    if(canPost) {
      		alert('Success');
	    } 
	    else {
    		alert('Failed and show why');
	    }
  	}

  	validateFullName(fullName)
  	{
		var reg = new RegExp("^[A-Za-z]+$");
		var fullNameErrMsg = '';
		if (!reg.test(this.state.fullName)) {
			fullNameErrMsg = "FullName is invalid";
			return false;
		}
		if (this.state.fullName =='') {
			fullNameErrMsg = "FullName can't be empty";
			return false;
		};
  	}

	render() {
		var optionsGroup = [
		    {id: 0, value: 'none', label: '---Choose Group---' },
		    {id: 1, value: 'sz', label: 'ShenZhen' },
		    {id: 2, value: 'sh', label: 'ShangHai' }
		];

		var optionsOffice = [
			{id: 0, value: 'none', label: '---Choose Office---' },
		    {id: 1, value: 'it', label: 'IT' },
		    {id: 2, value: 'document', label: 'Document' }
		];

		var optionsEmail = [
		    {id: 0, value: 'sprc.mschkg.com', label: 'sprc.mschkg.com' },
		    {id: 1, value: 'nprc.mschkg.com', label: 'nprc.mschkg.com' },
		    {id: 2, value: 'mschkg.com', label: 'mschkg.com' }
		];

		var reg = new RegExp("^[A-Za-z]+$");
		var fullNameErrMsg = '';
		if (!reg.test(this.state.fullName)) {
			fullNameErrMsg = "FullName is invalid";
		}
		if (this.state.fullName =='') {
			fullNameErrMsg = "FullName can't be empty";
		};

		var regLoginName = /^[A-Za-z]+$/;
		var loginNameErrMsg = '';
		if (!regLoginName.test(this.state.loginName)) {
			loginNameErrMsg = "LoginName is invalid";
		}
		if (this.state.loginName =='') {
			loginNameErrMsg = "LoginName can't be empty";
		};

		return (
			<form role="form" className="bs-example bs-example-form" onSubmit={this.postRegisterInfo}>
				<UserInput 
					placeholder="Input your FullName" 
					inputText={this.state.fullName}
					emptyMessage='123'
					errorMessage={fullNameErrMsg}
					ref="fullName"
					valid = {this.validateFullName}
					onInputChange={this.handleFullNameChange}
				/>
				<EmailInput options={optionsEmail} />
				<UserInput
					placeholder="Input your LoginName" 
					inputText={this.state.loginName} 
					errorMessage={loginNameErrMsg}
					onInputChange={this.handleLoginNameChange}
				/>
				<UserSelect options={optionsGroup} placeholder="Choose Group" selectValue={this.state.userGroup} />
				<UserSelect options={optionsOffice} placeholder="Choose Office" selectValue={this.state.userOffice}/>
				<input className="btn" type="submit" value="Register" />
			</form>
		);
	}
}


ReactDom.render (
	<RegisterForm />,
	document.getElementById('content')
);