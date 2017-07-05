import React from 'react';
import ReactDOM from 'react-dom';
import {Gmaps, Marker, InfoWindow, Circle} from 'react-gmaps';

const params = {v: '3.exp', key: 'AIzaSyDjzkSWSOc8KAZyrefu8JdI58dG14dpPhU'};

class FeaturedMap extends React.Component {
constructor(props) {
  super(props);


  this.state = {
  };

  console.log(this.props.locationImages);

}

  onMapCreated(map) {
    map.setOptions({
      disableDefaultUI: true
    });
  }
  getAverage(arr) {
    if (arr.length > 0) {
      const equation = arr.sort((a,b) => a-b).slice(1, arr.length).reduce((a, b) => a + b) / (arr.length - 2);
      console.log(equation);
    return (equation);
    }
    else {
      return 0;
    }
    this.setState({
      latAverage: [],
      lngAverage: []
    });
  }

  onDragEnd(e) {
    console.log('onDragEnd', e);
  }

  onCloseClick() {
    console.log('onCloseClick');
  }

  onClick() {
    console.log('onClick');
  }


  render() {

    return (
      <Gmaps
        width={'570'}
        height={'600px'}
        lat={this.props.mapLocation.latitude}
        lng={this.props.mapLocation.longitude}
        zoom={8}
        loadingMessage={'Be happy'}
        params={params}
        onMapCreated={this.onMapCreated}>
        <Marker
          lat={this.props.mapLocation.latitude}
          lng={this.props.mapLocation.longitude}
          draggable={false}
           />
      </Gmaps>
    );

  }

};


export default FeaturedMap;
