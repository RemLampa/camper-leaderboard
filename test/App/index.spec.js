import App from 'App';

import Header from 'components/Header';
import LeaderBoard from 'components/LeaderBoard';

describe('<App />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  it('should be a div', () => {
    expect(wrapper.type()).to.equal('div');
  });

  it('should render a <Header />', () => {
    expect(wrapper).to.contain(<Header />);
  });

  it('should render a <LeaderBoard />', () => {
    expect(wrapper).to.contain(<LeaderBoard />);
  });
});
