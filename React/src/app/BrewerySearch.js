
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class BrewerySearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      region: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleChange(event) {
    const region=event.target.value;
    this.setState({
      region: region
    });
  }



handleSubmit(event) {
  axios.get('http://api.brewerydb.com/v2/locations?key=5d2a32cf36729810ffae82e7193a9769&region=' + this.state.region)
    .then(res => {
      console.log(res.data.data);
      const categories = res.data.data;
      this.setState({categories});

    });

    event.preventDefault();
}


render() {
  return (
    <div>
      <h1>BEEEEERRRRRR!!!</h1>
      <form onSubmit={this.handleSubmit}>
        <input type="text" placeholder="region" value={this.state.region} onChange={this.handleChange.bind(this)}/>
        <input type="submit" value="submit" onChange={this.handleSubmit.bind(this)}/>
      </form>

      <ul>
        {this.state.categories.map(category =>
          <li key={category.brewery.name}>{category.brewery.name}</li>
        )}
      </ul>
    </div>
    );
  }
}

export default BrewerySearch;
// ReactDOM.render(<App />, document.getElementById('container'));
