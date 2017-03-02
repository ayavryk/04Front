import * as React from 'react';
import CTable from '../CTable/ctable';
import CForm from '../CForm/cform';
import Dialog from 'ui/dialog';
const css = require('./filter.css');



export default class CTableCommand extends React.Component < any, any > {

    private groupDialog = null;
    private confirmCommand = null;
    public state = {isForm:false,data:{},form:{}};
    public form = null;
    public item = null;

    constructor(props) {
        super(props);

    }

    public groupCommand() {
        const ids = this.props.data.filter((e => !!e._selected)).map((item) => item.id);
        const url = this.props.config.url.command;
        const data = Object.assign({},this.state,ids);
        this.props.actions.loadData(url,data);
    }

    public confirm() {
        const item = this.item;
        this.item = item;
        this.confirmCommand.open({
            title: item.name + '?',
            text: item.confirm,
            buttons:[
                {name:item.name,onClick : this.groupCommand.bind(this)},
                {name:'Отменить?', type:'secondary'}
            ]
            });
    }

    public formAction(e) {
        let data = this.state.data;
        data[e.field] = e.value;
        this.setState({data});
    }

    public openDialog (item) {
        this.item = item;
        if (item.form) {
            this.setState({form: item.form, isForm:true});
        }   else  {
            this.setState({form: item.form, isForm:false});
        }
        this.groupDialog.open({
            title: item.name + '?',
            buttons:[
                {name:item.name,onClick : item.confirm ? this.confirm.bind(this) : this.groupCommand.bind(this) },
                {name:'Отменить?', type:'secondary'}
            ]
            });
    }

    public render() {

        const cFormProps = {
            className:css.groupForm,
            actions:{update:this.formAction.bind(this)},
            config: this.state.form,
            data: this.state.data
        };
        return (
            <div>
                <Dialog className= {css.groupDialog} ref={(e) => this.groupDialog = e}>
                    {this.state.isForm && <CForm {...cFormProps} />}
                    <CTable
                        short = {true}
                        config = {this.props.config}
                        data = {this.props.data}
                    />
                </Dialog>
                <Dialog ref={(e) => this.confirmCommand = e} />
            </div>
        );
    }
};
