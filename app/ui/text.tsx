import * as React from 'react';
const css = require('./css/ui.css');

interface ITextProps {
    className?: string;
    onChange?: any;
    name?: string;
    value?: string;
}

export default class Text extends React.Component < ITextProps, any > {

    private onChange(event) {
        if (this.props.name) {
            this.props.onChange({field: this.props.name, value: event.target.value});
        }   else {
            console.log('not found field name');
        }
    }

    public render() {
        return (
            <textarea
                className={css.textarea + ' ' + this.props.className}
                type="text" onChange={e => this.onChange(e)}
                value={this.props.value}
            />
        );
    }

}
