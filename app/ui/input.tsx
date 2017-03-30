import * as React from 'react';
const css = require('./css/ui.css');

export default class Input extends React.Component < any, any > {

    private onChange(event) {
        if (this.props.name) {
            this.props.onChange({field: this.props.name, value: event.target.value});
        }   else {
            console.log('not found field name');
        }
    }
    public render() {
        const style = this.props.width ? {width: this.props.width} : {};
        const required = (this.props.required && !this.props.value) ? css.required : ' ';
        return (
            <input
                className={css.input + ' ' + required}
                style={style}
                type="text"
                placeholder = {this.props.placeholder || this.props.title || this.props.label}
                onChange={e => this.onChange(e)}
                value={this.props.value}
            />);
    }
}
