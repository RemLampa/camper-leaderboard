import Header from 'components/Header';

describe('<Header />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Header />);
  });

  it('should be an h1', () => {
    expect(wrapper).to.have.type('h1');
  });

  it('should render correct text', () => {
    expect(wrapper).to.have.text('freeCodeCamp LeaderBoard');
  });
});
