/* 
https://github.com/react-component/pager/blob/master/src/Pager.jsx
*/

import * as React from 'react';
const css = require('./pager.css');

class PagerItem extends React.Component<any, any> {
  public handleClick(ev) {
    ev.preventDefault();
    if (!this.props.active && !this.props.disabled) {
      this.props.skipTo(this.props.page);
    }
  }

  public render() {
    let status = this.props.active ? css['pager-item-active'] : '';
    if (this.props.disabled) {
      status += css['pager-item-disabled'];
    }
    return (<li onClick={this.handleClick.bind(this)} className={status}>
      <a href="#">{this.props.text}</a>
    </li>);
  }
}



class CmdItem extends React.Component<any, any> {

  private handleClick(ev) {
    ev.preventDefault();
    if (!this.props.disabled) {
      this.props.skipTo(this.props.page);
    }
  }

  public render() {
    const disabled = this.props.disabled ? css['pager-item-disabled'] : '';
    return (<li onClick={this.handleClick.bind(this)} className={disabled}>
      <a href="#">
        <span aria-hidden="true">{this.props.text}</span>
      </a>
    </li>);
  }
}


export default class Pager extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.skipTo = this.skipTo.bind(this);
  }

  private _getFirstItem() {
    const self = this;
    const props = self.props;
    const current = props.current;
    const disabled = current === 0;
    const label = props.previousLabel || '«';

    return <CmdItem disabled={disabled} text={label} skipTo={this.skipTo} page={current - 1}/>;
  }


  private _getLastItem() {
    const self = this;
    const total = self.props.total;
    const current = self.props.current;
    const disabled = current === total - 1;
    const label = self.props.nextLabel || '»';

    return <CmdItem disabled={disabled} text={label} skipTo={this.skipTo} page={current + 1}/>;
  }


  private _getItems() {
    const self = this;
    const total = self.props.total;
    const current = self.props.current;
    const rst = [];
    let from = 0;
    let active;
    const skip = 2;
    let to = total - 1;
    let key = 0;

    if (current > skip) {
      from = current - skip;
    }
    if (total - current > skip) {
      to = current + skip;
    }
    if (from !== 0) {
      rst.push(<PagerItem key={key++} text={1} skipTo={this.skipTo} page={0}/>);
      if (from > 1) {
        rst.push(<PagerItem key={key++} text="..." disabled={true}/>);
      }
    }

    for (let i = from; i <= to; i++) {
      active = current === i;
      rst.push(<PagerItem key={key++} text={i + 1} active={active} skipTo={this.skipTo} page={i}/>);
    }

    if (to < total - 1) {
      active = current === total - 1;
      if (to < total - 2) {
        rst.push(<PagerItem key={key++} text="..." disabled={true}/>);
      }
      rst.push(<PagerItem key={key++} text={total} skipTo={this.skipTo} page={total - 1}/>);
    }
    return rst;
  }

  public skipTo(page) {
    const handler = this.props.onSkipTo;
    if (handler) {
      handler(page);
    }
  }

  public render() {
    const self = this;
    const first = self._getFirstItem();
    const last = self._getLastItem();
    const items = self._getItems();


    return (
        <div className = {css.wrapper}>
            <ul className={css.pager}>
                {first}
                {items}
                {last}
            </ul>
        </div>
    );
  }
}

