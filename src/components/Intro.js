import React from 'react';
import ReactDOM from 'react-dom';


class Intro extends React.Component {
  render() {
    return (
        <div className='introContainer'>
          <div className='row'>
            <div className='col-lg-6'>
              <h1>Tour The Nation . . . <br />One Brewery At A Time</h1>
              <h3>Customize A Trip By Finding The Best Breweries<br /> And Adding Them To YOUR Tour</h3>
              <button type='button' className='btn btn-primary'>VIEW YOUR SAVED BREWERIES<span className='btnIcon'>></span></button>
            </div>
          </div>
        </div>
    );
  }
}

export default Intro;
