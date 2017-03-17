import * as React from 'react';
const css = require('./css/ui.css');

export default class Select extends React.Component < any, any > {

    private onChange = event => {
        if (this.props.name) {
            this.props.onChange({field:this.props.name, value: event.target.value});
        }   else {
            console.log('not found field name');
        }
    }

    public render() {
        const dataArray = this.props.src || [];
        const style = this.props.width ? {width:this.props.width} : {};
        const data = dataArray.map((item, index) => {
            let value = '';
            let text = '';
            for (const i in item) {
                if (item.hasOwnProperty(i)) {
                    value = i;
                    text = item[i];
                }
            }
            return (
                <option key={index} value={value}>{text}</option>
            );
        });
        return (
            <select style = {style} className={css.select} value={this.props.value || ''}  onChange={this.onChange} >
                <option/>
                {data}
            </select>
        );
    }
}
