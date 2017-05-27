
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: []
    };
  }


componentDidMount() {
  axios.get(`http://api.brewerydb.com/v2/categories?key=5d2a32cf36729810ffae82e7193a9769`)
    .then(res => {
      const categories = res.data.data;
      this.setState({categories});

    });
}

render() {
  return (
    <div>
      <h1>BEEEEERRRRRR!!!</h1>
      <ul>
        {this.state.categories.map(category =>
          <li key={category.name}>{category.name}</li>
        )}
      </ul>
    </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('container'));
