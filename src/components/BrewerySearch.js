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
      region: "",
      latArr: [],
      lngArr: [],
      show: '',
      btnColor: 'lightgray',
      close: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleChange(event) {
    const region=event.target.value;
    this.setState({
      region: region,
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
                <Tabs>
                  <TabList className="row tabNav">
                    <Tab className="col-md-4">{this.state.region + " "} BREWERIES</Tab>
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
