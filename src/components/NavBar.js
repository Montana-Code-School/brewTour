import React from 'react';
import {Link} from 'react-router-dom';

class NavBar extends React.Component {

render() {
  return (
    <div className = 'navContainer'>
      <div className = 'row'>
      <div className='col-lg-3 col-md-6'>
        <a href="/brewerysearch"><img alt="Brew Tour Logo" src='img/logo.png' /></a>
        </div>
        <div className='col-lg-9 col-md-6'>
          <ul className='navMenu'>
            <Link to="/BrewerySearch">
              <li>SEARCH BREWERIES</li>
            </Link>
            <li>|</li>
            <Link to="/BeerSearch">
              <li>SEARCH BEERS</li>
            </Link>
            <li>|</li>
            <Link to="/SiteUse">
              <li>SITE USE</li>
            </Link>
            <li>|</li>
            <Link to="/FeaturedBrewery">
              <li>FEATURED</li>
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
