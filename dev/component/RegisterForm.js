import React from 'react';
import ReactDom from 'react-dom';
import Input from './Input';

class RegisterForm extends React.Component {
	render() {
		return (
			<div>
				<Input />
				<Input />
				<Input />
			</div>
		);
	}
}


ReactDom.render (
	<RegisterForm />,
	document.getElementById('content')
);