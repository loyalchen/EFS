import React from 'react';
import workflow from '../workflow';
import gFunc from '../globalFunc';

class ButtonWithPermission extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'ButtonWithPermission';
    }
    render() {
    	let {needPermissionId,handleClick,text} = this.props;
    	var button;
    	if(!needPermissionId || gFunc.hasPermission(needPermissionId)){
    		button = (
    			<button className="btn btn-primary" onClick={handleClick}>{text}</button>
    			);
    	}else{
    		button = null;
    	}
        return (
        	{button}
        	);
        }
    }
}

class WorkflowButton extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'ButtonWithPermissionAndStatus';
    }
    render() {
        let {requestType,needPermissionId,hasPermissions,handleClick,text,currentStatus,btnStatus} = this.props;
        if(!workflow.canExecute(requestType,currentStatus,btnStatus)){
            return null;
        }

        return (
            <ButtonWithPermission 
                needPermissionId={needPermissionId}
                hasPermissions={hasPermissions}
                handleClick={handleClick}
                {text}/>
            );
    }
}

export default ButtonWithPermissionAndStatus;


module.exports = {ButtonWithPermission,WorkflowButton};
