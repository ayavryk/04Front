import * as React from 'react';
const css = require('./css/check.css');

// TODO переделать для удаления дублирования onClick onChange;
interface ICheckBoxProps {
    onClick?: any;
    onChange?: any;
    className?: string;
    value?: any;
    name?: string;
    label?: string;
}

export default class CheckBox extends React.Component < ICheckBoxProps, any > {

    private getCheckboxStatus() {
        const res = this.props.value && (
            (parseInt(this.props.value, 0) === 1)
            || this.props.value === 'true'
            || this.props.value === true
        );
        return res;
    }

    private onClick = e => {

        if (this.props.onClick) {
            if (e) {
                this.props.onClick(e);
            }
            if (this.props.onChange) {
                console.log('!!! Checkbox field have onClick & onChange. It.s wrong!');
                return;
            }
        }

        if (this.props.name) {
            const value = this.getCheckboxStatus() ? 0 : 1;
            this.props.onChange({ field: this.props.name, value });
        } else {
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
                        onChange={this.onClick}
                        onClick = {e => this.onClick(e)}
                />
            </span>
            {this.props.label && <span className = {css.text}>{this.props.label}</span>}
        </label>
        );
    }
};

