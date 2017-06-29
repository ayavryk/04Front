import * as React from 'react';
import { shallow  } from 'enzyme';

import Button from 'ui/button';
import Mult from 'ui/mult';

let dataOnchane = false;
const spec = {
    config: [
        {
            type: 'autocomplete',
            field: 'name',
            placeholder: 'Автор',
            required: true,
            title: 'Автор',
            src: '{server}?method=author&controller=suggest&query=',
            width: '10em'
        }
    ],
    label: 'Авторы',
    value: [
        {
            name: 'Толстой Л. Н.',
            fname: 'Лев Толстой',
            id: 1236
        }, {
            name: 'Толстой Л. Н.',
            fname: 'Лев Толстой',
            id: 1236
        }
    ],
    name: 'text_author_rel',
    type: 'mult',
    placeholder: '',
    onChange : () => { dataOnchane = true; }
};

describe('Button', () => {

    const mult = shallow(
      <Mult {...spec} />
    );

    it(`Mult render`, () => {
        const label = mult.instance().props.label;
        expect(label).toEqual(spec.label);
    });

    it(`Mult check data count`, () => {
        const buttons = mult.find(Button);
        expect(buttons.length).toBe(4);
    });

    it(`Mult add element click`, () => {
        const button = mult.find(Button).first();
        button.simulate('click');
        expect(dataOnchane).toBe(true);
    });

});


