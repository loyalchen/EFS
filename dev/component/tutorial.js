import React from 'react';
import $ from 'jquery';
import ReactDOM from 'react-dom';

var data = [
	{id: 1, fullName: "LoyalChen", loginName: "Loyal"},
	{id: 2, fullName: "LyleZhan", loginName: "Lyle"}
]

class RegisterList extends React.Component{
	render() {
		var registerNodes = this.props.register.map(register=>{
			return(
				<Regitser fullName={register.fullName} key={register.id}>
					{register.loginName}
				</Regitser>
			);
		});
		return(
			<div>
				{registerNodes}
			</div>
		);
	}
}

class Regitser extends React.Component {
	render() {
		return (
			<div className="register">
				{this.props.fullName}
				<h2>{this.props.children}</h2>
			</div>
		);
	}
}

class RegisterBox extends React.Component {
	handleRegisterSubmit(registerInfo) {
		//TODO: submit to the server 
	}

	render() {
		return(
			<div className="registerBox">
				<RegisterList register={this.props.data} />
				<RegisterForm onRegisterSubmit={this.handleRegisterSubmit} />
			</div>
		);
	}
}

class RegisterForm extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
        	fullName : '',
            loginName : ''
        }
    }

	handleFullNameChange(e) {
		return this.setState({fullName: e.target.value});
	}

	handleLoginNameChange(e) {
		return this.setState({loginName: e.target.value});
	}

	handleSubmit(e) {
		e.preventDefault();
		var fullName = this.state.fullName.trim();
		if (!fullName) {
			return;
		};
		//TODO: send request to the server
		this.props.onRegisterSubmit({fullName: fullName, loginName: loginName})
		this.setState({fullName: '', loginName: ''});
	}

	render() {
		return(
			<form className="regitserBox" onSubmit={this.handleSubmit}>
			<div className="fullName">
				<span>FullName: </span>
				<input 
					type="text" 
					value={this.state.fullName}
					onChange={this.handleFullNameChange} 
				/>
			</div>
			<div>
				<span>LoginName: </span>
				<input 
					type="text" 
					value={this.state.loginName}
					onChange={this.handleLoginNameChange} 
				/>
			</div>
			<div>
				<input type="submit" value="Regitser" />
			</div>
			</form>
		);
	}
}

ReactDOM.render(
	<RegisterBox data={data} />,
	document.getElementById('content')
);