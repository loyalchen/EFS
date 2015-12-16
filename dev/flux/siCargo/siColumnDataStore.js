import AppDispatcher from './dispatcher';
import Constant from './constant';
import ColumnDataStore from '../../../dev/columnDataStore';

const fullColumnDefs = [{
	field: 'BookingNumber',
	displayName: 'Booking',
	order: 1,
	visible: true,
	necessary: true
}, {
	field: 'OriginalType',
	displayName: 'Type',
	order: 2,
	visible: true
}, {
	field: 'BLNo',
	displayName: 'BOL',
	order: 3,
	visible: true
}, {
	field: 'ExecuteeName',
	displayName: 'Executee',
	order: 4,
	visible: true
}, {
	field: 'DisplayStatusName',
	displayName: 'Status',
	order: 5,
	visible: true
}, {
	field: 'IsProblem',
	displayName: 'IsProblem',
	order: 6,
	visible: true
}, {
	field: 'Service',
	displayName: 'Service',
	order: 7,
	visible: true
}, {
	field: 'Vessel',
	displayName: 'Vessel',
	order: 8,
	visible: true
}, {
	field: 'Voyage',
	displayName: 'Voyage',
	order: 9,
	visible: true
}, {
	field: 'POR',
	displayName: 'POR',
	order: 10,
	visible: true
}, {
	field: 'POL',
	displayName: 'POL',
	order: 11,
	visible: true
}, {
	field: 'HandlingOffice',
	displayName: 'Handling Office',
	order: 12,
	visible: true
}, {
	field: 'ContractHolder',
	displayName: 'Contract Holder',
	order: 13,
	visible: true
}, {
	field: 'ContainerCount',
	displayName: 'Cntr Count',
	order: 14,
	visible: true
}, {
	field: 'ReceivedTime',
	displayName: 'Received Time',
	order: 15,
	visible: true
}, {
	field: 'Remark',
	displayName: 'Remark',
	order: 999,
	visible: false
}, {
	field: 'SICutOffTime',
	displayName: 'SICutOffTime',
	order: 999,
	visible: false
}, {
	field: 'CargoDTXTime',
	displayName: 'CargoDTXTime',
	order: 999,
	visible: false
}, {
	field: 'MailCounter',
	displayName: 'Update Count',
	order: 999,
	visible: false
}, {
	field: 'POD',
	displayName: 'POD',
	order: 999,
	visible: false
}, {
	field: 'FD',
	displayName: 'FD',
	order: 999,
	visible: false
}, {
	field: 'DispatchTime',
	displayName: 'Dispatch Time',
	order: 999,
	visible: false
}, {
	field: 'AssignTime',
	displayName: 'Assign Time',
	order: 999,
	visible: false
}];


const cargoColumnStore = new ColumnDataStore({
	columnType:'siCargoColumn',
	fullColumnDefs:fullColumnDefs
});

cargoColumnStore.getPersonalSetting();


module.exports = cargoColumnStore;





// setColumnSetting(){
//     	var setting = {
// 			"siCargoColumn": [{
// 				"index": 0,
// 				"order": 1,
// 				"visible": true
// 			}, {
// 				"index": 1,
// 				"order": 7,
// 				"visible": true
// 			}, {
// 				"index": 2,
// 				"order": 999,
// 				"visible": false
// 			}, {
// 				"index": 3,
// 				"order": 8,
// 				"visible": true
// 			}, {
// 				"index": 4,
// 				"order": 10,
// 				"visible": true
// 			}, {
// 				"index": 5,
// 				"order": 999,
// 				"visible": false
// 			}, {
// 				"index": 6,
// 				"order": 14,
// 				"visible": true
// 			}, {
// 				"index": 7,
// 				"order": 12,
// 				"visible": true
// 			}, {
// 				"index": 8,
// 				"order": 13,
// 				"visible": true
// 			}, {
// 				"index": 9,
// 				"order": 9,
// 				"visible": true
// 			}, {
// 				"index": 10,
// 				"order": 999,
// 				"visible": false
// 			}, {
// 				"index": 11,
// 				"order": 11,
// 				"visible": true
// 			}, {
// 				"index": 12,
// 				"order": 999,
// 				"visible": false
// 			}, {
// 				"index": 13,
// 				"order": 999,
// 				"visible": false
// 			}, {
// 				"index": 14,
// 				"order": 3,
// 				"visible": true
// 			}, {
// 				"index": 15,
// 				"order": 999,
// 				"visible": false
// 			}, {
// 				"index": 16,
// 				"order": 5,
// 				"visible": true
// 			}, {
// 				"index": 17,
// 				"order": 4,
// 				"visible": true
// 			}, {
// 				"index": 18,
// 				"order": 999,
// 				"visible": false
// 			}, {
// 				"index": 19,
// 				"order": 16,
// 				"visible": true
// 			}, {
// 				"index": 20,
// 				"order": 15,
// 				"visible": true
// 			}, {
// 				"index": 21,
// 				"order": 6,
// 				"visible": true
// 			}, {
// 				"index": 22,
// 				"order": 2,
// 				"visible": true
// 			}]
// 		};
// 		var fullColumnDefs = this.getFullColumnDefs();
// 		var columnDefs = [];
// 		for(var i = 0; i < fullColumnDefs.length;i++){
// 			if(setting.siCargoColumn[i] !== null && setting.siCargoColumn[i].visible === true){
// 				fullColumnDefs[i].order = setting.siCargoColumn[i].order;
// 				(function(i){
// 					columnDefs.push(fullColumnDefs[i]);
// 				})(i)
// 			}
// 		}
// 		return columnDefs.sort((a,b)=>{
// 			return a.order - b.order;
// 		});
//     }



//     getFullColumnDefs(){
//     	return [{
// 				field: 'BookingNumber',
// 				displayName: 'Booking',
// 				order: 1,
// 				visible: true,
// 				necessary: true
// 			}, {
// 				field: 'OriginalType',
// 				displayName: 'Type',
// 				order: 2,
// 				visible: true
// 			}, {
// 				field: 'BLNo',
// 				displayName: 'BOL',
// 				order: 3,
// 				visible: true
// 			}, {
// 				field: 'ExecuteeName',
// 				displayName: 'Executee',
// 				order: 4,
// 				visible: true
// 			}, {
// 				field: 'DisplayStatusName',
// 				displayName: 'Status',
// 				order: 5,
// 				visible: true
// 			}, {
// 				field: 'IsProblem',
// 				displayName: 'IsProblem',
// 				order: 6,
// 				visible: true
// 			}, {
// 				field: 'Service',
// 				displayName: 'Service',
// 				order: 7,
// 				visible: true
// 			}, {
// 				field: 'Vessel',
// 				displayName: 'Vessel',
// 				order: 8,
// 				visible: true
// 			}, {
// 				field: 'Voyage',
// 				displayName: 'Voyage',
// 				order: 9,
// 				visible: true
// 			}, {
// 				field: 'POR',
// 				displayName: 'POR',
// 				order: 10,
// 				visible: true
// 			}, {
// 				field: 'POL',
// 				displayName: 'POL',
// 				order: 11,
// 				visible: true
// 			}, {
// 				field: 'HandlingOffice',
// 				displayName: 'Handling Office',
// 				order: 12,
// 				visible: true
// 			}, {
// 				field: 'ContractHolder',
// 				displayName: 'Contract Holder',
// 				order: 13,
// 				visible: true
// 			}, {
// 				field: 'ContainerCount',
// 				displayName: 'Cntr Count',
// 				order: 14,
// 				visible: true
// 			}, {
// 				field: 'ReceivedTime',
// 				displayName: 'Received Time',
// 				order: 15,
// 				visible: true
// 			}, {
// 				field: 'Remark',
// 				displayName: 'Remark',
// 				order: 999,
// 				visible: false
// 			}, {
// 				field: 'SICutOffTime',
// 				displayName: 'SICutOffTime',
// 				order: 999,
// 				visible: false
// 			}, {
// 				field: 'CargoDTXTime',
// 				displayName: 'CargoDTXTime',
// 				order: 999,
// 				visible: false
// 			}, {
// 				field: 'MailCounter',
// 				displayName: 'Update Count',
// 				order: 999,
// 				visible: false
// 			}, {
// 				field: 'POD',
// 				displayName: 'POD',
// 				order: 999,
// 				visible: false
// 			}, {
// 				field: 'FD',
// 				displayName: 'FD',
// 				order: 999,
// 				visible: false
// 			}, {
// 				field: 'DispatchTime',
// 				displayName: 'Dispatch Time',
// 				order: 999,
// 				visible: false
// 			}, {
// 				field: 'AssignTime',
// 				displayName: 'Assign Time',
// 				order: 999,
// 				visible: false
// 			}];
//     }