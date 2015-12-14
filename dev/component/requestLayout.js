import React from 'react';
import gStyle from '../globalStyle';
import SiCargoTable from './siCargoTable';
import MultiSelectGroup from './multiSelectionGroup';


class RequestLayout extends React.Component {
		constructor(props) {
			super(props);
			this.state = {
				module: gStyle.constant.PAGE_LIST,
				tableWidth:null
			}
			this._onClick = this._onClick.bind(this);
		}

		_onClick(e){
			e.preventDefault();
			this.setState({
				module:this.state.module === gStyle.constant.PAGE_LIST ? gStyle.constant.PAGE_DETAIL : gStyle.constant.PAGE_LIST
			});
			console.log('current module is ' + this.state.module);
		}

		componentDidMount(){
			this.setState({
				tableWidth:document.getElementById('fullTable').clientWidth
			});
			
		}



		render() {
			var sideBar, table, detail;
			var {tableWidth} = this.state;
			var {filterOptions,requestData,currentFilter,onFilterChange} = this.props;

			switch (this.state.module) {
				case gStyle.constant.PAGE_LIST:
					sideBar = ( < div className = "col-md-2 col-md-offset-1"><MultiSelectGroup filterOptions={filterOptions} currentFilter={currentFilter}  onFilterChange={onFilterChange} />< /div>);
					table = ( < div className = "col-md-8" id='fullTable'><SiCargoTable data={requestData} cascadeWidth={tableWidth} />< /div>);
					detail = null;
					break;
				case gStyle.constant.PAGE_DETAIL:
					sideBar = null
					table = ( < div className = "col-md-2 col-md-offset-1" id='briefTable'><SiCargoTable data={requestData} />< /div>);
					detail = ( < div className = "col-md-8"> I am detail < /div>);
					break;
			}
			return (
				<div className="row">
				{sideBar} 
				{table}
				{detail} 
				</div>);
			}
		}

		module.exports = RequestLayout;