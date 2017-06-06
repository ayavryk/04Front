import * as React from 'react';
const css = require('./css/button.css');


export default class Button extends React.Component < any, any > {

    private onClick = () => {
        if (this.props.onClick) {
            this.props.onClick();
        } else {
            console.log('empty click');
        }
    }

    public render() {

        const icons = {
            default: { type: 'fa-check', color: 'green' },
            refresh: { type: 'fa-refresh', color: 'green' },
            cancel: { type: 'fa-ban', color: 'maroon' }
        };

        let className = css.button ;
        let disabled = {};
        if (this.props.disabled) {
            disabled = {
                disabled: 'disabled'
            };
            className =  className + ' ' + css.button_disabled;
        }
        if (this.props.type) {
            className = className + ' ' + css['button_' + this.props.type];
        }
        if (this.props.className) {
            className = className + ' ' + this.props.className;
        }
        const title = this.props.label ? { title: this.props.label } : {};
        const ico = icons[this.props.icon && icons[this.props.icon] ? this.props.icon : 'default'];
        return (
                <button className = {className} {...title} {...disabled} onClick = {this.onClick}>
                    {
                        this.props.icon
                        && <i style={{ color:ico.color }} className={'fa ' + ico.type} />}
                        <span>{this.props.children}</span>
                </button>
        );
    }
}
