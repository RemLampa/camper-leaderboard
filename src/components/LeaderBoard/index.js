import React, { Component, PropTypes } from 'react';

import UserList from 'components/UserList';

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
    this.toggleSortByMonth = this.toggleSortByMonth.bind(this);
    this.toggleSortByAllTime = this.toggleSortByAllTime.bind(this);
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

  toggleSortByMonth() {
    if(this.state.sortBy !== 'month') {
      this.setState({sortBy: 'month'});
    }
  }

  toggleSortByAllTime() {
    if(this.state.sortBy !== 'allTime') {
      this.setState({sortBy: 'allTime'});
    }
  }

  componentDidMount() {
    return this.updateState();
  }

  render() {
    const users = this.state.sortBy === 'month' ?
      this.state.topCampers.month :
      this.state.topCampers.allTime;

    return (
      <div>
        <button id='toggle-month' onClick={this.toggleSortByMonth}>
          By Month
        </button>
        <button id='toggle-all-time' onClick={this.toggleSortByAllTime}>
          All Time
        </button>
        <UserList users={users} />
      </div>
    );
  }
};
