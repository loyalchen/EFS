import React from 'react';
import ButtonWithPermission from './customButton';


class ButtonList extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'ButtonList';
    }
    render() {
    	let {btnProps} = this.props;
    	var buttons = btnProps.map(item=>{
    		return (
    			<WorkflowButton needPermissionId={item.needPermissionId} handleClick={item.handleClick} text={item.text} />
    			)
    	});
        return (
        	<div className="margin-botton-div">
        	{buttons}
        	</div>
        	);
    }
}


class BaseInfo extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'BaseInfo';
    }
    render() {
        return <div>BaseInfo</div>;
    }
}


class WorkFlow extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'WorkFlow';
    }
    render() {
        return <div>WorkFlow</div>;
    }
}





class RequestDetail extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'RequestDetail';

    }
    
    render() {

    	let {btnProps} = this.props;
        return (
        	<div>
        		<ButtonList btnProps={btnProps}/>
        		<div>
        			<ul className="nav nav-tabs" role="tablist" id="detailTab">
						<li role="presentation" className="active">
							<a data-target="#baseInfo" role="tab" className="cursor-pointer" data-toggle="tab">Base Info</a>
						</li>
						<li role="presentation">
							<a data-target="#workflow" role="tab" className="cursor-pointer" data-toggle="tab">Work Flow</a>
						</li>
					</ul>
					<div className="tab-content">
						<div role="tabpanel" className="tab-pane active" id="baseInfo">
							<BaseInfo />
						</div>
						<div role="tabpanel" className="tab-pane" id="workflow">
							<WorkFlow />
						</div>
					</div>
        		</div>
        	</div>
        	);
    }
}

module.exports = RequestDetail;

