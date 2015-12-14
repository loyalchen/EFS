import React from 'react';
import ReactDom from 'react-dom';
import Immutable from 'immutable';

import SiCargoTable from '../../component/siCargoTable';
import RequestLayout from '../../component/requestLayout';
import requestDataStore from './requestDataStore';
import Action from './action';



class CargoLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterOptions:Immutable.Map(),
            requestData:Immutable.List(),
            currentFilter:Immutable.Map()
        }
        this._onRequestDataChanged = this._onRequestDataChanged.bind(this);
        // this._onFilterChanged = this._onFilterChanged.bind(this);
        // this._onFreshFilterData = this._onFreshFilterData.bind(this);
    }

    componentDidMount(){
        requestDataStore.addChangeListener(this._onRequestDataChanged);
        // requestDataStore.addFilterListener(this._onFreshFilterData);
    }

    componentWillUnmount(){
        requestDataStore.removeChangeListener(this._onRequestDataChanged);
        // requestDataStore.removeFilterListener(this._onFreshFilterData);
    }

    _onRequestDataChanged(){
        this.setState({
            filterOptions:Immutable.Map(requestDataStore.analyseCollection()),
            requestData:Immutable.List(requestDataStore.filterCollection())
        });
    }

    // _onFilterChanged(){
    //     this.setState({
    //         requestData:Immutable.List(requestDataStore.filterCollection())
    //     });
    // }

     _onfilterChange(filterArgs){
        Action.changeFilter(filterArgs);
     }

     // _onFreshFilterData(){
     //    this.setState({
     //        requestData:
     //    })
     // }


    render() {
        var {filterOptions,requestData,currentFilter} = this.state;
        return (
        	<RequestLayout filterOptions={filterOptions} requestData={requestData} currentFilter={currentFilter}  onFilterChange={this._onfilterChange} />
        	);
    }
}


ReactDom.render(
	<CargoLayout />,
	document.getElementById('content')
	)