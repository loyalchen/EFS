import React from 'react';
import gStyle from '../globalStyle';
import SiCargoTable from './siCargoTable';
import MultiSelectGroup from './multiSelectionGroup';


class RequestLayout extends React.Component {
		constructor(props) {
			super(props);
			this.state = {
				module: gStyle.constant.PAGE_LIST
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

		render() {
			var sideBar, table, detail;
			var siderBarSytle={
				backgroundColor:'red'
			};
			var tableSytle = {
				backgroundColor:'blue'
			};
			var detailStyle = {
				backgroundColor:'yellow'
			};
			var {filterOptions,requestData,currentFilter} = this.props;

			switch (this.state.module) {
				case gStyle.constant.PAGE_LIST:
					sideBar = ( < div className = "col-md-2" style={siderBarSytle} ><MultiSelectGroup filterOptions={filterOptions} currentFilter={currentFilter} />< /div>);
					table = ( < div className = "col-md-10" style={tableSytle}><SiCargoTable data={requestData} />< /div>);
					detail = null;
					break;
				case gStyle.constant.PAGE_DETAIL:
					sideBar = null
					table = ( < div className = "col-md-2" style={tableSytle}><SiCargoTable data={requestData} />< /div>);
					detail = ( < div className = "col-md-10" style={detailStyle}> I am detail < /div>);
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