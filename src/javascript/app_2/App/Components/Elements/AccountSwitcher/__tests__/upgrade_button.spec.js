import React                  from 'react';
import { expect }             from 'chai';
import { configure, shallow } from 'enzyme';
import Adapter                from 'enzyme-adapter-react-16';
import { UpgradeButton }      from '../upgrade_button.jsx';

configure({ adapter: new Adapter() });

describe('UpgradeButton', () => {
    it('should render one <UpgradeButton /> component', () => {
        const wrapper = shallow(<UpgradeButton />);
        expect(wrapper).to.have.length(1);
    });
});
