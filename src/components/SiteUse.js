import React from 'react';
import ReactDOM from 'react-dom';
import NavBar from './NavBar';
import Footer from './Footer';

class SiteUse extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }
  render() {
    return (
      <div>
        <NavBar />
        <div className="siteuse">
          <h1>SITE USE</h1>
          <ul>
            <li>• CLICK "SEARCH BREWERIES" IN NAVIGATION BAR</li>
            <li>• TYPE IN NAME OF STATE TO VISIT</li>
            <ul>
              <li>• A LIST OF BREWERIES AND A GOOGLE MAP WILL APPEAR</li>
              <li>• CLICK ON A BREWERY TO BRING UP THEIR WEB PAGE</li>
              <li>• CLICK ON "BACK" TO RETURN TO BREW TOUR HOME PAGE</li>
            </ul>
            <li>• IF INTERESTED, CLICK ON "ADD TO MY TOUR"</li>
            <li>• CLICK ON BEERS YOU WOULD LIKE TO TRY</li>
            <li>• IF NOT INTERESTED, SIMPLY CLICK ANOTHER BREWERY</li>
            <li>• CLICK ON "MY TOUR" TO VIEW A LIST OF BREWERIES AND BEERS YOU WOULDD LIKE TO TRY</li>
            <li>• CLICK ON "TOUR DIARY"</li>
              <ul>
                <li>• WRITE A BRIEF REVIEW OF BREWERY AND BEERS YOU TRIED</li>
                <li>• CLICK STARS TO GIVE A RATING FROM 1 TO 5</li>
              </ul>
          </ul>
        </div>
        <Footer />
      </div>
    );
  }
}
export default SiteUse;
