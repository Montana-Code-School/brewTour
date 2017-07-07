import React from 'react';
import {Link} from 'react-router-dom';


class Intro extends React.Component {
  render() {
    return (
        <div className='introContainer'>
          <div className='row'>
            <div className='col-lg-6'>
              <h1>Tour The Nation . . . <br />One Brewery At A Time</h1>
              <h3>Customize A Trip By Finding The Best Breweries<br /> And Adding Them To YOUR Tour</h3>
              <Link to='/profile' type='button' className='btn btn-primary'>VIEW YOUR SAVED TOURS<span className='btnIcon'>></span></Link>
            </div>
          </div>
        </div>
    );
  }
}

export default Intro;
