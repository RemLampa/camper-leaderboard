import React, { PropTypes } from 'react';

import style from './style.scss';

const UserList = ({users}) => {
  const onClick = (userName) => {
    window.location = `https://www.freecodecamp.com/${userName}`;
  }

  const renderUsers = users.map((user, index) => {
    return (
      <tr
        key={index}
        className='user-row'
        onClick={() => onClick(user.username)}
      >
        <td>{index + 1}</td>
        <td className='center-block'>
          <img className='img-responsive img-rounded center-block' src={user.img} />
          {user.username}
        </td>
        <td>{user.recent}</td>
        <td>{user.alltime}</td>
      </tr>
    );
  });

  return (
    <table className='user-list table table-bordered table-striped table-hover'>
      <tbody>
        <tr>
          <th>Rank</th>
          <th>Camper Name</th>
          <th>Brownie Points<br />(Past 30 Days)</th>
          <th>Brownie Points<br />(All Time)</th>
        </tr>
        {renderUsers}
      </tbody>
    </table>
  );
};

UserList.propTypes = {
  users: PropTypes.array.isRequired
};

export default UserList;
