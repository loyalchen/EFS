import React from 'react';
import ReactDom from 'react-dom';
import InputExtension from '../../component/inputExtension';
import EmailInput from '../../component/emailInput';
import SingleSelect from '../../component/singleSelection';
import Action from './action';
import InputDataStore from './inputDataStore';
import Immutable from 'immutable';

class RegisterForm extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
        	registerInfo: Immutable.fromJS({
        		fullName: '',
        		email:'',
        		loginName: '',
        		group: '',
        		office: ''
        	}),
            errorMessage: Immutable.fromJS({
            	fullName: '',
            	email: '',
            	loginName: '',
	            group: '',
            	office: ''
            })
        }
        this.onRequestDataChanged = this.onRequestDataChanged.bind(this);
        this.handleUserInfoChange = this.handleUserInfoChange.bind(this);
        this.postRegisterInfo = this.postRegisterInfo.bind(this);
        this.showPostResult = this.showPostResult.bind(this);
    }

    componentDidMount(){
        InputDataStore.prototype.addChangeListener(this.onRequestDataChanged);
        InputDataStore.prototype.addPostListener(this.showPostResult);
    }

    onRequestDataChanged(){
    	let registerInfo = InputDataStore.prototype.getRegisterInfo();
    	let errorMessage = InputDataStore.prototype.getErrorMessage();

        this.setState({
            registerInfo: registerInfo,
            errorMessage: errorMessage
        });
    }

    //Handle user register information change and send an action to dispatcher
    handleUserInfoChange(value, ref)
    {
    	Action.changeUserData(value, ref);
    }

    postRegisterInfo(e) {
	    e.preventDefault();
	    Action.postRegisterInfo(this.state.registerInfo);
  	}

  	showPostResult()
  	{
  		let isSuccess = InputDataStore.prototype.getPostResult();

  		if (isSuccess) {
  			alert('Register success and go to login page');
  		}
  		else
  		{
  			let errorMessage = InputDataStore.prototype.getErrorMessage();
  			this.setState({
  				errorMessage: errorMessage
  			});
  		}
  	}

	render() {
		var optionsGroup = [
		    {id: 0, value: '', label: '---Choose Group---' },
		    {id: 1, value: 'ShenZhen', label: 'ShenZhen' },
		    {id: 2, value: 'ShangHai', label: 'ShangHai' }
		];

		var optionsOffice = [
			{id: 0, value: '', label: '---Choose Office---' },
		    {id: 1, value: 'IT', label: 'IT' },
		    {id: 2, value: 'Document', label: 'Document' }
		];

		var optionsEmail = [
		    {id: 0, value: 'sprc.mschkg.com', label: 'sprc.mschkg.com' },
		    {id: 1, value: 'nprc.mschkg.com', label: 'nprc.mschkg.com' },
		    {id: 2, value: 'mschkg.com', label: 'mschkg.com' }
		];

		return (
			<form role="form" className="bs-example bs-example-form" onSubmit={this.postRegisterInfo}>
				<InputExtension 
					placeholder="Input your full name" 
					inputText={this.state.registerInfo.get('fullName')}
					errorMessage={this.state.errorMessage.get('fullName')}
					label="fullName"
					onInputChange={this.handleUserInfoChange} />

				<EmailInput
					options={optionsEmail}
					placeholder="Input your email"
					value = {this.state.registerInfo.get('email')}
					errorMessage={this.state.errorMessage.get('email')}
					label="email"
					onInputChange={this.handleUserInfoChange} />

				<InputExtension
					placeholder="Input your login name" 
					inputText={this.state.registerInfo.get('loginName')} 
					errorMessage={this.state.errorMessage.get('loginName')}
					label="loginName"
					onInputChange={this.handleUserInfoChange} />

				<SingleSelect 
					options={optionsGroup} 
					placeholder="Choose your group" 
					selectValue={this.state.registerInfo.get('group')}
					label="group"
					errorMessage={this.state.errorMessage.get('group')}
					onSelectChange={this.handleUserInfoChange} />

				<SingleSelect
					options={optionsOffice} 
					placeholder="Choose office" 
					selectValue={this.state.registerInfo.get('office')}
 					label="office"
					errorMessage={this.state.errorMessage.get('office')}
					onSelectChange={this.handleUserInfoChange} />

				<input 
					className="btn" 
					type="submit" 
					value="Register" />
			</form>
		);
	}
}


ReactDom.render (
	<RegisterForm />,
	document.getElementById('content')
);