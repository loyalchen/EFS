import AppDispatcher from './dispatcher';
import {EventEmitter} from 'events';
import Constant from './constant';
import Immutable from 'immutable';

var CHANGE_EVENT= 'changeData';
var POST_EVENT='postData';
var isRegisterInfoValid = false;

var registerInfo= Immutable.fromJS({
	fullName: '',
	email:'',
	loginName: '',
	group: '',
	office: ''
});

var errorMessage= Immutable.fromJS({
	fullName: '',
	email:'',
	loginName: '',
	group: '',
	office: ''
});

function validateFullName(fullName)
{
	var reg = /^[A-Za-z]+$/;
	
	let errorMessage = '';

	if (!reg.test(fullName)) {
		errorMessage= "FullName is invalid";
	}

	if (fullName =='') {
		errorMessage = "FullName can't be empty";
	}

	return errorMessage;
}

function validateEmail(email)
{
	let reg = /^[A-Za-z0-9]+@[A-Za-z0-9]+.com$/;

	let errorMessage = '';
	
	if (!reg.test(email)) {
		errorMessage = "Email is invalid";
	}

	if (email == '') {
		errorMessage = "Email can't be empty";
	}

	return errorMessage;
}

function validateLoginName(loginName)
{
	var reg = /^[A-Za-z]+$/;

	let errorMessage = '';
	
	if (!reg.test(loginName)) {
		errorMessage = "LoginName is invalid";
	}

	if (loginName =='') {
		errorMessage= "LoginName can't be empty";
	}

	return errorMessage;
}

function validateGroup(group)
{
	let errorMessage = '';

	if (group =='') {
		errorMessage = "Please choose your group";
	}

	return errorMessage;
}

function validateOffice(office)
{
	let errorMessage = '';

	if (office =='') {
		errorMessage = "Please choose your office";
	}

	return errorMessage;
}

function changeRegisterInfo(specificName, info)
{
	registerInfo = registerInfo.set(specificName, info);
}

function validateSpecificRegisterInfo(specificName, info)
{
	let message = '';

	switch(specificName)
	{
		case 'fullName':
			message = validateFullName(info);
			break;

		case 'email': 
			message = validateEmail(info);
			break;

		case 'loginName': 
			message = validateLoginName(info);
			break;

		case 'group': 
			message = validateGroup(info);
			break;

		case 'office': 
			message = validateOffice(info);
			break;
	}
	
	errorMessage = errorMessage.set(specificName, message);
}

function validatePostUserInfo(userInfo)
{
	isRegisterInfoValid = true;

	for(let specificName of userInfo)
	{
		validateSpecificRegisterInfo(specificName[0], specificName[1]);
	}

	for(let message of errorMessage)
	{
		if (message[1] != '') {
			isRegisterInfoValid = false;
			break;
		}
	}
}

class InputDataStore extends EventEmitter {
	getRegisterInfo() {
		return registerInfo;
	}

	getErrorMessage() {
		return errorMessage;
	}

	getPostResult() {
		return isRegisterInfoValid;
	}

	addChangeListener(callback) {
		this.on(CHANGE_EVENT, callback);
	}

	emitDataChange() {
		this.emit(CHANGE_EVENT);
	}

	addPostListener(callback) {
		this.on(POST_EVENT, callback);
	}

	emitPostRegisterData() {
		this.emit(POST_EVENT);
	}
}

//注册一个action
AppDispatcher.register(action =>{
	switch(action.actionType){
		case Constant.INPUT_CHANGED:
			changeRegisterInfo(action.inputName, action.userInfo);
			validateSpecificRegisterInfo(action.inputName, action.userInfo);
			InputDataStore.prototype.emitDataChange();
			break;
			
		case Constant.POST_REGISTERINFO:
			validatePostUserInfo(action.userInfo);
			InputDataStore.prototype.emitPostRegisterData();
			break;
	}
});

module.exports = InputDataStore