import App from 'App';

import NavBar from 'components/NavBar';
import LeaderBoard from 'components/LeaderBoard';

describe('<App />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  it('should be a div', () => {
    expect(wrapper.type()).to.equal('div');
  });

  it('should render a <NavBar />', () => {
    expect(wrapper).to.contain(<NavBar />);
  });

  it('should render a <LeaderBoard />', () => {
    expect(wrapper).to.contain(<LeaderBoard />);
  });
});
