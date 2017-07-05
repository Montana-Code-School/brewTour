import React from 'react';
import {withRouter} from 'react-router-dom';
import {Uid} from '../config/uid';
import {isAuthenticated} from '../config/configFirebase';
import Login from './login';
import {Redirect} from 'react-router-dom';

export const Home = () => (
  isAuthenticated() ? <Redirect to={'/profile'} /> :
  <Uid>
    {(uid) => (
      <HomePage uid={uid} />
    )}
  </Uid>
)

const HomePage = withRouter(({uid, push}) => (

<main>
 <Login />
  <div className="welcome">
  </div>
</main>
));
