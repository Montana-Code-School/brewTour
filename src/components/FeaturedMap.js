import React from 'react';
import {Gmaps, Marker} from 'react-gmaps';

const params = {v: '3.exp', key: 'AIzaSyDjzkSWSOc8KAZyrefu8JdI58dG14dpPhU'};

class FeaturedMap extends React.Component {
  onMapCreated(map) {
    map.setOptions({
      disableDefaultUI: true
    });
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
