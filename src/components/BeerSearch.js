import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import NavBar from './NavBar';
import Intro from './Intro';
import Footer from './Footer';
import {auth, db} from '../config/configFirebase';
import BeerIntro from './BeerIntro';

class BeerSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      beername:'',
      beerReturn:{},
      breweryReturn:'',
      beerLabelImg:''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleChange(event) {
    const beername=event.target.value;
    this.setState({
      beername: beername,
    });
  }

saveBeer(event) {
  console.info(this.state.beerReturn);
  db.ref().child("users").child(auth.currentUser.uid).child("beers").update({
    [this.state.beerReturn.name]: {Rating: ""}
  })
}

handleSubmit(event) {
  axios.get('http://localhost:9078/api/proxy/beers/' + this.state.beername)
    .then(res => {
      const beerReturn = res.data.data[0];
      const breweryReturn = res.data.data[0].breweries[0];
      const beerLabelImg = res.data.data[0].labels;

      console.log(beerReturn);
      this.setState({
        beerReturn:beerReturn,
        breweryReturn: breweryReturn,
        beerLabelImg: beerLabelImg
      });

    });

    event.preventDefault();
}

render() {
  return (
    <div>
        <NavBar />
        <BeerIntro />
        <div className='mainContainer'>
          <div className='row mainRow'>
            <div className='col-lg-6'>
              <form onSubmit={this.handleSubmit} className='row'>
                <input className="stateInput col-lg-10" type="text" placeholder="Search By Beer..." value={this.state.beername} onChange={this.handleChange.bind(this)}/>
                <input className="stateInputBtn fa fa-search col-lg-2" type="submit" value="&#xf002;" onChange={this.handleSubmit.bind(this)}/>
              </form>
              <img src={this.state.beerLabelImg.medium} />
            </div>
            <div className='col-lg-6'>
            <table className='table table-striped featuredBeerTbl'>
              <tr>
                <th colSpan="2">{this.state.beerReturn.name}</th>
              </tr>
              <tr>
                <td>DESCRIPTION</td>
                <td>{this.state.beerReturn.description}</td>
              </tr>
              <tr>
                <td>ALCOHOL BY VOLUME</td>
                <td>{this.state.beerReturn.abv}</td>
              </tr>
              <tr>
                <td>INTERNATIONAL BITTERNESS UNITS</td>
                <td>{this.state.beerReturn.ibu}</td>
              </tr>
              <tr>
                <td>BREWERY</td>
                <td>{this.state.breweryReturn.name}</td>
              </tr>
            </table>
            <button type='button' onClick={this.saveBeer.bind(this)}
            className='btn'
            >VIEW BEER LABEL<span className='btnIcon'>></span></button>
            </div>
          </div>
        </div>
      <Footer />
    </div>
    );
  }
}

export default BeerSearch;
