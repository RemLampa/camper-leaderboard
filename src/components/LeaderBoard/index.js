import React, { Component, PropTypes } from 'react';

export default class LeaderBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topCampers: {
        month: [],
        allTime: []
      },
      error: null,
      isLoading: true
    };

    this.fetchTopCampers = this.fetchTopCampers.bind(this);
    this.updateState = this.updateState.bind(this);
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

  componentDidMount() {
    return this.updateState();
  }

  render() {
    return (
      <div>
      </div>
    );
  }
};
