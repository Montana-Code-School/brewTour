import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {Link, Redirect} from 'react-router-dom';

class NavBar extends React.Component {

render() {
  return (
    <div className = 'navContainer'>
      <div className = 'row'>
      <div className='col-lg-3'>
        <img src='img/logo.png' />
        </div>
        <div className='col-lg-9'>
          <ul className='navMenu'>
            <li>SEARCH BREWERIES</li>
            <li>|</li>
            <li>ABOUT</li>
            <li>|</li>
            <Link to="/SiteUse">
              <li>SITE USE</li>
            </Link>
            <li>|</li>
            <Link to="/profile">
            <li>MY PROFILE</li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}





}

export default NavBar;
