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