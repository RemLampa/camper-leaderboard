import React from 'react';

export default function Header() {
  return (
    <nav className='navbar navbar-inverse navbar-fixed-bottom'>
      <div className='container-fluid'>
        <div className='navbar-header'>
          <a className='navbar-brand' href='#'>
            freeCodeCamp LeaderBoard
          </a>
        </div>
        <div className='collapse navbar-collapse'>
          <ul className='nav navbar-nav navbar-right'>
            <li>
              <a href='#top'>Back to Top</a>
            </li>
            <li>
              <a className='navbar-link' href='https://github.com/ibleedfilm/camper-leaderboard'>
                Source Code
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
