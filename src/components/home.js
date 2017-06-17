import React from 'react';
import {withRouter} from 'react-router-dom';
import {Uid} from '../config/uid';
import Login from './login';

export const Home = () => (
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
    <h1>Welcome to BrewTour!</h1>
  </div>
</main>
));
