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
        const icons = {
            refresh: { name: 'fa-refresh', color: 'green' },
            cancel: { name: 'fa-ban', color: 'maroon' },
            ok: { name: 'fa-check-square ', color: 'green' },
            warning: { name: 'fa-exclamation-circle', color: 'maroon' },
        };
        let className = css.button ;
        let disabled = {};
        if (this.props.disabled) {
            disabled = {
                disabled: 'disabled'
            };
            className =  className + ' ' + css.button_disabled;
        }
        const title = this.props.label ? {title: this.props.label} : {};
        let icon;
        if (this.props.type) {
            const ico = icons[this.props.type] ? icons[this.props.type] : icons.ok ;
            icon = <i 
                className={'fa fa-times ' + ico.name + ' ' + css.ico}
                style={{color:ico.color}}
                aria-hidden="true"
                onClick = {close}
            />;
        } 
        return (
                <button className = {className} {...title} {...disabled} onClick = {() => this.onClick()}>
                    {this.props.type && icon}
                    {this.props.children}
                </button>
        );
    }
}
