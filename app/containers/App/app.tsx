import * as React from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Menu from 'components/Menu/menu';
import Dialog from 'ui/dialog';
import { set as setData } from 'reducers/rEdit';
import { setMessage } from 'reducers/rMessage';
import AppNotify from './appNotify';


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
        if (!nextProps.message.message) {
            return;
        }
        const message = nextProps.message.message;
        switch (message) {
            case 'save':
                browserHistory.goBack();
                this.notify.show('Сохранено');
                break;
            default:
                this.showMessage(message);
        }
        this.props.actions.setMessage({ message: '' });
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
        actions: bindActionCreators({setData, setMessage}, dispatch)
    };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
