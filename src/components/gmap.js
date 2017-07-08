import React from 'react';
import {Gmaps, Marker} from 'react-gmaps';

const params = {v: '3.exp', key: 'AIzaSyDjzkSWSOc8KAZyrefu8JdI58dG14dpPhU'};

class Gmap extends React.Component {
  onMapCreated(map) {
    map.setOptions({
      disableDefaultUI: true
    });
  }
  getAverage(arr) {
    if (arr.length > 0) {
      const equation = arr.sort((a,b) => b - a).slice(2, arr.length - 3).reduce((a, b) => a + b) / (arr.length-5);
    return (equation);
    }
    else {
      return 0;
    }
  }

  render() {


    var  markLoop = this.props.categories.map((brewery, i) => {
      if (brewery.website === undefined) {
        brewery.website = "# onClick = 'return false'";
      } else {
        brewery.website = brewery.website;
      }

      return(
        <Marker
          key={brewery.breweryId}
          lat={brewery.latitude}
          lng={brewery.longitude}
          draggable={false}
          clickable={true}
          onClick={function(e){
                    var brewIcon = "";
                    if (brewery.brewery.images === undefined || brewery.brewery.images === null) {
                      brewIcon = "img/btPlaceholder.jpg";
                    } else {
                      brewIcon = brewery.brewery.images.icon;
                    }
                    var infowindow = new window.google.maps.InfoWindow({
                                        content: '<div class="iw-container"><div class="iw-title"><img src='
                                        + brewIcon + '><h3>'
                                        + brewery.brewery.name + '</h3></div>'
                                        + `<div class="iw-content"><p><a target="_blank" href=${brewery.website}`
                                        + '>BREWERY WEBSITE</a>' +  brewery.streetAddress + '<br />'
                                        + brewery.locality + ', ' + brewery.region + '<br /></p></div>',
                                        position: e.latLng
                                    });
                    infowindow.open(this.get('map'), this);
              }}
         />
      );
    });

    return (
      <Gmaps className={"brewerySearchMap"}
        width={'100%'}
        height={'600px'}
        position={'relative'}
        lat={(this.getAverage(this.props.lat) === 0) ? 38.8880 : this.getAverage(this.props.lat)}
        lng={(this.getAverage(this.props.lng) === 0) ? -121.0162 : this.getAverage(this.props.lng)}
        zoom={(this.props.isState) ? 5 : 14}
        loadingMessage={'Be happy'}
        params={params}
        onMapCreated={this.onMapCreated}>
        {markLoop}
      </Gmaps>
    );

  }

};


export default Gmap;
