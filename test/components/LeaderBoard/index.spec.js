import LeaderBoard from 'components/LeaderBoard';

describe('<LeaderBoard />', () => {
  let wrapper,
    wrapperInstance;

  beforeEach(() => {
    wrapper = shallow(<LeaderBoard />);
    wrapperInstance = wrapper.instance();
  });

  it('should be a div', () => {
    expect(wrapper).to.have.type('div');
  });

  it('should have proper initial state', () => {
    expect(wrapper).to.have.state('topCampers').deep.equal({
      month: [],
      allTime: []
    });
  });

  it('should have a method fetchTopCampers to update state', () => {
    
  });
});
