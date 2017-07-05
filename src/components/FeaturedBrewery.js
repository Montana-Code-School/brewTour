import React from 'react';
import reactDOM from 'react-dom';
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
            <img className="col-lg-3" src={this.state.locationImages.squareMedium} />
            <div className="col-lg-3">
              <h2>{this.state.featuredLocation.name}</h2>
              <p>{this.state.featuredLocation.description}</p>
              <button className="btn btn-primary"><a href={this.state.featuredLocation.website} target="_blank">VIEW WEBSITE</a><span className='btnIcon'>></span></button>
            </div>
            <div className="col-lg-6">
              <FeaturedMap
                featuredLocation={this.state.featuredLocation}
                locationImages={this.state.locationImages}
                mapLocation={this.state.mapLocation}
                />
            </div>
          </div>
          <hr />

          <div className="featuredBeerContainer row">
            <img className="col-lg-3" src={this.state.featuredBeerLabel.medium} />
            <div className="col-lg-3">
              <h2>{this.state.featuredBeer.name}</h2>
              <p>{this.state.featuredBeer.description}</p>
              <button className="btn-primary"><a href={this.state.featuredBeerBrewery.website} target="_blank">VIEW BREWERY WEBSITE</a><span className='btnIcon'>></span></button>
            </div>
            <table className='table table-striped featuredBeerTbl col-lg-6'>
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
