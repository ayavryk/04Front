import * as React from 'react';

import Mult from 'ui/mult';
const css = require('./configBuilder.css');
const uicss = require('ui/css/ui.css');

export default class ConfigBuilderEdit extends React.Component<any, any> {

    public fields = [];
    public output = null;
    public fieldsSelectConfig;

    public intialState = {
        fields : [],
    };

    public componentWillReceiveProps() {
        this.initialization();
    }

    public componentWillMount() {
        this.initialization();
    }

    public initialization() {
        this.setState(this.intialState);
        
    }

    public parseFields() {
        const data = this.props.data;
        const fields = Object.keys(data.fields).map(item => Object.assign({ name: item }, data.fields[item]));
        let rel = [];
        if (data.rel) {
            rel = data.rel.map(item => Object.assign({ rel: true }, { name: item.link }));
        }
        this.fields = fields.concat(rel);
        const src = this.fields.map(item => {
            const value = {};
            value[item.name] = item.name;
            return value;
        });
        src.unshift({ beginBlock: '---beginBlock---' });
        src.unshift({ endBlock: '---endBlock---' });
        this.fieldsSelectConfig = {
            field: 'field',
            type: 'select',
            title: 'fields',
            src
        };

    }

    public generateForm() {
       
        const fieldsType = {
            tinyint: 'check',
            longtext: 'rich',
            text: 'text'
        };
        const data = this.state.fields;
        const fields = this.props.data.fields;
        let arr = data.map( item => {
            if (!item.field) {
                return null;
            }
            let res: any = {
                field: item.field,
                type: 'input'
            };
            const field = item.field || '';
            const name = item.name || field;
            if (field && fields[field] && fields[field].type && fieldsType[fields[field].type]) {
                res.type = fieldsType[fields[field].type];
            }
            if (res.type === 'input') {
                res.placeholder = name;
            }
            res.label = name;
            if (item.width) {
                res.width = item.width;
            }
            if (item.flex) {
                res.flex = item.flex;
            }
            if (field.indexOf('_rel') > 0) {
                const table = field.split('_');
                res = {
                    type: 'mult',
                    field,
                    config : [{
                        type: 'autocomplete',
                        field: 'name',
                        placeholder: name,
                        title:  name,
                        src: '{server}?method=' + table[1] + '&controller=suggest&query=',
                    }],
                    label: name
                };
                if (item.width) {
                    res.config[0].width = item.width;
                }
            }
            return res;
        });
        arr = arr.filter(item => item);
        const res = [];
        let block = [];
        let blockOn = false;
        for (const value of arr) {
            switch (value.field) {
                case 'beginBlock':
                    blockOn = true;
                    break;
                case 'endBlock':
                    blockOn = false;
                    if (block.length) {
                        res.push(block);
                    }
                    block = [];
                    break;
                default:
                    if (blockOn) {
                        block.push(value);
                    } else {
                        if (!value.flex) {
                            value.flex = 1;
                        }
                        res.push([value]);
                    }
            }
        }
        if (blockOn && block.length) {
            res.push(block);
        }
        return JSON.stringify({config: res}, null, '\t');
    }

    public getConfigForm() {
        const res = [
            this.fieldsSelectConfig,
            {
                type: 'input',
                field: 'name',
                placeholder: 'Имя поля',
                width: '100px'
            },
            {
                type: 'input',
                field: 'width',
                placeholder: 'width',
                width: '100px'
            },
            {
                type: 'input',
                field: 'flex',
                label: 'flex',
                width: '50px',
            }
        ];
        return res;
    }

    public onChange = value =>  {
        this.setState({ fields: value.value });
    };


    public componentDidUpdate(){
        this.output.scrollTop = this.output.scrollHeight;
    }

    public render() {
        this.parseFields();
        const form = this.getConfigForm();
        return (
            <div>
                <div className={css.h1}>Edit {this.props.head}</div>
                <Mult
                    value={this.state.fields}
                    onChange={this.onChange}
                    name="form"
                    config={form}
                    className = {css.mult}
                />
                <textarea
                    className = {css.text + ' ' + uicss.textarea}
                    value = {this.generateForm()} onChange={e => e} 
                    ref={e => { this.output = e;}}
                />
            </div>);
    };
}
