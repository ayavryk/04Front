import * as React from 'react';
import CTable from '../CTable/ctable';
import Dialog from 'ui/dialog';
import { getRoute } from 'lib';
declare var appConfig: any;

export default class CTableCommand extends React.Component < any, any > {

    private confirmCommand = null;
 
    public form = null;
    public item = null;
 

    constructor(props) {
        super(props);
    }

    public send(item, field) {
        const route = getRoute();
        const ids = [item.id];
        const data = {
            field: field.field || '',
            code: field.command,
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
                { name: item.name, onClick : this.send.bind(this) },
                { name: 'Отменить?', type: 'secondary' }
            ]
        });
    }

    public formAction(e) {
        const data = this.state.data;
        data[e.field] = e.value;
        this.setState({data});
    }

    public singleCommand(item, field) {
        const ok = () => this.send(item, field);
        if (field.confirm) {
            this.confirmCommand.open({
                title: field.title + '?',
                text: '#' + item.id + ': ' + item.name,
                buttons: [
                    { name: field.title, onClick : ok },
                    { name: 'Отменить?', type: 'secondary' }
                ]
            });
            return;
        }   else {
            ok();
        }
    }

    public render() {
        return (
            <div>
                <CTable
                    {...this.props}
                    singleCommand = {this.singleCommand.bind(this)}
                />
                <Dialog ref={e => this.confirmCommand = e} />
            </div>
        );
    }
};
