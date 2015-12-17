import React from 'react';
import ReactDom from 'react-dom';
import Immutable from 'immutable';
import {Router,Route,Link} from 'react-router';

import RequestLayout from '../../component/requestLayout';
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

    componentDidMount(){
        requestDataStore.addChangeListener(this._onRequestDataChanged);
        columnDataStore.addChangeListener(this._onColumnChanged);
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
        return (
        	<RequestLayout filterOptions={filterOptions} 
                            currentItem={this.props.params.identity} 
                            requestData={requestData} 
                            currentFilter={currentFilter}  
                            onFilterChange={this._onfilterChange} 
                            handleCheckValueChange={this._handleCheckValueChange} 
                            identityColumnName={"RequestId"}
                            columnData={columnData}
                            btnProps={btnProps}/>
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

// ReactDom.render(
// 	<CargoLayout />,
// 	document.getElementById('content')
// 	);