import React from 'react';
import ReactDom from 'react-dom';
import Immutable from 'immutable';
import {Router,Route,Link} from 'react-router';

import RequestLayout from '../../component/requestLayout';
import RequestTable from '../../component/requestTable';
import RequestDetail from '../../component/requestDetail';
import MultiSelectGroup from '../../component/multiSelectionGroup';
import requestDataStore from './requestDataStore';
import columnDataStore from './siColumnDataStore';
import Action from './action';

var detailBtns = [{
    
}];
class CargoLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterOptions:Immutable.Map(),
            requestData:Immutable.List(),
            columnData:columnDataStore.getDisplayColumns(),
            tableModel:'',
            currentFilter:Immutable.Map()
        }
        this._onRequestDataChanged = this._onRequestDataChanged.bind(this);
        this._onColumnChanged = this._onColumnChanged.bind(this);
    }

    componentDidMount() {
        requestDataStore.addChangeListener(this._onRequestDataChanged);
        columnDataStore.addChangeListener(this._onColumnChanged);
        var sideBarContainer = document.getElementById('requestLayoutSideBar'),
            centerContainer = document.getElementById('requestLayoutCenter');
        this.setState({
            sideBarWidth: sideBarContainer.clientWidth,
            centerWidth: centerContainer.clientWidth
        });
    }

    componentWillUnmount(){
        requestDataStore.removeChangeListener(this._onRequestDataChanged);
        columnDataStore.removeChangeListener(this._onColumnChanged);
    }

    _onRequestDataChanged(){
        this.setState({
            filterOptions:Immutable.Map(requestDataStore.analyseCollection()),
            requestData:Immutable.List(requestDataStore.filterCollection())
        });
    }

    _onColumnChanged(){
        this.setState({
            columnData:columnDataStore.getDisplayColumns()
        });
    }


     _onfilterChange(filterArgs){
        Action.changeFilter(filterArgs);
     }

     _handleCheckValueChange(identity,checkedValue){
        Action.checkRequest(identity,checkedValue);
     }


    render() {
        var {filterOptions,requestData,currentFilter,columnData,tableModel} = this.state;
        var currentItem = this.props.params.identity;
        var tableWith = currentItem ? this.state.sideBarWidth:this.state.centerWidth;
        var sideBar,table,detail;

        sideBar = (
                    <MultiSelectGroup 
                        filterOptions={filterOptions} 
                        currentFilter={currentFilter}  
                        onFilterChange={this._onfilterChange} />
                );

        table = (
                <RequestTable 
                    data={requestData} 
                    cascadeWidth={tableWith} 
                    handleCheckValueChange={this._handleCheckValueChange} 
                    columnData={columnData} 
                    tableModel={'full'} 
                    identityColumnName={"RequestId"} />
            );


        detail = (<RequestDetail />);

        return (
            <RequestLayout className={"row"} 
                            sideBarClassName={"col-xs-2 col-xs-offset-1"} 
                            centerClassName={"col-xs-8"} 
                            sideBar={sideBar}  
                            table={table} 
                            detail={detail} 
                            currentItem={currentItem}/>
        	);
    }
}

ReactDom.render(
    <Router>
        <Route path="/" component={CargoLayout}>
            <Route path="item/:identity" compent={CargoLayout} />
        </Route>
    </Router>,
    document.getElementById('content')
    );