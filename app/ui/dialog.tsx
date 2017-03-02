import * as React from 'react';
import { Modal } from './';
import { clone } from 'lib';

class Dialog extends React.Component<any, any> {

  public state = {
    visible: false,
    text: '',
    title: '',
    buttons: []
  };

  public open = (params) => {
    let data = {
      visible: true,
      buttons:  this.props.buttons || [{name:'OK',type:'secondary'}],
      type:  this.props.type  ||  'normal',
      text: this.props.text || '',
      title: this.props.title || '',
      className: this.props.className || ''
    };
    data = Object.assign(clone(data),params);
    this.setState(data);
  };

  public close = () => {
    this.setState({visible:false});
  };

  public render() {
    const body = this.props.children ? this.props.children : this.state.text ||  '';
    return (
      <div>
        <Modal onClose={() => this.close()} {...this.state} >
            {body}
        </Modal>
      </div>
    );
  }
};



export default Dialog;
