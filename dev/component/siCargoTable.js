import {Table,Column,Cell} from 'fixed-data-table';
import React from 'react';
import Immutable from 'immutable';
import ReactDom from 'react-dom';

require('../../node_modules/fixed-data-table/dist/fixed-data-table.min.css');

const PROP_CHECK='checked';

const SortTypes = {
	ASC:'ASC',
	DESC:'DESC'
};

const TextCell = ({rowIndex,data,columnKey})=>(
	<Cell>
		{data.getObjectAt(rowIndex)[columnKey]}
	</Cell>
	);

class CheckBoxCell extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'CheckBoxCell';
        var {rowIndex,data,columnKey} = this.props;
        this.dataItem = data.getObjectAt(rowIndex);
        this._hangleChange = this._hangleChange.bind(this);
    }

    _hangleChange(e){
    	this.props.valueChanged(ReactDom.findDOMNode(this).attributes['data-identity'].value,e.target.checked);
    }

    render() {
    	var {rowIndex,data,columnKey} = this.props;
        return (
        	<Cell data-identity={data.getObjectAt(rowIndex)[this.props.identityColumnName]}>
				<input type="checkbox"  checked={data.getObjectAt(rowIndex)[PROP_CHECK] == true?true:false} onChange={this._hangleChange} />
			</Cell>
        	);
    }
}

 class SelectedCell extends React.Component {
     constructor(props) {
         super(props);
         this.displayName = 'SelectedCell';
     }
     render() {
     	var {rowIndex,data,columnKey,currentItemIdentity} = this.props;
     	var mark = null;
     	if(data.getObjectAt(rowIndex)[columnKey] == currentItemIdentity){
     		mark = (<span className="glyphicon glyphicon-asterisk" aria-hidden="true"></span>);
     	}
        return (
         	<Cell>
         		{mark}
         	</Cell>
         	);
     }

 }
 
function reverseSortDirection(sortDir){
	return sortDir === SortTypes.DESC ? SortTypes.ASC:SortTypes.DESC;
}

class DataListWrapper {
	constructor(indexMap,data){
		this._indexMap = indexMap;
		this._data = data;
	}
	getSize(){
		return this._indexMap.size;
	}
	
	getObjectAt(index){
		return this._data.get(this._indexMap.get(index));
	}
}

class SelectAllHeaderCell extends React.Component {
    constructor(props) {
        super(props);
        this._handleClick = this._handleClick.bind(this);
    }

    _handleClick(e){
    	this.props.handleCheckAll(e.target.checked);
    }
    render() {
        return (
        	<Cell>
        		<input type="checkbox" onClick={this._handleClick} checked={this.props.checked} />
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
        this._handleCheckValueChange = this._handleCheckValueChange.bind(this);
        this.initialData(this.props);

        this.state = {
        	sortedDataList:new DataListWrapper(this._defaultSortIndexes,this._dataList),
        	checkedAll:false,
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
        	columnData:this.props.columnData,
        	tableModel:'full',
        	cascadeWidth:null
        }
    };

    initialData(props){
    	this._defaultSortIndexes = Immutable.List();
    	if(Immutable.List.isList(props.data)){
    		this._dataList = props.data;
    	}else{
    		this._dataList = Immutable.List(props.data);
    	}
    	this._defaultSortIndexes = this._defaultSortIndexes.withMutations(list=>{
    		for(var i = 0; i < this._dataList.size; i++){
    			list.push(i);
    		}
    	});
    }

    _onColumnResizeEndCallback(newColumnWidth,columnKey){
    	var newWidths = this.state.columnWidths;
    	newWidths[columnKey] = newColumnWidth;
    	this.setState({columnWidths:newWidths});
    }

    _onSortChange(columnKey,sortDir){
    	var sortIndexes = this._defaultSortIndexes.sort((indexA,indexB)=>{
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

    	if(sortIndexes !== this._defaultSortIndexes){
    		this._defaultSortIndexes = sortIndexes;
    		this.setState({
	    		sortedDataList: new DataListWrapper(this._defaultSortIndexes,this._dataList),
	    		colSortDirs:{
	    			//[columnKey]:sortDir
	    			key:columnKey,
	    			sortDir:sortDir
    			}
    		});
    	}
    }

    _handleCheckAll(checked){
    	this._dataList.forEach((v,k,arr)=>{
    		v[PROP_CHECK] = checked;
    	});
    	this.setState({
    		checkedAll: checked,
			sortedDataList: new DataListWrapper(this._defaultSortIndexes,this._dataList)
    	});
    }

    _handleCheckValueChange(identity,checked){
    	var index =this._dataList.findIndex((v,k,arr)=>{
    		return v[this.props.identityColumnName] == identity;
    	});
    	var data = this._dataList.get(index);
    	data.checked = checked;
    	this._dataList = this._dataList.set(index,data);
    	if(checked === false && this.state.checkedAll === true){
    		this.setState({
    			checkedAll: false,
    			sortedDataList: new DataListWrapper(this._defaultSortIndexes,this._dataList)
    		});
    	}else{
    		this.setState({
    			sortedDataList: new DataListWrapper(this._defaultSortIndexes,this._dataList)
    		});
    	}
    	this.props.handleCheckValueChange(identity,checked);
    }

    getBriefColumnDefs(){
    	return [
    		{
				field: 'BookingNumber',
				displayName: 'Booking',
				order: 1,
				visible: true,
				necessary: true
			}
    	];
    }

    componentWillReceiveProps(nextProps){
    	this.initialData(nextProps);
    	if(this.state.colSortDirs){
    		this._onSortChange(this.state.colSortDirs.key,this.state.colSortDirs.sortDir);	
    	}
    	
    	this.setState({
    		sortedDataList: new DataListWrapper(this._defaultSortIndexes,this._dataList),
    		columnData:nextProps.columnData,
    		tableModel:nextProps.tableModel,
    		cascadeWidth:nextProps.cascadeWidth
    	});
    }

    render() {
        var {sortedDataList,colSortDirs,columnWidths,columnData,checkedAll,tableModel,cascadeWidth} = this.state;
        var actWidth =  cascadeWidth || 1200,
        	briefColumn = null;
        var that = this;
        var columns,checkColumn,selectedColumn       
        if(!tableModel || tableModel == 'full'){
        	columns = columnData.filter(item=>item.visible == true).toList();
        	checkColumn = (
        		<Column
        			columnKey = {this.props.identityColumnName}
        			key={this.props.identityColumnName}
        			header={<SelectAllHeaderCell handleCheckAll={this._handleCheckAll} checked={checkedAll}></SelectAllHeaderCell>}
	        		fixed={true}
	        		cell={<CheckBoxCell data={sortedDataList} valueChanged={this._handleCheckValueChange} identityColumnName={this.props.identityColumnName} />}
	        		width={30}
	        		isResizable={true}/>
        		);
        	selectedColumn = null;
        }else{
        	briefColumn = actWidth - 30;// substract checkbox/selected column width
        	columns = columnData.filter(item=>item.necessary == true).toList();
        	checkColumn = null;
        	selectedColumn = (
        		<Column
        			columnKey = {this.props.identityColumnName}
        			key={this.props.identityColumnName}
        			header={<Cell></Cell>}
        			fixed={true}
        			cell={<SelectedCell data={sortedDataList} currentItemIdentity={this.props.currentItem}></SelectedCell>}
        			width={30}
        			isResizable={true}/>
        		);
        }

        columns = columns.map(function(column){
		        	return (
		        		<Column
		        			columnKey = {column.field}
		        			key={column.field}
		        			header={
		        				<SortHeaderCell
			        				onSortChange={that._onSortChange}
			        				sortDir={colSortDirs.key == column.field ? colSortDirs.sortDir:null}>
			        				{column.displayName}
			        			</SortHeaderCell>
			        		}
			        		fixed={column.necessary === true ? true: false}
			        		cell={<TextCell data={sortedDataList} />}
			        		width={briefColumn? briefColumn : columnWidths[column.field]}
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
        		width={actWidth}
        		height={600}>
        		{checkColumn}
        		{selectedColumn}
        		{columns}
        	</Table>
        	);
    }
}

module.exports = siCargoTable;