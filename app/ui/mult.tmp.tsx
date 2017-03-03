import * as React from 'react';
const css = require('./css/mult.css');

import { AutoComplete,Select} from './';

const controls = {
    select:Select,
    autocomplete:AutoComplete
};

export default class Mult extends React.Component < any, any > {

    private count =1;
    private width = '100%';

    constructor(props) {
        super(props);
        this.count =   Math.max(1,parseInt(this.props.count || 1,10));
        this.width =  (100 / this.count) + '%';
    }

    private onClick() {
        if (this.props.onClick) {
            this.props.onClick();
        }   else {
            console.log('click');
        }
    }

    public elementUpdate() {
        console.log('update');
    }

    public renderAll() {
        const data = this.props.data || [''];
        const dataLength = Math.max(this.count,data.length);
        const iterator = (item, index) => {
            const props = {
                        key : index,
                        value: item,
                        name:'nameZ',
                        src: this.props.src || [],
                        placeholder: this.props.src || '',
                        onChange : this.elementUpdate
            };
            return React.createElement(controls[this.props.mtype], props);
        };

        for (let i = data.length; i < dataLength; i++) {
            data[i] = '';
        }

        return data.map(iterator.bind(this));
    }

    public render() {
        // {React.createElement(controls[type], this.props)}
        return (
                <div className={css.mult}>
                    {this.renderAll()}
                </div>
        );
    }
}
