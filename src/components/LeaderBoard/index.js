import React, { Component, PropTypes } from 'react';

import UserList from 'components/UserList';

import style from './style.scss';

export default class LeaderBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topCampers: {
        month: [],
        allTime: []
      },
      error: null,
      sortBy: 'month',
      isLoading: true
    };

    this.fetchTopCampers = this.fetchTopCampers.bind(this);
    this.updateState = this.updateState.bind(this);
    this.toggleSort = this.toggleSort.bind(this);
  }

  fetchTopCampers( timeFrame ) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open(
        'GET',
        `https://fcctop100.herokuapp.com/api/fccusers/top/${timeFrame}`,
        true
      );

      xhr.onreadystatechange = function() {
        if(this.readyState === 4  && this.status === 200) {
          resolve(xhr.responseText);
        }

        if(this.readyState === 0 || (this.readyState === 4 && this.status !== 200)) {
          if (xhr.statusText) {
            reject(xhr.statusText);
          } else {
            reject('An unknown error occured!');
          }
        }
      };

      xhr.send(null);
    });
  }

  updateState() {
    return Promise.all([
      this.fetchTopCampers('recent'),
      this.fetchTopCampers('alltime')
    ]).then(topCampers => {
      this.setState({
        topCampers: {
          month: JSON.parse(topCampers[0]),
          allTime: JSON.parse(topCampers[1])
        },
        error: null,
        isLoading: false
      });
    }).catch(error => {
      this.setState({
        error,
        isLoading: false
      });
    });
  }

  toggleSort(sortBy) {
    if(this.state.sortBy !== sortBy) {
      this.setState({ sortBy });
    }
  }

  renderButton(sortTrigger) {
    let buttonText, buttonID;

    switch(sortTrigger) {
      case 'month':
        buttonText = 'By Month';
        buttonID = 'toggle-month';
        break;
      case 'allTime':
        buttonText = 'All Time';
        buttonID = 'toggle-all-time'
        break;
      default:
        return null;
    };

    return (
      <div className='btn-group btn-group-lg' role='group'>
        <button
          type='button'
          className={ 'btn ' + (
            this.state.sortBy ===
              sortTrigger ?
              'btn-primary' :
              'btn-default'
          )}
          id={ buttonID }
          onClick={() => this.toggleSort(sortTrigger)}>
          { buttonText }
        </button>
      </div>
    );
  }

  componentDidMount() {
    return this.updateState();
  }

  render() {
    const users = this.state.sortBy === 'month' ?
      this.state.topCampers.month :
      this.state.topCampers.allTime;

    return (
      <div id='leader-board'>
        <div className='btn-group btn-group-justified' role='group'>
          { this.renderButton('month') }
          { this.renderButton('allTime') }
        </div>
        <UserList users={users} />
      </div>
    );
  }
};
