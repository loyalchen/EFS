import React from 'react';
import ReactDom from 'react-dom';
import Immutable from 'immutable';

import SiCargoTable from '../../component/siCargoTable';
import RequestLayout from '../../component/requestLayout';
import requestDataStore from './requestDataStore';



class CargoLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterOptions:Immutable.Map(),
            requestData:Immutable.List(),
            currentFilter:Immutable.Map()
        }
        this._onRequestDataChange = this._onRequestDataChange.bind(this);
    }

    componentDidMount(){
        requestDataStore.addChangeListener(this._onRequestDataChange);
    }

    componentWillUnmount(){
        requestDataStore.removeChangeListener(this._onRequestDataChange);
    }

    _onRequestDataChange(){
        this.setState({
            filterOptions:Immutable.Map(requestDataStore.analyseCollection()),
            requestData:Immutable.List(requestDataStore.filterCollection())
        });
    }


    render() {
        var {filterOptions,requestData,currentFilter} = this.state;
        return (
        	<RequestLayout filterOptions={filterOptions} requestData={requestData} currentFilter={currentFilter} />
        	);
    }
}


ReactDom.render(
	<CargoLayout />,
	document.getElementById('content')
	)