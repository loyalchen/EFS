import React from 'react';
import ReactDom from 'react-dom';
import SiCargoTable from '../../component/siCargoTable';
import requestDataStore from './requestDataStore';


ReactDom.render(
	<SiCargoTable requestStore={requestDataStore} />,
	document.getElementById('table')
	);