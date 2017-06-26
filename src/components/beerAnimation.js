import React from 'react';
import ReactDOM from 'react-dom';
import {Expo,TweenMax, Power2, TimelineMax, Linear} from 'gsap';
import GSAP from 'react-gsap-enhancer';
import styles from './beerAnimation.css';

class BeerAnimation extends React.Component {
  constructor(props){
    super(props);
  }

  randomNumber(min, max){
  	return Math.floor(Math.random() * (1 + max - min) + min);
  }

  componentDidMount() {
    const bubs = new TimelineMax();
    const beerPour = new TimelineMax();
    beerPour.to('#liquid', 4, {height:"100%", delay: 1})
            .to('.beer-foam', 4,{right:'1px', width: "110%", height:"100%"},'-=4')
            .to('.foam', 1.5,{scale:1.5},'-=2');

    for (let i = 1; i < 11; i++) {
      let speed = (3 - this.randomNumber(0, 2));
      let randX = this.randomNumber(0, 220);
      let randX2 = this.randomNumber(0, 220);
      // bubs.set(".bubble"+ i, {x:randX, y:300}, 0);
      bubs.fromTo(".bubble"+ i, speed, {x:randX, y:300}, {y: -200, x:randX, repeatDelay:Math.random()*2, repeat:500}, Math.random() * 2);
    }


  }
  render() {
    return(
  <div id="container">
       <div id="beaker">
            <div className="beer-foam">
              <div className="foam foam-1"></div>
              <div className="foam foam-2"></div>
              <div className="foam foam-3"></div>
              <div className="foam foam-4"></div>
              <div className="foam foam-5"></div>
              <div className="foam foam-6"></div>
              <div className="foam foam-7"></div>
          </div>


        <div id="liquid">
          <div className="bubble bubble1"></div>
          <div className="bubble bubble2"></div>
          <div className="bubble bubble3"></div>
          <div className="bubble bubble4"></div>
          <div className="bubble bubble5"></div>
          <div className="bubble bubble6"></div>
          <div className="bubble bubble7"></div>
          <div className="bubble bubble8"></div>
          <div className="bubble bubble9"></div>
          <div className="bubble bubble10"></div>
        </div>
    </div>

 </div>
  );
  }
}

export default GSAP()(BeerAnimation);
