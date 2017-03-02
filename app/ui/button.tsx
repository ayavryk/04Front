import * as React from 'react';
const css = require('./css/button.css');


export default class Button extends React.Component < any, any > {

    private onClick() {
        if (this.props.onClick) {
            this.props.onClick();
        }   else {
            console.log('click');
        }
    }

    public render() {
        let className = css.button ;

        let disabled = {};
        if (this.props.disabled) {
            disabled = {
                disabled: 'disabled'
            };
            className =  className + ' ' + css.button_disabled;
        }
        if (this.props.type) {
            className =  className + ' ' + css['button_' + this.props.type];
        }
        if (this.props.className) {
            className = className + ' ' +  this.props.className;
        }
        const title = this.props.label ? {title:this.props.label} : {};
        return (
                <button className = {className} {...title} {...disabled} onClick = {() => this.onClick()}>
                    {this.props.children}
                </button>
        );
    }
}
