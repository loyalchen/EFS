import React from 'react';
import gFunc from '../../globalFunc';
import DatePicker from 'react-datepicker';


class ReportApplyZoneHeader extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'ReportApplyZoneHeader';
    }
    render() {
    	let {reportType} = this.props;

        return (<div class="panel-heading">
				{reportType}
			</div>);
    }
}


class ReportConditions extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'ReportConditions';
    }

    _composeConditionGroups(var conditions){
    	let groupView = null;
    	for(let i = 0; i < conditions.length; i++){
    		if(i+1 <conditions.length){
    			groupView+= (
    				<div className="form-group">
    					{_composeCondition(conditions[i])}
    					{_composeCondition(conditions[++i])}
    				</div>
    				)
    		}else{
    			groupView+= (
    				<div className="form-group">
    					{_composeCondition(conditions[i])}
    				</div>
    		}
    	}
    	return groupView;
    }

    _composeCondition(var condition){
    	var view =  (<label for="" className="col-xs-1 control-label">{condition.cDisplayName}</label>);
    	switch(condtion.cType){
    		case 'string':
    			view +=(
    			<div className="col-xs-5">
							<input type="text" className="form-control "  placeholder={condition.cPlaceholder}  value={condition.cValue}/>
						</div>
    			);
    		break;
    		case 'date':
    			view +=(
    				<div class="col-xs-5">
							<DatePicker dateFormat="YYYY-MM-DD" dateFormatCalendar="YYYY-MM-DD" placeholderText={condition.cPlaceholder} selected={condition.cValue} />
						</div>
    				);
    		break;
    	}
    	return view;
    }

    render() {
    	let {conditions} = this.props;

        return ({_composeConditionGroups(conditions)});
    }
}




class ReportApplyZone extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'ReportApplyZone';
    }


    _handleClick(){
    	alert("Report applied.");
    }


    render() {
    	let {report} = this.props;

        return (<div className="panel panel-default">
        		<ReportApplyZoneHeader reportType={report.reportType} />
        		<div className="panel-body">
        			<div className="form-horizontal">
        				<ReportConditions conditions={report.conditions} />
        				<div className="form-group">
							<div className="col-xs-offset-10 col-xs-2">
								<button className="btn btn-primary" onClick={_handleClick}>Apply</button>
							</div>
						</div>
        			</div>
        		</div>
        	</div>);
    }
}

modeule.exprots = ReportApplyZone;
