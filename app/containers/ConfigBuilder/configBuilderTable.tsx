import * as React from 'react';

import Mult from 'ui/mult';
import Check from 'ui/check';
const css = require('./configBuilder.css');
const uicss = require('ui/css/ui.css');

export default class ConfigBuilderTable extends React.Component<any, any> {

    public fields = [];
    public output = null;
    public fieldsSelectConfig;
    public commandConfig = [
        [{
            field: 'field',
            type: 'select',
            title: 'Операция',
            src : [
                {
                    '': 'неопубликованные'
                }, {
                    '-1': 'удаленные'
                }
            ]
        }]
    ];

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
        this.parseFields();
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
        this.fieldsSelectConfig = {
            field: 'field',
            type: 'select',
            title: 'fields',
            src
        };

    }


    public generateForm(){
        const data = this.state.fields;
        let arr = data.map( item => {
            if (!item.field) {
                return null;
            }
            const field = item.field || '';
            const res: any = {
                field,
                header: field
            };
            if (item.width) {
                res.width = item.width;
            }
            if (item.header) {
                res.header = item.header;
            }
            if (item.link) {
                res.link = '/edit/' + field + '/{id}';
            }
            return res;
        });
        arr = arr.filter(item => item);
        return JSON.stringify({ config: arr }, null, '\t');
    }

    public getConfigForm() {
        const res = [
            this.fieldsSelectConfig,
            {
                type: 'input',
                field: 'header',
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
                type: 'check',
                field: 'link',
                label: 'link',
                width: '100px'
            },
        ];
        return res;
    }

    public onChange = value =>  {
        this.setState({ fields: value.value });
    };


    public componentDidUpdate() {
        this.output.scrollTop = this.output.scrollHeight;
    }

    public render() {
        return (
            <div>
                <div className={css.h1}>{this.props.head} table config</div>
                <fieldset className={css.fieldset}>
                    <legend>Поля</legend>
                    <Mult
                        value={this.state.fields}
                        onChange={this.onChange}
                        name="form"
                        config={this.getConfigForm()}
                        className = {css.mult}
                    />
                </fieldset>
                <fieldset className={css.fieldset}>
                    <legend>Дополнительно</legend>
                    <Check name="group" label="Групповые операции" />
                    <Check name="icons" label="Операции со строками" />
                    <Check name="filters" label="Расширенные фильтры" />
                </fieldset>
                <textarea
                    className = {css.text + ' ' + uicss.textarea}
                    value = {this.generateForm()}
                    onChange={e => e}
                    ref={e => {this.output = e;}}
                />
            </div>);
    };
}
