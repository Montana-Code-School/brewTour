import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Map from './Map';
import GoogleApiComponent from './GoogleApiComponent';

export class Container extends React.Component {
  render() {
    const style = {
      width: '300px',
      height: '300px'
    }
    if (!this.props.loaded) {
      return <div>Loading...</div>
    }
    return (
      <div style={style}>
        <Map google={this.props.google} />
      </div>
    );
  }
}

export default GoogleApiComponent({
  apiKey: 'AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo'
})(Container)
