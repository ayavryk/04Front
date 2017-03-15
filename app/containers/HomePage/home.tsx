import * as React from 'react';
const connect = require('react-redux').connect;
import { bindActionCreators } from 'redux';

class HomePage extends React.Component<any, void> {
    public render() {
        return (
            <div/>
        );
    };
}

function mapStateToProps(state) {
    return state.edit;
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({}, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
