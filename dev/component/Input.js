import React from 'react';
import InputError from './InputError';

class Input extends React.Component {
	render() {
		return (
			<div>
				<input 
					placeholder="FullName" 
				/>

				<InputError 
					visible="true"
					errorMessage="Input empty"
				/>
			</div>
		);
	}
}

module.exports = Input;