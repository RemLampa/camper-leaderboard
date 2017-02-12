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

  it('should be a table', () => {
    expect(wrapper).to.have.type('table');
  });

  it('should render header row', () => {
    const headerCells = wrapper.find('tr').first().find('th');

    expect(headerCells.at(0)).to.have.text('Rank');
    expect(headerCells.at(1)).to.have.text('Camper Name');
    expect(headerCells.at(2)).to.have.html('<th>Brownie Points<br/>(Past 30 Days)</th>');
    expect(headerCells.at(3)).to.have.html('<th>Brownie Points<br/>(All Time)</th>');
  });

  it('should render user rows', () => {
    const userRow = wrapper.find('tr.user-row').map((user, index) => {
      let cells = user.find('td');

      expect(cells.at(0)).to.have.text(String(index + 1));
      expect(cells.at(1)).to.have.text(users[index].username);
      expect(cells.at(1).find('img').filter({ src: users[index].img })).to.have.length(1);
      expect(cells.at(2)).to.have.text(String(users[index].recent));
      expect(cells.at(3)).to.have.text(String(users[index].alltime));
    });
  });
});
