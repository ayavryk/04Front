import * as React from 'react';

import { Button, AutoComplete, Input, Select, Text, Check} from './';
import { shiftDown, ctrlDown } from '../lib/key';

const css = require('./css/mult.css');

const controls = {
    input: Input,
    select: Select,
    check: Check,
    text: Text,
    autocomplete: AutoComplete
};


export default class Mult extends React.Component < any, any > {

    private count = 1;
    private width = '100%';
    private data = [];

    constructor(props) {
        super(props);
        this.count = Math.max(1, parseInt(this.props.count || 1, 10));
        this.width = (100 / this.count) + '%';
    }

    private onChange(key, data) {
        const element = this.data[key];
        for (const field of element) {
            if (field.field === data.field) {
                field.value = data.value;
                break;
            }
        }
        this.onChangeData();
    }

    private onChangeData() {
        const value = this.data.map(item => {
            const res = {};
            for (let i = 0; i < item.length; i++) {
                res[item[i].field] = item[i].value;
            }
            return res;
        }, this);
        this.props.onChange({field: this.props.name, value});
    }


    private renderOneField(item, key) {
        const render = (key, item, index) => {
            const filter = (item, field) => {
                return item.field === field.field;
            };
            let config = this.props.config.filter(filter.bind(this, item));
            if (config.length !== 1) {
                // число получаемых полей может быть больше чем в конфиге. 
                // эти поля не должны отображаться
                return (<input type="hidden" key={index} name={item.field}  alt={item.value} />);
            }
            config = config[0];
            config.name = item.field;
            config.value = item.value;
            config.onChange = this.onChange.bind(this, key);
            return (
                <div className={css.cell} key={index}>
                    {React.createElement(controls[config.type], config)}
                </div>
            );
        };
        return item.map(render.bind(this, key));
    }


    private setData() {
        if (this.props.value && Array.isArray(this.props.value) && this.props.value.length) {

            this.data = this.props.value.map(item => {
                const res = [];
                for (const j in item) {
                    if (item.hasOwnProperty(j)) {
                        res.push({field: j, value: item[j]});
                    }
                }
                return res;
            }, this);

        } else {
            // если данных нет забивается один элемент
            this.data = [[]];
            for (const field of this.props.config) {
                this.data[0].push({ field: field.field, value: ''});
            }
        }
    }

    private delElement(index) {
        this.data.splice(index, 1);
        this.onChangeData();
    }

    private addElement(index) {
        const ins = [];
        console.log(shiftDown);
        for (const e of this.data[0]) {
            ins.push({ field: e.field, value: '' });
        }
        const pos = ctrlDown ? index : index + 1;
        this.data.splice(pos, 0, ins);
        this.onChangeData();
    }

    private renderAll() {
        this.setData();
        const minBtn = key => this.data.length > 1 ?
            <Button className={css.minus} onClick = {() => this.delElement(key)}>—</Button> : '';
        const render = (item, key) => {
            const style = { zIndex: (this.data.length - key) };
            return (
                <div className={css.wrapper} key={key}>
                    <div style={style} className={css.line}>
                        {this.renderOneField(item,key)}
                        {minBtn(key)}
                        <Button className={css.plus} onClick = {() => this.addElement(key)}>+</Button>
                    </div>
                </div>
            );
        };
        return this.data.map(render.bind(this));
    }

    public render() {
        // {React.createElement(controls[type], this.props)}
        return (
                <div className={this.props.className}>
                   {this.renderAll()}
                </div>
        );
    }
};

