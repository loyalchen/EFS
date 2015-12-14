import {Table,Column,Cell} from 'fixed-data-table';
import React from 'react';
import Immutable from 'immutable';

require('../../node_modules/fixed-data-table/dist/fixed-data-table.min.css');


const TextCell = ({rowIndex,data,columnKey})=>(
	<Cell>
		{data.getObjectAt(rowIndex)[columnKey]}
	</Cell>
	);

const CheckBoxCell = ({rowIndex,data,columnKey})=>(
	<Cell>
		<input type="checkbox" identity={data.getObjectAt(rowIndex)[columnKey]} />
	</Cell>
	);

const SortTypes = {
	ASC:'ASC',
	DESC:'DESC'
};

function reverseSortDirection(sortDir){
	return sortDir === SortTypes.DESC ? SortTypes.ASC:SortTypes.DESC;
}

class DataListWrapper {
	constructor(indexMap,data){
		this._indexMap = indexMap;
		this._data = data;
	}
	getSize(){
		return this._indexMap.length;
	}
	
	getObjectAt(index){
		return this._data.get(this._indexMap[index]);
	}
}


class SelectAllCell extends React.Component {
    constructor(props) {
        super(props);
        this._handleClick = this._handleClick.bind(this);
    }

    _handleClick(e){
    	// e.preventDefault();
    	this.props.handleCheckAll(e.target.checked);
    }
    render() {
        return (
        	<Cell>
        		<input type="checkbox" onClick={this._handleClick} />
        	</Cell>
        	);
    }
}




class SortHeaderCell extends React.Component {
    constructor(props) {
        super(props);

        this._onSortChange = this._onSortChange.bind(this);
    }

    _onSortChange(e){
    	e.preventDefault();

    	if(this.props.onSortChange){
    		this.props.onSortChange(
    			this.props.columnKey,
    			this.props.sortDir ?
    			reverseSortDirection(this.props.sortDir):
    			SortTypes.DESC);
    	}
    }

    render() {
        var {sortDir,children,props} = this.props;
        return (
        	<Cell>
        		<a onClick={this._onSortChange}>
        			{children} {sortDir ? (sortDir === SortTypes.DESC ? '↓' : '↑') : ''}
        		</a>
        	</Cell>
        	);
    }
}






class siCargoTable extends React.Component {
    constructor(props) {
        super(props);

        this._onColumnResizeEndCallback = this._onColumnResizeEndCallback.bind(this);
        this._onSortChange = this._onSortChange.bind(this);
        this._handleCheckAll = this._handleCheckAll.bind(this);
        this.initialData(this.props);

        this.state = {
        	sortedDataList:new DataListWrapper(this._defaultSortIndexes,this._dataList),
        	colSortDirs:{},
        	columnWidths:{
        		BookingNumber:200,
        		OriginalType:80,
        		BLNo:100,
        		ExecuteeName:100,
        		DisplayStatusName:100,
        		IsProblem:100,
        		Service:150,
        		Vessel:150,
        		Voyage:100,
        		POR:100,
        		POL:100,
        		HandlingOffice:100,
        		ContractHolder:100,
        		ContainerCount:100,
        		ReceivedTime:150,
        		Remark:100,
        		SICutOffTime:150,
        		CargoDTXTime:150,
        		MailCounter:100,
        		POD:250,
        		FD:250,
        		DispatchTime:150,
        		AssignTime:150
        	},
        	columnSetting:this.setColumnSetting()
        }
    };

    initialData(props){
    	this._defaultSortIndexes = [];

    	if(Immutable.List.isList(props.data)){
    		this._dataList = props.data;
    	}else{
    		this._dataList = Immutable.List(props.data);
    	}

    	this._dataList = props.data;
    	for(var i = 0; i < this._dataList.size; i++){
    		this._defaultSortIndexes.push(i);
    	}
    }

    _onColumnResizeEndCallback(newColumnWidth,columnKey){
    	var newWidths = this.state.columnWidths;
    	newWidths[columnKey] = newColumnWidth;
    	this.setState({columnWidths:newWidths});
    }

    _onSortChange(columnKey,sortDir){
    	var sortIndexes = this._defaultSortIndexes.slice();
    	sortIndexes.sort((indexA,indexB)=>{
    		var valueA = this._dataList.get(indexA)[columnKey];
    		var valueB = this._dataList.get(indexB)[columnKey];
    		var sortVal = 0;
    		if(valueA > valueB){
    			sortVal = 1;
    		}
    		if(valueA < valueB){
    			sortVal = -1;
    		}
    		if(sortVal !== 0 && sortDir === SortTypes.ASC){
    			sortVal = sortVal * -1;
    		}

    		return sortVal;
    	});

    	this.setState({
    		sortedDataList: new DataListWrapper(sortIndexes,this._dataList),
    		colSortDirs:{
    			[columnKey]:sortDir
    		}
    	});
    }

    _handleCheckAll(checked){
    	alert(checked);
    }

    getFullColumnDefs(){
    	return [{
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
    }

    setColumnSetting(){
    	var setting = {
			"siCargoColumn": [{
				"index": 0,
				"order": 1,
				"visible": true
			}, {
				"index": 1,
				"order": 7,
				"visible": true
			}, {
				"index": 2,
				"order": 999,
				"visible": false
			}, {
				"index": 3,
				"order": 8,
				"visible": true
			}, {
				"index": 4,
				"order": 10,
				"visible": true
			}, {
				"index": 5,
				"order": 999,
				"visible": false
			}, {
				"index": 6,
				"order": 14,
				"visible": true
			}, {
				"index": 7,
				"order": 12,
				"visible": true
			}, {
				"index": 8,
				"order": 13,
				"visible": true
			}, {
				"index": 9,
				"order": 9,
				"visible": true
			}, {
				"index": 10,
				"order": 999,
				"visible": false
			}, {
				"index": 11,
				"order": 11,
				"visible": true
			}, {
				"index": 12,
				"order": 999,
				"visible": false
			}, {
				"index": 13,
				"order": 999,
				"visible": false
			}, {
				"index": 14,
				"order": 3,
				"visible": true
			}, {
				"index": 15,
				"order": 999,
				"visible": false
			}, {
				"index": 16,
				"order": 5,
				"visible": true
			}, {
				"index": 17,
				"order": 4,
				"visible": true
			}, {
				"index": 18,
				"order": 999,
				"visible": false
			}, {
				"index": 19,
				"order": 16,
				"visible": true
			}, {
				"index": 20,
				"order": 15,
				"visible": true
			}, {
				"index": 21,
				"order": 6,
				"visible": true
			}, {
				"index": 22,
				"order": 2,
				"visible": true
			}]
		};
		var fullColumnDefs = this.getFullColumnDefs();
		var columnDefs = [];
		for(var i = 0; i < fullColumnDefs.length;i++){
			if(setting.siCargoColumn[i] !== null && setting.siCargoColumn[i].visible === true){
				fullColumnDefs[i].order = setting.siCargoColumn[i].order;
				(function(i){
					columnDefs.push(fullColumnDefs[i]);
				})(i)
			}
		}
		return columnDefs.sort((a,b)=>{
			return a.order - b.order;
		});
    }

    componentWillReceiveProps(nextProps){
    	this.initialData(nextProps);
    	this.setState({
    		sortedDataList: new DataListWrapper(this._defaultSortIndexes,this._dataList)
    	});
    }

    render() {
        var {sortedDataList,colSortDirs,columnWidths,columnSetting} = this.state;
        var actWidth =  this.props.cascadeWidth || 1200; //parseInt(document.body.offsetWidth*3/4, 10);
        var that = this;
        var columns = columnSetting.map(function(column){
        	return (
        		<Column
        			columnKey = {column.field}
        			key={column.field}
        			header={
        				<SortHeaderCell
	        				onSortChange={that._onSortChange}
	        				sortDir={colSortDirs[column.field]}>
	        				{column.displayName}
	        			</SortHeaderCell>
	        		}
	        		fixed={column.necessary === true ? true: false}
	        		cell={<TextCell data={sortedDataList} />}
	        		width={columnWidths[column.field]}
	        		isResizable={true}
	        		minWidth={70}/>
        		)
        });
        return (
        	<Table
        		rowHeight={30}
        		headerHeight={50}
        		rowsCount={sortedDataList.getSize()}
        		onColumnResizeEndCallback={this._onColumnResizeEndCallback}
        		isColumnResizing={false}
        		width={actWidth} //{1300}
        		height={600}>
        		<Column
        			columnKey = {"requestId"}
        			key={"checked"}
        			header={<SelectAllCell handleCheckAll={this._handleCheckAll}></SelectAllCell>}
	        		fixed={true}
	        		cell={<CheckBoxCell data={sortedDataList} />}
	        		width={30}
	        		isResizable={true}
	        		minWidth={70}/>
        		
        		{columns}
        	</Table>
        	);
    }
}

module.exports = siCargoTable;


