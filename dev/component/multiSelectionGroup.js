import React from 'react';
import Select from 'react-select';
import Immutable from 'immutable';



class MultiSelect extends React.Component {
    constructor(props) {
        super(props);
        this.filterName = this.props.filterName
        this.state = {
        	options : this.props.options,
            values : this.props.value
        }
        this._onSelectChange = this._onSelectChange.bind(this);
        this.onSelectChange = this.props.onSelectChange;
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

    render() {
        var placeholder = 'Input ' + this.filterName;
        return (
        	<div className="col-md-12 margin-botton-div">
                <Select multi value={this.state.values} placeholder={placeholder} options={this.state.options} onChange={this._onSelectChange} />
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

    }

    render() {
        var {filterOptions} = this.state;
        var mutilSelects;
        for(var {key,value} of this.state.filterOptions.entries()){
             mutilSelects += (<MultiSelect value={this.filter.get(key)} filterName={key} options={value} onSelectChange={_onSelectChange} />);
        }

        return(
            <div className="row">
                {mutilSelects}
            </div>
            );
        
    }
}


module.exports =  MultiSelectGroup;


