import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import SiteUseIntro from './SiteUseIntro';
import {Link} from 'react-router-dom';

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
        <SiteUseIntro />
        <div className="siteusePageBkgd">
        <div className="siteuse">
          <div className="text-center">
            <h1>SITE USE</h1>
          </div>
          <div className="row firstUsePoint">
            <div className="col-lg-3">
            <Link to="/profile">
              <h2>CREATE YOUR OWN PROFILE</h2>
            </Link>
            </div>
            <div className="col-lg-9">
              <p>Once landing on the site a user is asked to either create a new profile or sign-in. We used the popular OAuth package to ensure that our site is fully secure.  After logging in the user is immediately directed to our homepage where they have the ability to learn more about our site or immediately get started finding breweries, beers and creating tours.</p>
            </div>
          </div>

          <div className="row secondUsePoint">
            <div className="col-lg-9">
              <p>On BrewTour you search for breweries by city and can add any number of breweries to each tour you create.  After typing in a city name a list of breweries is returned from breweryDB, our API.  Users can select, and explore breweries across all the United States, even Canada and some locations around the world.</p>
            </div>
            <div className="col-lg-3">
              <Link to="/BrewerySearch">
              <h2>SEARCH BREWERIES</h2>
              </Link>
            </div>
          </div>

          <div className="row thirdUsePoint">
            <div className="col-lg-3">
              <Link to="/BrewerySearch">
              <h2>SAVE CUSTOM TOURS</h2>
              </Link>
            </div>
            <div className="col-lg-9">
              <p>After establishing a tour the user can save and name it appropriately.  The tour is then pushed to the user’s profile where they can access all their saved tours at any time after logging in.  From the profile the user can see where they have been and where they are going and alert all their followers through social media of their activity on BrewTour.  They can even track the breweries they have visited and see their tour progress in an on screen animation.</p>
            </div>
          </div>

          <div className="row fourthUsePoint">
            <div className="col-lg-9">
              <p>Users can navigate to our BEER SEARCH page where it is possible to search a database of over 200,000 beers.  Simply navigate to the page by clicking on SEARCH BEERS and enter the name of the beer you are interested in.  If the beer is found, a list of statistics is returned and you will have the ability to SAVE the beer to your profile, where you can rate the beer. Return to the PROFILE page to see your beer in the list of saved beers directly under your profile name.</p>
            </div>
            <div className="col-lg-3">
              <Link to="/BeerSearch">
              <h2>SEARCH BEERS</h2>
              </Link>
            </div>
          </div>

          <div className="row fifthUsePoint">
            <div className="col-lg-3">
              <Link to="/FeaturedBrewery">
              <h2>FEATURED</h2>
              </Link>
            </div>
            <div className="col-lg-9">
              <p>BrewTour has a FEATURED page where users can read about the featured weekly beer and brewery. Navigate to this page to discover great new breweries and beers.</p>
            </div>
          </div>

        </div>
        </div>
        <Footer />
      </div>
    );
  }
}
export default SiteUse;
