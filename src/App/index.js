import React from 'react';

import Header from 'components/Header';
import LeaderBoard from 'components/LeaderBoard';

import './app.scss';

export default function App() {
  return (
    <div>
      <Header />
      <a name='top'>&nbsp;</a>
      <LeaderBoard />
    </div>
  );
}
