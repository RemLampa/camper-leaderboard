import NavBar from 'components/NavBar';

describe('<NavBar />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<NavBar />);
  });

  it('should be a nav', () => {
    expect(wrapper).to.have.type('nav');
  });

  it('should render brand name', () => {
    expect(wrapper.find('a.navbar-brand')).to.have.text('freeCodeCamp LeaderBoard');
  });

  it('should have link to repo', () => {
    const repoURL = 'https://github.com/ibleedfilm/camper-leaderboard';
    expect(wrapper.find('a').filter({ href: repoURL })).to.have.length(1);
  });
});
