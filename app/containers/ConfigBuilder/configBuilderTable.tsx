import * as React from 'react';

import Mult from 'ui/mult';
import Check from 'ui/check';
import filterDefaultConfigExt from 'components/CTableControl/filterDefaultConfigExt';
import configIconsTable from './configIconsTable';
import configGroupTable from './configGroupTable';
const css = require('./configBuilder.css');
const uicss = require('ui/css/ui.css');


export default class ConfigBuilderTable extends React.Component<any, any> {

    public fields = [];
    public output = null;
    public fieldsSelectConfig;
    public intialState = {
        ext: { group: 0, icon: 0, filter: 0 },
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
        this.fieldsSelectConfig = {
            field: 'field',
            type: 'select',
            title: 'fields',
            src
        };

    }

    public generateForm(){
        this.parseFields();
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
                res.link = '/edit/' + this.props.head + '/{id}';

            }
            if (field === 'id') {
                res.link = '/field/{id}';

            }
            return res;
        });
        arr = arr.filter(item => item);
        if (this.state.ext.icon) {
            arr = arr.concat(configIconsTable);
        }        
        const result: any = { config: arr };
        if (this.state.ext.group) {
            result.group = configGroupTable;
        }
        if (this.state.ext.filter) {
            result.filters = filterDefaultConfigExt;
        }
        return JSON.stringify(result, null, '\t');
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
                field: 'linkEdit',
                label: 'linkEdit',
                width: '100px'
            }

        ];
        return res;
    }

    public onChange = value =>  {
        this.setState({ fields: value.value });
    };

    public componentDidUpdate() {
        this.output.scrollTop = this.output.scrollHeight;
    }

    public extChange = data => {
        const state = { ...this.state.ext };
        state[data.field] = 1 - state[data.field];
        this.setState({ ext: state });
    }

    public render() {
        const form = this.generateForm();
        return (
            <div>
                <div className={css.h1}>Table {this.props.head} </div>
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
                    <Check
                        name="group"
                        onChange={this.extChange}
                        label="Групповые операции"
                    />
                    <Check
                        name="icon"
                        onChange={this.extChange}
                        label="Операции со строками"
                    />
                    <Check
                        name="filter"
                        onChange={this.extChange}
                        label="Расширенные фильтры"
                    />
                </fieldset>
                <textarea
                    className = {css.text + ' ' + uicss.textarea}
                    value = {form}
                    onChange={e => e}
                    ref={e => {this.output = e;}}
                />
            </div>);
    };
}
