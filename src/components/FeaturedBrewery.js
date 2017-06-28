import React from 'react';
import reactDOM from 'react-dom';
import axios from 'axios';
import NavBar from './NavBar';
import FeaturedMap from './FeaturedMap';

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
    axios.get('http://localhost:9078/api/proxy/featuredlocation')
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
        <h2>Featured Brewery</h2>
        <h3>{this.state.featuredLocation.name}</h3>
        <img src={this.state.locationImages.squareMedium} />
        <p>{this.state.featuredLocation.description}</p>
        {console.log(this.state.mapLocation.latitude)}
        <FeaturedMap
          featuredLocation={this.state.featuredLocation}
          locationImages={this.state.locationImages}
          mapLocation={this.state.mapLocation}
          />
        <h2>Featured Beer</h2>
        <h3>{this.state.featuredBeer.name}</h3>
        <img src={this.state.featuredBeerLabel.medium} />
        <table className='table table-striped featuredBeerTbl'>
          <tr>
            <th colSpan="2">{this.state.featuredBeer.name}</th>
          </tr>
          <tr>
            <td>DESCRIPTION</td>
            <td>{this.state.featuredBeer.description}</td>
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
        </table>
      </div>
    );
  }







}

export default FeaturedBrewery;
