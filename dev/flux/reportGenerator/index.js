import React from 'react';
import ReactDom from 'react-dom';
import ReportApplyZone from './component/reportApplyZone';

class ReportGenerator extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'ReportGenerator';
    }
    render() {
    	let {reports} = this.props;

    	var reportViews = reports.map(function(report){
    		return <ReportApplyZone report={report} />
    	});
        return (
        	<div className="row">
        		<div className="col-xs-5">
        			{reportViews}
        		</div>
        		<div className="col-xs-7">

        		</div>
        	</div>
        	);
    }
}




ReactDom.render(

	);