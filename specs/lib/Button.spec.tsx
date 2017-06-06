import * as React from 'react';
import { shallow,  } from 'enzyme';
import * as sinon from 'sinon';

import Button from 'ui/button';

describe('Button', () => {

    const label = 'Label';
    const onButtonClick = sinon.spy();
    const button = shallow(
      <Button label={label} onClick={onButtonClick} />
    );

    it(`button label render`, () => {
        // cм. комментарий https://github.com/airbnb/enzyme/blob/master/docs/api/ShallowWrapper/props.md
        const actual = button.instance().props.label;
        expect(actual).toEqual(label);
    });

    it('should contain span for label', () => {
        expect(button.find('span').length).toBe(1);
    });

    it('simulate click', () => {
        button.simulate('click');
        expect(onButtonClick.calledOnce).toBe(true);
    });



});


