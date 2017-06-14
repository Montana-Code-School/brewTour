import React from 'react';
import ReactDOM from 'react-dom';

class Footer extends React.Component {
  render() {
    return (
      <div className='footerContainer'>
        <div className='row'>
          <div className='col-lg-5'>
            <p>
              This web application and all materials within it are property of BrewTour Inc.
              Special <em>THANK YOU</em> to the breweryDB database and API accessibility.
            </p>
            <br />
            <p>©Copyright BrewTour Inc. 2017</p>
          </div>
          <div className='col-lg-5 col-lg-offset-2 teamImages'>
            <ul>
              <li><img src='img/jesseProfile.png' /></li>
              <li><img src='img/davidProfile.png' /></li>
              <li><img src='img/chadwickProfile.png' /></li>
              <li><img src='img/mikeProfile.png' /></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
