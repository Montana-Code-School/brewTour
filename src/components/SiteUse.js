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
      <h1>Site Use</h1>
      <ul>
        <li>Click "Search Breweries" button in nav bar</li>
        <li>Type in name of state to visit</li>
        <ul>
          <li>A list of breweries and a Google Map will appear</li>
        </ul>
        <li>Click on a brewery to bring up their web page</li>
        <li>Click on "Back" button to return to Brew Tour home site</li>
        <ul>
          <li>Click on "Add to my tour" button if interested</li>
          <li>If not, click on another brewery</li>
        </ul>
        <li>Click on "My Tour" button to view a list of breweries and beers youd like to try</li>
        </ul>
        </div>
      <Footer />
      </div>
    );
  }
}
export default SiteUse;
