import React from 'react';
import ReactDOM from 'react-dom';
import {Expo,TweenMax, Power2, TimelineMax, Linear} from 'gsap';
import GSAP from 'react-gsap-enhancer';
import styles from './beerAnimation.css';

class BeerAnimation extends React.Component {
  constructor(props){
    super(props);

    let checkSalt = this.props.check.replace(/[\W]/g, '').toLowerCase();

    console.log(checkSalt);
    this.state = {
      checkSalt: checkSalt
    };
  }

  randomNumber(min, max){
  	return Math.floor(Math.random() * (1 + max - min) + min);
  }

  componentDidUpdate() {
    const percent = this.props.percentage + '%';
    const width = (this.props.percentage * 1.1) + '%';
    const scale = (this.props.percentage * 0.005) + 1;
    const check = this.state.checkSalt;
    console.log(percent);
    const bubs = new TimelineMax();
    const beerPour = new TimelineMax();
    beerPour.to('.liquid'+check, 4, {height:percent, delay: 1})
            .to('.tru'+check, 4,{width: width, height:percent},'-=4')
            .to('.foam'+check, 1.5,{scale:scale},'-=2');

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
            <div className={"beer-foam tru"+ this.state.checkSalt}>
              <div className={"foam-1 foam" + this.state.checkSalt}></div>
              <div className={"foam-2 foam" + this.state.checkSalt}></div>
              <div className={"foam-3 foam" + this.state.checkSalt}></div>
              <div className={"foam-4 foam" + this.state.checkSalt}></div>
              <div className={"foam-5 foam" + this.state.checkSalt}></div>
              <div className={"foam-6 foam" + this.state.checkSalt}></div>
              <div className={"foam-7 foam" + this.state.checkSalt}></div>
          </div>


        <div id="liquid" className={"liquid"+this.state.checkSalt}>
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
