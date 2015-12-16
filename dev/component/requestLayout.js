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
				fullTableWidth:null,
				briefTableWidth:null
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
			var fullTableContainer = document.getElementById('fullTable'),
				briefTableContainer = document.getElementById('briefTable');
			this.setState({
				fullTableWidth:fullTableContainer.clientWidth,
				briefTableWidth:briefTableContainer.clientWidth
			});
			
		}

		_handleCheckValueChange(identity,checkedValue){
			this.props.handleCheckValueChange(identity,checkedValue);
		}

		render() {
			var sideBar, table, detail;
			var {fullTableWidth,briefTableWidth} = this.state;
			var {filterOptions,requestData,currentFilter,onFilterChange,currentItem,columnData} = this.props;
			var sideBarClassName,tableClassName,detailClassName;
			
			if(!currentItem){
				sideBar = ( < div className = "col-xs-2 col-xs-offset-1" id='briefTable'><MultiSelectGroup filterOptions={filterOptions} currentFilter={currentFilter}  onFilterChange={onFilterChange} />< /div>);
				table = ( < div className = "col-xs-8" id='fullTable'><SiCargoTable data={requestData} cascadeWidth={fullTableWidth} handleCheckValueChange={this._handleCheckValueChange} columnData={columnData} tableModel={'full'} identityColumnName={this.props.identityColumnName} />< /div>);
				detail = null;
			}else{
				sideBar = null
				table = ( < div className = "col-xs-2 col-xs-offset-1" ><SiCargoTable data={requestData} cascadeWidth={briefTableWidth} columnData={columnData} currentItem={currentItem} tableModel={'brief'} identityColumnName={this.props.identityColumnName} />< /div>);
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
				<Link to="item/217133">Try</Link>
				</div>);
			}
		}

		module.exports = RequestLayout;