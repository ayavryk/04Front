import * as React from 'react';
const connect = require('react-redux').connect;
import { bindActionCreators } from 'redux';
import { loadData, setData, filter, check, checkAll } from 'reducers/rTable';
import { loadConfig, setConfig } from 'reducers/rConfig';

import CTable from 'components/CTable/ctable';
import Pager from 'components/Pager/pager';
import CTableControl from 'components/CTableControl/cTableControl';
import configLoader from '../ConfigLoader/configLoader';
import {getRoute} from 'lib';
import Loading from 'ui/loading';

declare var appConfig: any;

interface ITableConfig {
  table?: any;
}

interface ITablePops {
  filter: any;
  config: any;
  actions?: any;
  params?: any;
  data?: any;
  query: any;
  page: any;
}

class Table extends React.Component<ITablePops, any>  {


  private hash = '';
  private route = {hash:'',method:''};
  private query = {page:0}; // запрос из Storage на момент входа. Нужен для перехода по страница, если фильтр изменен

  public componentWillReceiveProps() {this.loadData();}
  public componentWillMount() {this.loadData();}

  private sendRequestData() {
    const queryStirng = localStorage.getItem(this.hash) || '{}';
    const query = Object.assign({query:queryStirng},this.route);
    this.props.actions.loadData(appConfig.server,query);
  }

  private loadData() {
    this.route = getRoute();
    if (this.hash === this.route.hash) {return;}
    this.hash = this.route.hash;
    this.query =  JSON.parse(localStorage.getItem(this.hash) || '{}');
    this.sendRequestData();
  }

  public setFilter() {
    this.query = Object.assign({}, this.props.data.filter, {page:0});
    localStorage.setItem(this.hash,JSON.stringify(this.query));
    this.sendRequestData();
  }

  public getPage(page) {
    this.query.page = page;
    localStorage.setItem(this.hash,JSON.stringify(this.query));
    this.sendRequestData();
  }

  public clearFilter() {
    localStorage.removeItem(this.hash);
    this.sendRequestData();
  }

  public render()  {
      if (!this.props.data.data) {
        return <Loading />;
      }

      return (
          <div className="editWrapper">
              <CTableControl
                actions = {this.props.actions}
                config = {this.props.config}
                data = {this.props.data.data}
                filter={this.props.data.filter}
                onChange = {(e) => this.props.actions.filter(e)}
                setFilter = {() => this.setFilter()}
                clearFilter = {() => this.clearFilter()}
              />
              <CTable
                config = {this.props.config}
                data = {this.props.data.data}
                actions = {this.props.actions}
              />
              <Pager onSkipTo = {(e) => this.getPage(e)} {...this.props.data.page}  />
          </div>
      );
  };
}

function mapStateToProps(state) {
  return {
      data:state.table,
      config:state.config,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({loadConfig, setConfig, loadData, setData, filter, check, checkAll}, dispatch)
  };
}

export default (connect(mapStateToProps, mapDispatchToProps)(configLoader(Table)));
