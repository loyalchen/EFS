import React from 'react';
import faker from 'faker';

var assert = require('chai').assert

describe('Array', function() {
  describe('#indexOf()', function () {

  	var data = []
  	for(int i = 0; i < 200; i++){
  		var temp = {
  			BookingNumber:'BKG'+i.toString(),
  			OriginalType:'testType',
  			BLNo:'BLNo'+i.toString(),
  			ExecuteeName:faker.name.firstName(),
  			DisplayStatusName:'testStatus',
  			IsProblem:true,
			Service:'testService',
			Vessel:'testVessel',
			Voyage:'testVoyage',
			POR:'testPor',
			POL:'testPol',
			HandlingOffice:'office',
			ContractHolder:'testCH',
			ContainerCount:1,
			ReceivedTime:'2000-1-1',
			Remark:'test',
			SICutOffTime:'2000-1-1',
			CargoDTXTime:'2000-1-1',
			MailCounter:2,
			POD:'testPod',
			FD:'testFD',
			DispatchTime:'2000-1-1',
			AssignTime:'2000-1-1'
  		};
  		// console.log(JSON.stringify(temp));
  		data.push(temp);
  	}
  	assert.equal(1,1);

  });
});