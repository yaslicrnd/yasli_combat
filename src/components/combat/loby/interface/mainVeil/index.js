import React, { Component } from 'react';
import './index.css';

class MainVeil extends Component {

    render() {

        let { side } = this.props;

    	return (
            <div className={"mainVeil mainVeil__"+side}>

            </div>
        )

    }

}

export default MainVeil;