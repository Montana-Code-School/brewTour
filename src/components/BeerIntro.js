import React from 'react';
import ReactDOM from 'react-dom';


class Intro extends React.Component {
  render() {
    return (
        <div className='beerIntroContainer'>
          <div className='row'>
            <div className='col-lg-12 text-center'>
              <h1>DRINK, SAVE, RATE. . . REPEAT</h1>
              <h3>Find your favorite beers, read about them, rate and save them to your profile. <br />Never forget the name of that beer again.</h3>
            </div>
          </div>
        </div>
    );
  }
}

export default Intro;
