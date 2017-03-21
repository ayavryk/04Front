import * as React from 'react';
import { hashHistory } from 'react-router';
import AppNotify from './appNotify';
import Dialog from 'ui/dialog';
const css = require('./appNotify.css');

export default class AppServerMessages extends React.Component < any, any > {

    private notify;
    private message;

    public showMessage(message){
        this.message.open({
            title: ' ',
            text:  <div dangerouslySetInnerHTML ={{ __html: message }} / >,
            buttons: [
              { name: 'OK', type: 'secondary' }
            ]
        });
    }

    public componentWillReceiveProps(nextProps) {
        if (nextProps.message.message) {
            this.showMessage(nextProps.message.message);
            this.props.actions.setMessage({ message: '' });
        }
        if (nextProps.message.notify) {
            this.notify.show(nextProps.message.notify);
            this.props.actions.setMessage({ notify: '' });
        }
        if (nextProps.message.command) {
            switch (nextProps.message.command) {
                case 'save':
                    hashHistory.goBack();
                    this.notify.show('Сохранено');
                    this.props.actions.setMessage({ command: '' });
                    break;
                default:
            }
        }
    }

    public show(message) {
        this.setState({
            message,
            className: css.show
        });
        setTimeout(() => this.setState({ className: '' }), 1000);
    }

    public render() {
        return (
            <div>
                <AppNotify ref={e => this.notify = e} />
                <Dialog ref={e => this.message = e} />
            </div>
        );
    }
}
