import LeaderBoard from 'components/LeaderBoard';

describe('<LeaderBoard />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<LeaderBoard />);
  });

  it('should be a div', () => {
    expect(wrapper).to.have.type('div');
  });

  it('should have proper initial state', () => {
    expect(wrapper).to.have.state('topCampers').deep.equal({
      month: [],
      allTime: []
    });
    expect(wrapper).to.have.state('error').to.be.null;
    expect(wrapper).to.have.state('isLoading').to.be.true;
  });

  describe('Async Method fetchTopCampers()', () => {
    let server, wrapperInstance;

    beforeEach(() => {
      server = fakeServer.create();
      server.autoRespond = true;
      wrapperInstance = wrapper.instance();
    });

    afterEach(() => {
      server.restore();
    });

    it('should fetch from API and return a promise upon success', () => {
      const data = JSON.stringify({ test: 'test' });

      server.respondWith(
        'GET',
        'https://fcctop100.herokuapp.com/api/fccusers/top/recent',
        [ 200, { 'Content-Type': 'application/json' }, data ]
      );

      server.respondWith(
        'GET',
        'https://fcctop100.herokuapp.com/api/fccusers/top/alltime',
        [ 200, { 'Content-Type': 'application/json' }, data ]
      );

      return wrapperInstance.fetchTopCampers('recent').then(monthList => {
        return wrapperInstance.fetchTopCampers('alltime').then(allTimeList => {
          expect(monthList).to.equal(data);
          expect(allTimeList).to.equal(data);
        })
      });
    });

    it('should reject promise on errors', () => {
      const responseText = 'Not Found';

      server.respondWith(
        'GET',
        'https://fcctop100.herokuapp.com/api/fccusers/top/recent',
        [ 404, { 'Content-Type': 'application/json' }, responseText ]
      );

      return wrapperInstance.fetchTopCampers('recent').catch(response => {
        expect(response).to.equal(responseText);
      });
    });
  });

  describe('Async Method updateState()', () => {
    let wrapperInstance, fetchTopCampersStub;

    beforeEach(() => {
      wrapperInstance = wrapper.instance();

      fetchTopCampersStub = stub(wrapperInstance, 'fetchTopCampers');
    });

    afterEach(() => {
      fetchTopCampersStub.restore();
    });

    it('should call method fetchTopCampers() twice', () => {
      return wrapperInstance.updateState().then(() => {
        expect(fetchTopCampersStub.calledTwice).to.be.true;
      });
    });

    it('should call method fetchTopCampers() with argument "recent" once', () => {
      wrapperInstance.updateState();

      expect(fetchTopCampersStub.withArgs('recent').calledOnce).to.be.true;
    });

    it('should call method fetchTopCampers() with argument "alltime" once', () => {
      wrapperInstance.updateState();

      expect(fetchTopCampersStub.withArgs('alltime').calledOnce).to.be.true;
    });

    it('should update component state on resolved promise', () => {
      const expectedState = {
        month: [{name: 'month'}],
        allTime: [{name: 'allTime'}]
      };

      fetchTopCampersStub.withArgs('recent').returns(JSON.stringify(expectedState.month));
      fetchTopCampersStub.withArgs('alltime').returns(JSON.stringify(expectedState.allTime));

      return wrapperInstance.updateState().then(() => {
        expect(wrapper).to.have.state('topCampers').to.deep.equal(expectedState);
        expect(wrapper).to.have.state('error').to.be.null;
        expect(wrapper).to.have.state('isLoading').to.be.false;
      });
    });

    it('should update component state on rejected promise', () => {
      const errorMessage = 'An error occured.';

      fetchTopCampersStub.returns(Promise.reject(errorMessage));

      return wrapperInstance.updateState().then(() => {
        expect(wrapper).to.have.state('error').to.equal(errorMessage);
        expect(wrapper).to.have.state('isLoading').to.be.false;
      });
    });
  });

  context('On Component Mount', () => {
    let mountedWrapper, mountedWrapperInstance, updateStateStub;

    beforeEach(() => {
      updateStateStub = stub(LeaderBoard.prototype, 'updateState');
      mountedWrapper = mount(<LeaderBoard />);
    });

    afterEach(() => {
      updateStateStub.restore();
    });

    it('should call method updateState() once', () => {
      expect(updateStateStub.calledOnce).to.be.true;
    });
  });
});
