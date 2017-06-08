import React from 'react';
import ReactDOM from 'react-dom';
import {Gmaps, Marker, InfoWindow, Circle} from 'react-gmaps';

const params = {v: '3.exp', key: 'AIzaSyDjzkSWSOc8KAZyrefu8JdI58dG14dpPhU'};

class Gmap extends React.Component {
constructor(props) {
  super(props);

  this.state = {
    latAverage: [],
    lngAverage: []
  };
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

    var  markLoop = this.props.categories.map((brewery, i) => {

      this.state.latAverage.push(brewery.latitude);
      this.state.lngAverage.push(brewery.longitude);


      return(
        <Marker
          key={brewery.breweryId}
          lat={brewery.latitude}
          lng={brewery.longitude}
          draggable={false}
          clickable={true}
          onClick={function(e){
                    var infowindow = new google.maps.InfoWindow({
                                        content: brewery.locality + i,
                                        position: e.latLng
                                    });
                    infowindow.open(this.get('map'), this);

              }} />
      );
    });

    return (
      <Gmaps
        width={'800px'}
        height={'600px'}
        lat={(this.getAverage(this.state.latAverage) === 0) ? 41.8679 : this.getAverage(this.state.latAverage)}
        lng={(this.getAverage(this.state.lngAverage) === 0) ? -124.1490 : this.getAverage(this.state.lngAverage)}
        zoom={5}
        loadingMessage={'Be happy'}
        params={params}
        onMapCreated={this.onMapCreated}>
        {markLoop}
      </Gmaps>
    );

  }

};


export default Gmap;
