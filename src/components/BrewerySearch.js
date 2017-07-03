import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Gmap from './gmap';
import NavBar from './NavBar';
import Intro from './Intro';
import Footer from './Footer';
import {auth, db} from '../config/configFirebase';
import CreateTour from './CreateTour';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import SimpleModal from './SimpleModal';
import BrewSearchResults from './BrewSearchResults';

class BrewerySearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      tourArr: [],
      locality: "",
      region: "",
      latArr: [],
      lngArr: [],
      show: '',
      btnColor: 'lightgray',
      close: '',
      isState: false
    };

  }

  handleCityChange(event) {
    const locality=event.target.value;
    this.setState({
      locality: locality
    });
  }

  handleRegionChange(event) {
    const region = event.target.value;
    this.setState({
      region: region
    });
  }


handleCitySubmit(event) {
  axios.get('http://localhost:9078/api/proxy/breweries/' + this.state.locality)
    .then(res => {
      console.log(res);
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

handleRegionSubmit(event) {
  axios.get('http://localhost:9078/api/proxy/breweries/region/' + this.state.region)
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
        lngArr: lngArr,
        isState: true
      });

    });

    event.preventDefault();
}

render() {
  return (
    <div>
        <NavBar />
        <Intro />
        <div className='mainContainer'>
          <div className='row mainRow'>
            <div className='col-lg-6'>
              <Gmap isState={this.state.isState} categories={this.state.categories} lat={this.state.latArr} lng={this.state.lngArr} tourArr={this.state.tourArr} />
            </div>
            <div className='col-lg-5 col-lg-offset-1 breweryListUI'>
            <div className="TwoSearchBars">
              <form onSubmit={this.handleCitySubmit.bind(this)} className='row'>
                <input className="stateInput col-lg-10" type="text" placeholder="Search By City..." value={this.state.locality} onChange={this.handleCityChange.bind(this)}/>
                <input className="stateInputBtn fa fa-search col-lg-2" type="submit" value="&#xf002;"/>
              </form>
              <form onSubmit={this.handleRegionSubmit.bind(this)} className='row'>
                <input className="stateInput col-lg-10" type="text" placeholder="Search By State..." value={this.state.region} onChange={this.handleRegionChange.bind(this)}/>
                <input className="stateInputBtn fa fa-search col-lg-2" type="submit" value="&#xf002;" />
              </form>
              </div>
                <Tabs>
                  <TabList className="row tabNav">
                    <Tab className="col-md-4">{this.state.locality + " "} BREWERIES</Tab>
                    <Tab className="col-md-4">MY TOUR</Tab>
                  </TabList>
                  <TabPanel>
                    <BrewSearchResults categories={this.state.categories} tourArr={this.state.tourArr}/>
                  </TabPanel>
                  <TabPanel>
                    <CreateTour tourArr={this.state.tourArr}/>
                  </TabPanel>
                </Tabs>
              </div>
            </div>
            <SimpleModal />
          </div>
        <Footer />
      </div>
    );
  }
}

export default BrewerySearch;
