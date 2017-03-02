import * as React from 'react';
const css = require('./css/ui.css');

export default class Input extends React.Component < any, any > {

    private onChange(event) {
        if (this.props.name) {
            this.props.onChange({field:this.props.name, value:event.target.value});
        }   else {
            console.log('not found field name');
        }
    }
    public render() {
        const style = this.props.width ? {width:this.props.width} : {};
        return (
            <input
                className={css.input}
                style={style}
                type="text"
                onChange={(e) => this.onChange(e)}
                value={this.props.value}
            />);
    }
}
