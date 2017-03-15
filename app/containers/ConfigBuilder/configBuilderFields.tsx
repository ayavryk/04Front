import * as React from 'react';

import Mult from 'ui/mult';
import {clone} from 'lib';

export default class ConfigBuilderForm extends React.Component<any, any> {

    public fields = [];
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


    public initialization(){
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
        src.unshift({ beginBlock: '---beginBlock---' });
        src.unshift({ beginBlock: '---beginBlock---' });
        this.fieldsSelectConfig = {
            field: 'field',
            type: 'select',
            title: 'fields',
            src
        };

    }

    public getConfigForm() {
        const res = [
            //clone(this.fieldsSelectConfig),
            {
        name : 'public',
        field:'eee',
        type : 'select',
        src : [
            {
                0: 'неопубликованные'
            }, {
                '-1': 'удаленные'
            }
        ]
            {
                type: 'input',
                field: 'width',
                placeholder: 'width',
                width: '100px'
            },
            {
                type: 'check',
                field: 'flex',
                label: 'flex'
            }
        ];
        return res;
    }

    public onChange = value =>  {
        this.setState({ fields: value.value });
    };

    public render() {
        //this.props.onChange(this.state.fields);
        return <Mult
                value={this.state.fields}
                onChange={this.onChange}
                name="form"
                config={this.getConfigForm()}
        />;
    };
}
