import React from 'react';
import RSelect from 'react-select';
import Immutable from 'immutable';
import gStyle from '../globalStyle';
require('../../node_modules/react-select/dist/react-select.min.css');



class MultiSelect extends React.Component {
    constructor(props) {
        super(props);
        this.filterName = this.props.filterName
        this.state = {
        	options : this.orderOption(this.props.options),
            values : this.props.value
        }
        this._onSelectChange = this._onSelectChange.bind(this);
        this.onSelectChange = this.props.onSelectChange;
    }

    orderOption(options) {
        return options.sort((a, b) => {
            if (a.label > b.label) {
                return 1;
            } else if (a.label == b.label) {
                return 0;
            } else {
                return -1;
            }
        });
    }

    _onSelectChange(value){
        this.setState({
            values:value
        });
         this.onSelectChange({
            filterName:this.filterName,
            selectValues:value
        });
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            options : this.orderOption(nextProps.options)
        });
    }

    render() {
        var placeholder = 'Input ' + this.filterName;
        return (
        	<div className="col-md-12 margin-botton-div">
                <RSelect multi simpleValue delimiter={gStyle.constV.delimiter}  value={this.state.values} placeholder={placeholder} options={this.state.options} onChange={this._onSelectChange} />
            </div>
        	);
    }
}


class MultiSelectGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            filterOptions:Immutable.Map(this.props.filterOptions)
        };
        this._initialFilter(this.props.currentFilter)
        this._onSelectChange = this._onSelectChange.bind(this);
    }

    _initialFilter(currentFilter){
        this.filter = Immutable.Map({});
        for(var key of this.state.filterOptions.keys()){
            // this.filter[key]='';
            this.filter.set(key,'');
        }
        if(currentFilter){
            var currFilter =Immutable.Map(currentFilter); 
            this.filter = this.filter.merge(currFilter);
        }
    }

    _onSelectChange(selectValue){
        this.props.onFilterChange(selectValue);
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            filterOptions:Immutable.Map(nextProps.filterOptions)
        });
        this._initialFilter(nextProps.currentFilter);
    }

    render() {
        var {filterOptions} = this.state;
        var mutilSelects=[];
        for(var [key,value] of this.state.filterOptions.entries()){
             mutilSelects.push(<MultiSelect key={key} value={this.filter.get(key)} filterName={key} options={value.toArray()} onSelectChange={this._onSelectChange} />);
        }

        return(
            <div className="row">
                {mutilSelects}
            </div>
            );
        
    }
}


module.exports =  MultiSelectGroup;


