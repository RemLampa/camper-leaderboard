import UserList from 'components/UserList';

describe('<UserList />', () => {
  let wrapper, users;

  beforeEach(() => {
    users = [
      {
        username: 'testuser1',
        img: 'https://avatars.githubusercontent.com/u/4639625?v=3',
        alltime: 3000,
        recent: 400,
        lastUpdate: "2017-02-06T18:46:24.821Z"
      },
      {
        username: 'testuser1',
        img: 'https://avatars.githubusercontent.com/u/4639625?v=3',
        alltime: 5390,
        recent: 525,
        lastUpdate: "2017-02-06T18:46:24.821Z"
      },
      {
        username: 'testuser1',
        img: 'https://avatars.githubusercontent.com/u/4639625?v=3',
        alltime: 4390,
        recent: 25,
        lastUpdate: "2017-02-06T18:46:24.821Z"
      }
    ];

    wrapper = shallow(<UserList users={users} />);
  });

  it('should be a ul', () => {
    expect(wrapper).to.have.type('table');
  });
});
