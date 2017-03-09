import * as React from 'react';
const css = require('./appNotify.css');

export default class AppNotify extends React.Component < any, any > {

    public state = {
        message: '',
        className: ''
    };

    public show(message) {
        this.setState({
            message,
            className: css.show
        });
        setTimeout(() => this.setState({ className: '' }), 1000);
    }

    public render() {
        return (
            <div className={css.notifyContainer}>
                <div className={css.notify + ' ' + this.state.className}>
                    {this.state.message}
                </div>
            </div>
        );
    }
}
