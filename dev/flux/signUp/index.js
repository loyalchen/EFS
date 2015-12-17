import React from 'react';
import ReactDom from 'react-dom';
import InputExtension from '../../component/inputExtension';
import EmailInput from '../../component/emailInput';
import SingleSelect from '../../component/singleSelection';
import Action from './action';
import InputDataStore from './inputDataStore';

class RegisterForm extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
        	userInfo: {
        		fullName: '',
        		email:'',
        		loginName: '',
        		group: '',
        		office: ''
        	},
            errorMessage: {
            	fullName: '',
            	email: '',
            	loginName: '',
	            group: '',
            	office: ''
            }
        }
        this.onRequestDataChanged = this.onRequestDataChanged.bind(this);
        this.handleUserInfoChange = this.handleUserInfoChange.bind(this);
        this.postRegisterInfo = this.postRegisterInfo.bind(this);
    }

    componentDidMount(){
        InputDataStore.prototype.addChangeListener(this.onRequestDataChanged);
        InputDataStore.prototype.addPostListener(this.postRegisterInfo);
    }

    onRequestDataChanged(){
        this.setState({
            errorMessage:  InputDataStore.prototype.getErrorMessage()
        });
    }

    //Handle user register information change and send an action to dispatcher
    handleUserInfoChange(value, ref)
    {
    	console.log(ref);
    	let userInfoTemp = this.state.userInfo;
    	switch(ref)
    	{
    		case 'fullName':
    			userInfoTemp.fullName=value;
			break;

    		case 'email':
    			userInfoTemp.email=value;
			break;

    		case 'loginName':
    			userInfoTemp.loginName=value;
			break;

    		case 'group':
    			userInfoTemp.group=value;
			break;

    		case 'office':
    			userInfoTemp.office=value;
			break;
    	}
		this.setState({
			userInfo: userInfoTemp
		});
    	console.log(this.state.userInfo);
    	Action.changeUserData(value,ref);
    }

    postRegisterInfo(e) {
	    e.preventDefault();
	    Action.postRegisterData(this.state.userInfo);
	    // var canPost = true;

	    // if(canPost) {
     //  		alert('Success');
	    // } 
	    //
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
					inputText={this.state.userInfo.fullName}
					errorMessage={this.state.errorMessage.fullName}
					label="fullName"
					onInputChange={this.handleUserInfoChange}
				/>

				<EmailInput
					options={optionsEmail}
					placeholder="Input your email"
					value = {this.state.userInfo.email}
					errorMessage={this.state.errorMessage.email}
					label="email"
					onInputChange={this.handleUserInfoChange}
				/>

				<InputExtension
					placeholder="Input your login name" 
					inputText={this.state.userInfo.loginName} 
					errorMessage={this.state.errorMessage.loginName}
					label="loginName"
					onInputChange={this.handleUserInfoChange}
				/>

				<SingleSelect 
					options={optionsGroup} 
					placeholder="Choose your group" 
					selectValue={this.state.userInfo.group}
					label="group"
					errorMessage={this.state.errorMessage.group}
					onSelectChange={this.handleUserInfoChange}
				 />

				<SingleSelect
					options={optionsOffice} 
					placeholder="Choose office" 
					selectValue={this.state.userInfo.office}
 					label="office"
					errorMessage={this.state.errorMessage.office}
					onSelectChange={this.handleUserInfoChange}
				 />

				<input 
					className="btn" 
					type="submit" 
					value="Register" 
				/>
			</form>
		);
	}
}


ReactDom.render (
	<RegisterForm />,
	document.getElementById('content')
);