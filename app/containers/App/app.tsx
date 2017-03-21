import * as React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Menu from 'components/Menu/menu';
import { setMessage } from 'reducers/rCommand';
import { setData } from 'reducers/rTable';
import AppServerMessages from './appServerMessages';

class App extends React.Component<any, void> {

    public render() {
        return (
            <div>
                <Menu isChanged = {this.props.isChanged} />
                <AppServerMessages actions={this.props.actions} message={this.props.message} />
                {this.props.children}
            </div>
        );
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
