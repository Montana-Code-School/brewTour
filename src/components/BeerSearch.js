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
      beerReturn:''
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


handleSubmit(event) {
  console.log(this.state.beerReturn.name)
  axios.get('http://localhost:9078/api/proxy/beers/' + this.state.beername)
    .then(res => {
      const beerReturn = res.data.data[0];

      this.setState({
        beerReturn:beerReturn
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
            </div>
            <div className='col-lg-6'>
              <h2>{this.state.beerReturn.name}</h2>
            </div>
          </div>
        </div>
      <Footer />
    </div>
    );
  }
}

export default BeerSearch;
