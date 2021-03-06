import React from 'react';
import axios from 'axios';
import NavBar from './NavBar';
import Footer from './Footer';
import FeaturedMap from './FeaturedMap';
import FeaturedIntro from './FeaturedIntro';

class FeaturedBrewery extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      featuredLocation:'',
      locationImages:'',
      mapLocation:'',
      featuredBeer:'',
      featuredBeerLabel:'',
      featuredBeerStyle:'',
      featuredBeerAvail:'',
      featuredBeerBrewery:''
    }
  }


  componentDidMount() {
    axios.get('https://us-central1-brewtour-66745.cloudfunctions.net/api/proxy/featuredlocation')
    .then(res => {
      const featuredLocation = res.data.data.brewery;
      const locationImages = res.data.data.brewery.images;
      const mapLocation = res.data.data.brewery.locations[0];
      const featuredBeer = res.data.data.beer;
      const featuredBeerLabel = res.data.data.beer.labels;
      const featuredBeerAvail = res.data.data.beer.available;
      const featuredBeerStyle = res.data.data.beer.style;
      const featuredBeerBrewery = res.data.data.beer.breweries[0];

      this.setState({
        featuredLocation:featuredLocation,
        locationImages:locationImages,
        mapLocation:mapLocation,
        featuredBeer:featuredBeer,
        featuredBeerLabel:featuredBeerLabel,
        featuredBeerAvail:featuredBeerAvail,
        featuredBeerStyle:featuredBeerStyle,
        featuredBeerBrewery:featuredBeerBrewery
      });
    });
  }

  render() {
    return (
      <div>
        <NavBar />
        <FeaturedIntro />
        <div className="featuredPageContainer">
          <div className="featuredBreweryContainer row">
            <img alt={"The logo for " + this.state.featuredBeerBrewery} className="col-lg-3 col-md-6" src={this.state.locationImages.squareMedium} />
            <div className="col-lg-3 col-md-6">
              <h2>{this.state.featuredLocation.name}</h2>
              <p>{this.state.featuredLocation.description}</p>
              <button className="btn btn-primary"><a href={this.state.featuredLocation.website} rel="noopener noreferrer" target="_blank">VIEW WEBSITE</a><span className='btnIcon'>></span></button>
            </div>
            <table className='table table-striped featuredBeerTbl col-lg-6 col-md-12 col-sm-12'>
              <tbody>
                <tr>
                  <th colSpan="2">{this.state.featuredLocation.name}</th>
                </tr>
                <tr>
                  <td>YEAR ESTABLISHED</td>
                  <td>{this.state.featuredLocation.established}</td>
                </tr>
                <tr>
                  <td>OPEN TO PUBLIC?</td>
                  <td>{(this.state.mapLocation.openToPublic === "N") ? "No" : "Yes"}</td>
                </tr>
                <tr>
                  <td>LOCATION TYPE</td>
                  <td>{this.state.mapLocation.locationTypeDisplay}</td>
                </tr>
                <tr>
                  <td>ALL ORGANIC?</td>
                  <td>{(this.state.featuredLocation.isOrganic === "N") ? "No" : "Yes"}</td>
                </tr>
                <tr>
                  <td>LOCATION</td>
                  <td>{this.state.mapLocation.streetAddress} | {this.state.mapLocation.locality}, {this.state.mapLocation.region} | {this.state.mapLocation.postalCode}</td>
                </tr>
                <tr>
                  <td>WEBSITE</td>
                  <td><a href={this.state.mapLocation.website} rel="noopener noreferrer" target="_blank">{this.state.mapLocation.website}</a></td>
                </tr>
                <tr>
                  <td>BRAND CLASSIFICATION</td>
                  <td>{this.state.featuredLocation.brandClassification}</td>
                </tr>
                </tbody>
              </table>
          </div>
          <hr />

          <div className="featuredBeerContainer row">
            <img alt="The beer Label" className="col-lg-3 col-md-6" src={this.state.featuredBeerLabel.medium} />
            <div className="col-lg-3 col-md-6">
              <h2>{this.state.featuredBeer.name}</h2>
              <p>{this.state.featuredBeer.description}</p>
              <button className="btn-primary"><a href={this.state.featuredBeerBrewery.website} rel="noopener noreferrer" target="_blank">VIEW BREWERY WEBSITE</a><span className='btnIcon'>></span></button>
            </div>
            <table className='table table-striped featuredBeerTbl col-lg-6 col-md-12 col-sm-12'>
              <tbody>
                <tr>
                  <th colSpan="2">{this.state.featuredBeer.name}</th>
                </tr>
                <tr>
                  <td>ALCOHOL BY VOLUME</td>
                  <td>{this.state.featuredBeer.abv}</td>
                </tr>
                <tr>
                  <td>INTERNATIONAL BITTERNESS UNITS</td>
                  <td>{this.state.featuredBeer.ibu}</td>
                </tr>
                <tr>
                  <td>AVAILABILITY</td>
                  <td>{this.state.featuredBeerAvail.description}</td>
                </tr>
                <tr>
                  <td>STYLE</td>
                  <td>{this.state.featuredBeerStyle.description}</td>
                </tr>
                <tr>
                  <td>BREWERY</td>
                  <td>{this.state.featuredBeerBrewery.name}</td>
                </tr>
                <tr>
                  <td>BREWERY DESCRIPTION</td>
                  <td>{this.state.featuredBeerBrewery.description}</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        <Footer />
      </div>
    );
  }







}

export default FeaturedBrewery;
