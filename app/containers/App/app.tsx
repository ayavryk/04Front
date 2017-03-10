import * as React from 'react';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Menu from 'components/Menu/menu';
import Dialog from 'ui/dialog';
import { setMessage } from 'reducers/rCommand';
import AppNotify from './appNotify';
import { setData } from 'reducers/rTable';

class App extends React.Component<any, void> {

    private message = null;
    private notify = null;

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

    public render() {
        return (
        <div>
          <Menu isChanged = {this.props.isChanged} />
          {this.props.children}
          <Dialog ref={e => this.message = e} />
          <AppNotify ref={e => this.notify = e} />
        </div>);
    };
}

function mapStateToProps(state) {
    return {
        message: state.message,
        isChanged: !!state.edit.isChanged,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ setMessage, setData }, dispatch)
    };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
