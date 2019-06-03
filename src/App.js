import React, { Component } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import './res/style.css';

import Main from './router';

class App extends Component {

  	render() {
    	return (
			<Router>
				<div id="site">
					<Main/>
				</div>
			</Router>
    	);
	  }
	  
}

export default App;