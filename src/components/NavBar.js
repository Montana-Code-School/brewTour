import React from 'react';
import {Link} from 'react-router-dom';

class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggleClass = this.toggleClass.bind(this);
    this.state = {
      navMenuMobile: "navHidden",
      btnTwirl: ""
    };
  }

  toggleClass() {
    var css = (this.state.navMenuMobile === "navHidden") ? "navShow" : "navHidden";
    var btncss = (this.state.btnTwirl === "") ? "expanded" : "";
    this.setState({
      navMenuMobile: css,
      btnTwirl: btncss
    });
  }

render() {
  return (
    <div className = 'navContainer'>
      <div className = 'row'>
      <div className='col-lg-3 col-md-12 col-sm-12 text-center'>
        <a href="/brewerysearch"><img alt="Brew Tour Logo" src='img/logo.png' /></a>
        </div>
        <div className='toggleNavBtn'><button className={this.state.btnTwirl} onClick={this.toggleClass}>Toggle</button></div>


        <div className='col-lg-9 col-md-12 col-sm-12 text-center desktopMenu'>
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
            <Link to="/Profile">
              <li>MY PROFILE</li>
            </Link>
          </ul>
        </div>

        <div className='col-lg-9 col-md-12 col-sm-12 mobileMenu'>
          <ul className={this.state.navMenuMobile}>
            <Link to="/BrewerySearch">
              <li>SEARCH BREWERIES</li>
            </Link>
            <Link to="/BeerSearch">
              <li>SEARCH BEERS</li>
            </Link>
            <Link to="/SiteUse">
              <li>SITE USE</li>
            </Link>
            <Link to="/FeaturedBrewery">
              <li>FEATURED</li>
            </Link>
            <Link to="/Profile">
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
