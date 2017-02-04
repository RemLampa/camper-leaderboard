import React from 'react';

import chai, { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';

chai.use(chaiEnzyme());

global.React = React;
global.chai = chai;
global.expect = expect;
global.shallow = shallow;
global.mount = mount;
global.render = render;
