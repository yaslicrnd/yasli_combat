import React, { Component } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import Popup from './components/popup/index';
import QueryHandler from './helpers/queryHandler';
import helpers from './helpers';
import './res/style.css';

import Main from './router';

class App extends Component {

   	render() {
    	return (
			<Router>
				<QueryHandler initSocket={helpers.getSocket()}>
					<Main/>
				</QueryHandler>
				<Popup/>
			</Router>
    	);
	}

}

export default App;