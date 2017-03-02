import * as React from 'react';
import { connect } from  'react-redux';
import { bindActionCreators } from 'redux';
import Menu  from 'components/Menu/menu';
import Dialog from 'ui/dialog';
import {set as setData} from 'reducers/rEdit';
import {setMessage} from 'reducers/rMessage';

class App extends React.Component<any, void> {

    private message = null;

    public componentWillReceiveProps(nextProps) {
      if (!nextProps.message.message) { return; }
      this.message.open({
        title: ' ',
        text:  <div dangerouslySetInnerHTML ={{__html: nextProps.message.message}} / >,
        buttons:[
          {name:'OK', type:'secondary'}
        ]
      });
      this.props.actions.setMessage({message:''});
    }
    public render() {
      return (
      <div>
        <Menu isChanged = {this.props.isChanged} />
        {this.props.children}
         <Dialog ref={(e) => this.message = e} />
      </div>
  );
    };
}

function mapStateToProps(state) {

  return {
    message:state.message,
    isChanged:!!state.edit.isChanged,
  };
}

function mapDispatchToProps(dispatch) {
return {
    actions: bindActionCreators({setData,setMessage}, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
