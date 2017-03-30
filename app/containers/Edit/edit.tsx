import * as React from 'react';
const connect = require('react-redux').connect;
import { bindActionCreators } from 'redux';

import CForm from 'components/CForm/cform';
import CFormButtons from 'components/CForm/cformButtons';
import { create, save, set as setData, clear, load as loadData, update } from 'reducers/rEdit';
import { loadConfig, setConfig } from 'reducers/rConfig';
import configLoader from '../ConfigLoader/configLoader';
import Loading from 'ui/loading';
import { getRoute } from '../../lib';
const css = require('ui/css/form.css');
const fcss = require('components/CForm/cform.css');

import { config as appConfig } from 'lib/appConfig';

// ITablePops, ITableState
interface IEditProps  {
    params: any;
    config: any;
    actions: any;
    data: any;
}

class Edit extends React.Component<IEditProps, void> {

    private hash = '';
    public componentWillReceiveProps() {
        this.loadData();
    }
    public componentWillMount() {
        this.loadData();
    }

    private loadData() {
        const route = getRoute();
        const params = Object.assign({}, route);
        if (this.hash === route.hash) {
            return;
        }
        this.hash = route.hash;
        if (route.id) {
            this.props.actions.loadData(appConfig.server, params);
        } else {
            this.props.actions.create();
        }
    }

    // проверка обязательных полей и фильтрация данных
    public checkData(){
        const config = this.props.config.config;
        const data = this.props.data.data;
        const result = {};
        let allRight = true;
        config.forEach(line => {
            line.forEach(cell => {
                if (data[cell.field] !== undefined) {
                    result[cell.field] = data[cell.field];
                    if (cell.required && !data[cell.field]) {
                        allRight = false;
                    }
                } else {
                    console.log('not found data for field=' + cell.field);
                }
            });
        });
        return (allRight ? result : null);
    }


    public save = () => {
        const route = getRoute();
        route.controller = 'save';
        this.props.actions.save(
            appConfig.server,
            route,
            this.props.data.data
        );
    }

    public render() {
        if (!this.props.data || !this.props.data.data) {
            return <Loading />;
        }
        const buttons = (
            <CFormButtons
                save = {this.save}
                check = {this.checkData.bind(this)}
                isChanged={this.props.data.isChanged}
            />
        );
        return (
           <div className="editWrapper">
                {buttons}
                <div className={css.grid + ' ' + fcss.cform}>
                    <CForm
                        actions = {this.props.actions}
                        config={this.props.config.config}
                        data = {this.props.data.data}
                    />
                </div>
                 {buttons}
            </div>
        );
    };
}

function mapStateToProps(state) {
    return {
        data: state.edit,
        config: state.config,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ create, loadConfig, setConfig, save, clear, setData, loadData, update }, dispatch)
    };
}

export default (connect(mapStateToProps, mapDispatchToProps)(configLoader(Edit)));
