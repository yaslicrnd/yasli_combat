import React, { Component } from 'react';
import './index.css';
import { isEmptyStatement } from '@babel/types';

class WhoOnline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      online: []
    };
  }
  getOnline(){
    fetch('http://ya-combat.tw1.ru/api/online')
    .then(res => res.json())
    .then(
      (data) => {
        this.setState({
          isLoaded: true,
          online:data
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    
    );
};
    
render() {
  const {error, isLoaded,online} = this.state;
  if (error) {
    return (    
      <div>
        <h3>Error: {error.message}</h3>
      </div>
    );
  } else if (!isLoaded) {
    return (
      <div>
        <h3>Loading...</h3>
      </div>
    );
  }
//  else if (('username' in online.users.username) ==='undefined'){
//     return (
// <div>Empty</div>  

//     )
//   }
  
  else {
  return (
    <div className="combat__chat__why-online">
      <h3 className="combat__chat__why-online-header"><span>Бойцы онлайн</span></h3>
      <ul className="combat__chat__why-online-list">
        {online.users.map(users =>(
          <li key={users.id} className="combat__chat__why-online-username">
          <span className="combat__chat__why-online-text">{users.username}</span>
          <a className="combat__chat__why-online-info-link" href="#">
            {/* <div className="combat__chat__why-online-info-image"></div> */}
          </a>
          </li>
        ))}
      </ul>        
    </div>
  )
  }
}
componentDidMount() {
  this.getOnline();
  setInterval(() => {
      this.getOnline();
  }, 3000);
}
}
export default WhoOnline;