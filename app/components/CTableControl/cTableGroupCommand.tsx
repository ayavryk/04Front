import * as React from 'react';
import CTable from '../CTable/ctable';
import CForm from '../CForm/cform';
import Dialog from 'ui/dialog';
import { getRoute } from 'lib';
const css = require('./filter.css');
import { config as appConfig } from 'lib/appConfig';

export default class CTableGroupCommand extends React.Component < any, any > {

    private groupDialog = null;
    private confirmCommand = null;
    public state = { isForm: false, data: {}, form: {} };
    public form = null;
    public item = null;

    constructor(props) {
        super(props);

    }

    public groupCommand() {
        const route = getRoute();
        const ids = this.props.data.filter((e => !!e._selected)).map(item => item.id);
        let value = typeof(this.item.value) === 'undefined' ? '' : this.item.value;
        if (this.item.code === 'set' && this.state.data[this.item.field]) {
            value = this.state.data[this.item.field];
        }
        const data = {
            field: this.item.field || '',
            code: this.item.code,
            data: this.state.data,
            value,
            ids
        };
        const params = {
            controller: 'command',
            method: route.method,
            data: JSON.stringify(data)
        };
        this.props.actions.sendData(appConfig.server, params);
    }

    public confirm() {
        const item = this.item;
        this.item = item;
        this.confirmCommand.open({
            title: item.name + '?',
            text: item.confirm,
            buttons: [
                { name: item.name, onClick : this.groupCommand.bind(this) },
                { name: 'Отменить?', type: 'secondary' }
            ]
        });
    }

    public formAction(e) {
        const data = this.state.data;
        data[e.field] = e.value;
        this.setState({data});
    }

    public openDialog(item) {
        this.item = item;
        if (item.form) {
            this.setState({ form: item.form, isForm: true });
        } else {
            this.setState({ form: item.form, isForm: false });
        }
        this.groupDialog.open({
            title: item.name + '?',
            buttons: [
                { name: item.name, onClick : item.confirm ? this.confirm.bind(this) : this.groupCommand.bind(this) },
                { name: 'Отменить?', type: 'secondary' }
            ]
        });
    }

    public render() {
        const cFormProps = {
            className: css.groupForm,
            actions: { update: this.formAction.bind(this) },
            config: this.state.form,
            data: this.state.data
        };
        return (
            <div>
                <Dialog className= {css.groupDialog} ref={e => this.groupDialog = e}>
                    {this.state.isForm && <CForm {...cFormProps} />}
                    <CTable
                        short = {true}
                        config = {this.props.config}
                        data = {this.props.data}
                    />
                </Dialog>
                <Dialog ref={e => this.confirmCommand = e} />
            </div>
        );
    }
};
