import React from 'react';

import NavBar from 'components/NavBar';
import LeaderBoard from 'components/LeaderBoard';

import './app.scss';

export default function App() {
  return (
    <div>
      <a name='top'></a>
      <div className='page-header'>
        <h1>freeCodeCamp LeaderBoard</h1>
      </div>
      <LeaderBoard />
      <NavBar />
    </div>
  );
}
