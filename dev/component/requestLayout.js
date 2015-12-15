import React from 'react';
import gStyle from '../globalStyle';
import SiCargoTable from './siCargoTable';
import MultiSelectGroup from './multiSelectionGroup';
import {Link} from 'react-router';


class RequestLayout extends React.Component {
		constructor(props) {
			super(props);
			this.state = {
				module: gStyle.constant.PAGE_LIST,
				tableWidth:null
			}
			this._onClick = this._onClick.bind(this);
			this._handleCheckValueChange = this._handleCheckValueChange.bind(this);
		}

		_onClick(e){
			e.preventDefault();
			this.setState({
				module:this.state.module === gStyle.constant.PAGE_LIST ? gStyle.constant.PAGE_DETAIL : gStyle.constant.PAGE_LIST
			});
			console.log('current module is ' + this.state.module);
		}

		componentDidMount(){
			var tableContainer = document.getElementById('fullTable') || document.getElementById('briefTable');
			this.setState({
				tableWidth:tableContainer.clientWidth
			});
			
		}

		_handleCheckValueChange(identity,checkedValue){
			this.props.handleCheckValueChange(identity,checkedValue);
		}



		render() {
			var sideBar, table, detail;
			var {tableWidth} = this.state;
			var {filterOptions,requestData,currentFilter,onFilterChange,currentItem} = this.props;
			var sideBarClassName,tableClassName,detailClassName;
			
			if(!currentItem){
				sideBar = ( < div className = "col-xs-2 col-xs-offset-1"><MultiSelectGroup filterOptions={filterOptions} currentFilter={currentFilter}  onFilterChange={onFilterChange} />< /div>);
				table = ( < div className = "col-xs-8" id='fullTable'><SiCargoTable data={requestData} cascadeWidth={tableWidth} handleCheckValueChange={this._handleCheckValueChange} identityColumnName={this.props.identityColumnName} />< /div>);
				detail = null;
			}else{
				sideBar = null
				table = ( < div className = "col-xs-2 col-xs-offset-1" id='briefTable'><SiCargoTable data={requestData} cascadeWidth={tableWidth} identityColumnName={this.props.identityColumnName} />< /div>);
				detail = ( < div className = "col-xs-8"> I am detail < /div>);
			}
			// switch (!currentItem) {
			// 	case gStyle.constant.PAGE_LIST:
					
			// 		break;
			// 	case gStyle.constant.PAGE_DETAIL:
					
			// 		break;
			// }
			return (
				<div className="row">

				{sideBar} 
				{table}
				{detail} 
				<Link to="item/1">Try</Link>
				</div>);
			}
		}

		module.exports = RequestLayout;