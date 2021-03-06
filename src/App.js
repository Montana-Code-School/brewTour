import React, { Component } from 'react';
import {BrowserRouter, Route, Redirect} from 'react-router-dom';
import {isAuthenticated, auth, storageKey} from './config/configFirebase';
import BrewerySearch from './components/BrewerySearch';
import {Home} from './components/home';
import Profile from './components/profile';
import SiteUse from './components/SiteUse'
import Register from './components/register';
import FeaturedBrewery from './components/FeaturedBrewery';
import BeerSearch from './components/BeerSearch';
import PropTypes from 'prop-types';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: null,
      user: null
    };
  }

  static childContextTypes = {
    uid: PropTypes.string
  }

  getChildContext() {
    return {uid: this.state.uid};
  }


  componentDidMount() {
    this.unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        window.localStorage.setItem(storageKey, user.uid);
        this.setState({uid: null, user: null});
      } else {
        window.localStorage.removeItem(storageKey);
        this.setState({uid: null, user: null});
      }
    });
  }
  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
    <BrowserRouter>
      <div className="wrapper">
        <Route exact path="/" component={Home} />
        <Route path="/register" component={Register} />
        <Route path="/siteuse" component={SiteUse} />
        <Route path="/featuredbrewery" component={FeaturedBrewery} />
        <Route path="/beersearch" component={BeerSearch} />
        <MatchWhenAuthorized path="/profile" component={Profile} />
        <MatchWhenAuthorized path="/brewerysearch" component={BrewerySearch} />
      </div>
    </BrowserRouter>
    );
  }
}

export default App;

const MatchWhenAuthorized = ({component: Component, ...rest}) => (
  <Route {...rest} render={renderProps => (
    isAuthenticated() ? (
      <Component {...renderProps} />
    ) : (
      <Redirect to={{
        pathname: '/',
        state: {from: renderProps.location}
      }}/>
    )
  )} />
)
