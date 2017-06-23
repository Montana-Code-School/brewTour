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
              <li><img alt="Developer: Jesse Head" className="footerImage" src='img/jesseProfile.png' /></li>
              <li><img alt="Developer: David Miller" className="footerImage" src='img/davidProfile.png' /></li>
              <li><img alt="Developer: Chadwick Platt-Kuhn" className="footerImage" src='img/chadwickProfile.png' /></li>
              <li><img alt="Developer: Mike Dreiling" className="footerImage" src='img/mikeProfile.png' /></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
