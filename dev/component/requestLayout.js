import React from 'react';
import gStyle from '../globalStyle';
import {Link} from 'react-router';


class RequestLayout extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			module: gStyle.constant.PAGE_LIST,
			fullTableWidth:null,
			briefTableWidth:null
		}
		this._handleCheckValueChange = this._handleCheckValueChange.bind(this);

	}

	_handleCheckValueChange(identity,checkedValue){
		this.props.handleCheckValueChange(identity,checkedValue);
	}

	render() {
		var {className,sideBarClassName,centerClassName,sideBar,table,detail,currentItem} = this.props;

		var sideBarComponent, centerComponent;

		if(!currentItem){
			sideBarComponent = (<div className={sideBarClassName} id="requestLayoutSideBar">{sideBar}</div>);
			centerComponent = (<div className={centerClassName} id="requestLayoutCenter">{table}</div>);
		}else{
			sideBarComponent = (<div className={sideBarClassName}>{table}</div>);
			centerComponent = (<div className={centerClassName}>{detail}</div>);
		}
		return (
			<div className={className}>
				{sideBarComponent}
				{centerComponent}
				<Link to="item/217133">Try</Link>
			</div>
			);
		
	}
}

RequestLayout.defaultProps = {
	className: 'row',
	sideBarClassName: 'col-xs-2 col-xs-offset-1',
	centerClassName: 'col-xs-8'
};

module.exports = RequestLayout;