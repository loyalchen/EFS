import AppDispatcher from './dispatcher';
import {EventEmitter} from 'events';
import Constant from './constant';

var CHANGE_EVENT= 'changeData';
var POST_EVENT='postData';

var errorMessage = {fullName:'', email:'', loginName:'',group:'', office: ''};
var isValid = false;

function validateFullName(fullName)
{
	var reg = /^[A-Za-z]+$/;
	errorMessage.fullName = '';
	if (!reg.test(fullName)) {
		errorMessage.fullName = "FullName is invalid";
	}

	if (fullName =='') {
		errorMessage.fullName = "FullName can't be empty";
	}
}

function validateEmail(email)
{
	var reg = /^[A-Za-z0-9]+$/;
	errorMessage.email = '';
	if (!reg.test(email)) {
		errorMessage.email = "Email is invalid";
	}

	if (email == '') {
		errorMessage.email = "Email can't be empty";
	}
}

function validateLoginName(loginName)
{
	var reg = /^[A-Za-z]+$/;
	errorMessage.loginName = '';
	if (!reg.test(loginName)) {
		errorMessage.loginName = "LoginName is invalid";
	}

	if (loginName =='') {
		errorMessage.loginName = "LoginName can't be empty";
	}
}

function validateGroup(group)
{
	errorMessage.group = '';

	if (group =='') {
		errorMessage.group = "Please choose your group";
	}
}

function validateOffice(office)
{
	errorMessage.office = '';

	if (office =='') {
		errorMessage.office = "Please choose your office";
	}
}


function validateUserInfo(userInfo, inputName)
{
	switch(inputName)
	{
		case 'fullName':
			validateFullName(userInfo);
			break;

		case 'email': 
			validateEmail(userInfo);
			break;

		case 'loginName': 
			validateLoginName(userInfo);
			break;

		case 'group': 
			validateGroup(userInfo);
			break;

		case 'office': 
			validateOffice(userInfo);
			break;
	}
}

function validateUserInfo(userInfo)
{
	validateFullName(userInfo.fullName);
	validateEmail(userInfo.email);
	validateLoginName(userInfo.loginName);
	validateGroup(userInfo.group);
	validateOffice(userInfo.office);
}

class InputDataStore extends EventEmitter {
	getErrorMessage() {
		return errorMessage;
	}

	addChangeListener(callback) {
		this.on(CHANGE_EVENT, callback);
	}

	emitDataChange() {
		this.emit(CHANGE_EVENT);
	}

	addPostListener(callback) {
		this.on(POST_DATA, callback);
	}

	emitPostRegisterData() {
		this.emit(POST_DATA);
	}
}

//注册一个action
AppDispatcher.register(action =>{
	switch(action.actionType){
		case Constant.INPUT_CHANGED:
			validateUserInfo(action.userInfo, action.inputName);
			InputDataStore.prototype.emitDataChange();
			break;
		case Constant.POST_DATA:
			validatePostUserInfo(action.userInfo);
			InputDataStore.prototype.emitPostRegisterData();
			break;
	}
});

module.exports = InputDataStore