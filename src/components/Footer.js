import React from 'react';

class Footer extends React.Component {
  render() {
    return (
      <div className='footerContainer'>
        <div className='row'>
          <div className='col-lg-5 col-md-12 col-sm-12'>
            <p>
              This web application and all materials within it are property of BrewTour Inc.
              Special <em>THANK YOU</em> to the breweryDB database and API accessibility.
            </p>
            <br />
            <p>©Copyright BrewTour Inc. 2017</p>
          </div>
          <div className='col-lg-5 col-lg-offset-2 col-md-12 col-sm-12 teamImages'>
            <ul>
              <li><a href="https://www.facebook.com/jesse.head.54" rel="noopener noreferrer" target="_blank"><img alt="Developer: Jesse Head" className="footerImage" src='img/jesseProfile.png' /></a></li>
              <li><a href="http://www.linkedin.com/in/dmiller50" rel="noopener noreferrer" target="_blank"><img alt="Developer: David Miller" className="footerImage" src='img/davidProfile.png' /></a></li>
              <li><a href="http://www.linkedin.com/in/chadwickplatkuhn" rel="noopener noreferrer" target="_blank"><img alt="Developer: Chadwick Platt-Kuhn" className="footerImage" src='img/chadwickProfile.png' /></a></li>
              <li><a href="https://www.linkedin.com/in/mikedreiling/" rel="noopener noreferrer" target="_blank"><img alt="Developer: Mike Dreiling" className="footerImage" src='img/mikeProfile.png' /></a></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
