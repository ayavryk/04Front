import * as React from 'react';
const css = require('./configBuilder.css');

import ConfigBuilderFields from './configBuilderFields';
import {Text, Button} from 'ui';


export default class ConfigBuilderForm extends React.Component<any, any> {


    public onChange(data){
        const fieldsType = {
            int: 'check',
            longtext: 'rich',
            text: 'text'
        }
        let fields = this.props.data.fields;
        let arr = data.map( item => {
            if (!item.field) {
                return null;
            }
            let res: any = {
                field: item.field,
                type: 'input'
            };
            if (fields[item] && fields[item].type && fieldsType[fields[item].type]) {
                res.type = fieldsType[fields[item].type];
            }
            switch (res.type) {
                case 'input':
                    res.placeholder = 'PLACEHOLDER OF ' + item.field;
                    break;
                case 'check':
                    res.label = 'LABEL OF ' + item.field;
                    break;
                default:
                    break;
            }
            return res;
        });
 
        console.log(arr);
    }




    public render() {
        const onChange = this.onChange.bind(this);
        return (
            <div>
                <h1 className={css.h1}>Форма</h1>
                <div className={css.configPlaceHolder}>
                    <ConfigBuilderFields data={this.props.data} onChange={onChange}  />
                </div>
                <Button onClick = {() => this.calc()}>Сгенерировать</Button>
                <Text className = {css.textarea} />
            </div>);
    };
}
