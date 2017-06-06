import * as React from 'react';
const css = require('./css/modal.css');
import Button from './button';

const visible = {display: 'block'};
const hidden = {display: 'none'};

export function sum(a, b) {
   return a + b;
}

export default class Modal extends React.Component < any, any > {

    constructor(props) {
        super(props);
        this.state = {
            style: hidden
        };
    }

    public componentWillReceiveProps(newProps) {
        this.setState({style: newProps.visible ? visible : hidden});
    }

    public stopPropagation(e) {
        e.stopPropagation();
    }

    public close() {
        this.setState({style: hidden});
        if (this.props.onClose) {
            this.props.onClose();
        }
    }

    public buttonsRender() {
        if (!this.props.buttons) {
            return <div />;
        }

        const onclick = item => {
            this.close();
            if (item.onClick) {
                item.onClick();
            }
        };

        const btns = this.props.buttons.map((item, index) => {
            return (
              <Button key={index} icon = {item.icon} type={item.type} onClick = {() => onclick(item)}>
                {item.name}
              </Button>
            );
        }, this);

        return <div className = {css.buttons}>{btns}</div >;
    }

    public render() {
        const close = () => this.close();
        const iclose = <i className={'fa fa-times ' + css.close} aria-hidden="true" onClick = {close} />;
        const headClassHame = css.header + ' ' +
            ((this.props.type && this.props.type === 'warning') ? css.warning : '');
        return (
        <div style={this.state.style}>
          <div className={css.overlay} onClick = {close}>
            <div className={css.wrapper}>
              <div className={css.subWrapper} onClick = {close} >
                <div className={css.modal + ' ' + (this.props.className || '')} onClick={this.stopPropagation}>
                    <div className={headClassHame}>
                      {iclose}
                      {this.props.title || ' '}
                    </div>
                    <div className={css.body}>
                      {this.props.children}
                    </div>
                    {this.buttonsRender()}
                </div>
              </div>
            </div>
            </div>
        </div >
        );
    }
};
