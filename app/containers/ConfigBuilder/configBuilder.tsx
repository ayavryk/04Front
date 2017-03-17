import * as React from 'react';
import { fGet } from 'lib';
import ConfigBuilderEdit from './configBuilderEdit';
import ConfigBuilderTable from './configBuilderTable';

const css = require('./configBuilder.css');

declare var appConfig: any;

export default class ConfigBuilder extends React.Component<any, any> {

    public state = {
        current: '',
        config: null
    };

    public componentWillMount() {
        fGet(appConfig.server + '?controller=bd&method=text', {
            success: this.setConfig,
            error: this.showError,
        });
    }

    public setConfig = data => {
        this.setState({ config: data });
    }

    public showError = () => {
        console.log('ERROR config load');
    }

    public selectTable = current => {
        this.setState({ current });
    }

    public renderTables() {
        const hash = [];
        for (const table in this.state.config) {
            if (table.indexOf('_rel') <= 0) {
                hash.push(table);
            }
        }
        return hash.map(item => {
            const current = item === this.state.current ? css.current : '';
            return (
                <div
                    className={css.tableName + ' ' + current}
                    onClick = {() => this.selectTable(item)}
                    key={item}
                >
                    {item}
                </div>);
        });
    }

    public render() {
        const tables = this.renderTables();
        return (
            <div className={css.wrapper + ' editWrapper'}>
                <div className={css.tables}>
                    {this.state.config && tables}
                </div>
                {this.state.current !== '' &&
                    <div className={css.forms}>
                        <div className={css.form}>
                            <ConfigBuilderTable
                                head = {this.state.current}
                                data={this.state.config[this.state.current]} 
                            />
                        </div>
                        <div className={css.form}>
                            <ConfigBuilderEdit
                                head = {this.state.current}
                                data={this.state.config[this.state.current]} 
                            />
                        </div>
                    </div>
                }
            </div>

        );
    };
}


;