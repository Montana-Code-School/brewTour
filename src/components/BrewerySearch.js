import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Gmap from './gmap';
import NavBar from './NavBar';
import Intro from './Intro';
import Footer from './Footer';
import {auth, db} from '../config/configFirebase';

class BrewerySearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      tourArr: [],
      region: "",
      latArr: [],
      lngArr: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.storeTour = this.storeTour.bind(this);

  }

  handleChange(event) {
    const region=event.target.value;
    this.setState({
      region: region
    });
  }



handleSubmit(event) {
  axios.get('http://localhost:9078/api/proxy/breweries/' + this.state.region)
    .then(res => {
      const categories = res.data.data;
      const latArr = [];
      const lngArr = [];
      categories.map(category => {
        latArr.push(category.latitude);
        lngArr.push(category.longitude);
      });

      this.setState({
        categories:categories,
        latArr: latArr,
        lngArr: lngArr
      });

    });

    event.preventDefault();
}

buttonClicked(event) {
  this.state.tourArr.push(this.state.categories[event.target.value]);
  this.state.tourBrewNames = this.state.tourArr.map((brewery, i) =>
    this.state.tourArr[i].brewery.name
  )
}

storeTour(userId) {
 db.ref().child('users').child(auth.currentUser.uid).update({
   tour: this.state.tourArr
 });
}


render() {
  return (
    <div>
        <NavBar />
        <Intro />
        <div className='mainContainer'>
          <div className='row mainRow'>
            <div className='col-lg-6'>
              <Gmap categories={this.state.categories} lat={this.state.latArr} lng={this.state.lngArr} />
            </div>
            <div className='col-lg-5 col-lg-offset-1 breweryListUI'>
              <form onSubmit={this.handleSubmit} className='row'>
                <input className="stateInput col-lg-10" type="text" placeholder="Search By State..." value={this.state.region} onChange={this.handleChange.bind(this)}/>
                <input className="stateInputBtn fa fa-search col-lg-2" type="submit" value="&#xf002;" onChange={this.handleSubmit.bind(this)}/>
              </form>
              <div className='breweryListContainer'>
                <table className='table table-striped'>
                  <thead>
                    <tr>
                    <th>BREWERY NAME</th>
                    <th>SAVE IT!</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.categories.map((category, i) =>
                      <tr>
                      <td key={i}>{category.brewery.name}</td>
                      <td><button type='button' value={i} onClick={this.buttonClicked.bind(this)} className='btn listBtn'>ADD TO YOUR TOUR<span className='btnIcon'>></span></button></td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className='text-center'>
                <button type='button' onClick={this.storeTour.bind(this)} className='btn breweryListBtn'>VIEW THIS TOUR<span className='btnIcon'>></span></button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default BrewerySearch;
