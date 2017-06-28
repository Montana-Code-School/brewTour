import React from 'react';
import ReactDOM from 'react-dom';
import {Gmaps, Marker, InfoWindow, Circle} from 'react-gmaps';

const params = {v: '3.exp', key: 'AIzaSyDjzkSWSOc8KAZyrefu8JdI58dG14dpPhU'};

class Gmap extends React.Component {
constructor(props) {
  super(props);

  this.state = {
    latAverage: [],
    lngAverage: [],
  };

  this.mapTourBtnClicked = this.mapTourBtnClicked.bind(this);

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

  mapTourBtnClicked(event) {
    console.log("hello");
    this.props.tourArr.push(this.props.categories[event.target.value]);

    this.props.tourArr.map((brewery, i) =>
      this.props.tourArr[i].brewery.name
    )
  }


  render() {


    var  markLoop = this.props.categories.map((brewery, i) => {

      return(
        <Marker
          key={brewery.breweryId}
          lat={brewery.latitude}
          lng={brewery.longitude}
          draggable={false}
          clickable={true}
          onClick={function(e){
                    var infowindow = new window.google.maps.InfoWindow({
                                        content: '<div class="iw-container">'
                                        + '<div class="iw-title">' + '<img src=' + `${brewery.brewery.images.icon}` + ">"
                                        + '<h3>' + brewery.brewery.name + '</h3>' + '</div>'
                                        + '<div class="iw-content">' + '<button onClick=' + "this.mapTourBtnClicked()" + 'value=' + `${i}` + '>' + 'ADD TO TOUR' + '</button>' + '<p>' + brewery.streetAddress + '<br />'
                                        + brewery.locality + ', ' + brewery.region + '<br />' + '<a target="_blank" href=' + `${brewery.website}` + '>'
                                        + 'BREWERY WEBSITE' + '</a>' + '</p>' + '</div>',
                                        position: e.latLng
                                    });
                    infowindow.open(this.get('map'), this);
              }}
         />
      );
    });

    return (
      <Gmaps
        width={'570px'}
        height={'600px'}
        lat={(this.getAverage(this.props.lat) === 0) ? 41.8679 : this.getAverage(this.props.lat)}
        lng={(this.getAverage(this.props.lng) === 0) ? -124.1490 : this.getAverage(this.props.lng)}
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
