import * as React from 'react';
const css = require('./css/check.css');

export default class Input extends React.Component < any, any > {

    private getCheckboxStatus() {
        const res = this.props.value && (
            (parseInt(this.props.value,0) === 1)
            || this.props.value === 'true'
            || this.props.value === true
        );
        return res;
    }

    private onClick(event) {

        if (this.props.name) {
            let value = this.getCheckboxStatus() ? 0 : 1;
            this.props.onChange({field:this.props.name, value});
        }   else {
            console.log('not found field name');
        }
    }

    public render() {
        return (
        <label title="ttttt" className = {css.checkWrapper}>
            <span className={css.inputWrapper}>
                <input
                        className={css.check}
                        checked = {this.getCheckboxStatus()}
                        type="checkbox"
                        onChange={(e) => this.onClick(e)}
                />
            </span>
            {this.props.label && <span className = {css.text}>{this.props.label}</span>}
        </label>
        );
    }
};

