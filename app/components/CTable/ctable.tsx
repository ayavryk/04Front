import * as React from 'react';
const css = require('./ctable.css');
import {Link} from 'react-router';
import {Check} from 'ui';

export default class CTable extends React.Component < any, any > {


    public group = true;
    public singleCommand;

    public constructor(params) {
        super(params);
        this.state = {
            checkedAll: 0
        };
    }

    public checkAll(e) {
        this.setState({ checkedAll: e.value });
        this.props.actions.checkAll(e.value);
    };

    public checked = e => this.props.actions.check(e);



    // метод для вывода полной таблицы или урезанной таблицы для групповых операциq (props.short === true)
    public getIems() {
        const config = this.props.config.config;
        if (!this.props.short) {
            return config;
        }
        // перечень полей которые необходимо спрятать в таблице групповых операций
        const hideInGroupRequest = {edited: 1, created: 1};
        const result = config.filter(item => {
            return (
                !(!!item.icons || !!hideInGroupRequest[item.field])
            );
        });
        return result;
    }

    public renderHead() {
        const styles = { id: '3em', created: '5em', edited: '5em'};
        const render = (item, index) => {
            const head: any = item.icons ? <i className={'fa ' + item.icons[0]} /> :
                item.header ? item.header : '??';
            const style = item.width ? { width: item.width } :
                item.field && styles[item.field] ? { width: styles[item.field] } : {};
            return (<th key={index} style={style}>{head}</th>);
        };
        const body = this.getIems().map(render, this);
        const check = <Check value={this.state.checkedAll} name="checkAll" onChange = {e => this.checkAll(e)}/>;
        const className = (this.props.data[0] && typeof(this.props.data[0].public) !== 'undefined') ?
                css.publicHead : '';
        return (<tr className={className}>
        {this.group && !this.props.short && <th className={css.iconCell}>{check}</th>}
        {body}
        </tr>);
    }

    public renderCell(item, field) {
        const id = item.id;
        const titleText = (field.title || '').replace('{id}', item.id);
        let title = titleText === '' ? {} : {title: titleText};
        let content;
        let className = 'ERROR123';
        if (field.command) {
            const index = field.icons.length === 1 ? 0 : item[field.field];
            if (field.icons && field.icons[index]) {
                className = 'fa ' + field.icons[index];
            }   else {
                console.log('ERROR in config icons for ' + field.field + '=' + (item[field.field] || '??'));
            }
            content = <i title={titleText} className={className} />;
        } else {
            let view = item[field.field] ? item[field.field] : '---';
            if (field.field === 'created' || field.field === 'edited') {
                const date = view.substr(0, 10).split('-');
                view = date[2] + '-' + date[1] + '-' + date[0].substr(2, 2);
                title = { title: item[field.field] };
            }
            content = (
            <span {... title}>
                {view}
            </span>
            );
        }
        const link = field.link || field.elink;
        return link ? <Link className={css.link} to={link.replace('{id}',id)}>{content}</Link> : content;
    }

    public renderLine(item, index) {
        const render = (item, index, field, key) => {
            if (!item.id) {
                console.log('ERR in table. not found ID for line ' + index);
                return;
            }
            const style = field.width ? { style: { width: field.width }} : {};
            const commands = (!field.command) ? {} :
            {
                className: css.iconCell,
                onClick: () => this.props.singleCommand(item, field)
            };
            return (
                <td  {...style} key={key} {...commands}>
                    <div className={css.cell}>{this.renderCell(item,field)}</div>
                </td>
            );
        };
        return this.getIems().map(render.bind(this, item, index));
    }

    public renderBody() {
        this.singleCommand = this.props.singleCommand;
        const render = (item, index) => {
            const value = this.props.data[index]._selected ? 1 : 0;
            const name = index.toString();
            const className = typeof(item.public) === 'undefined' ? '' : css['public' + item.public];
            const check = <td><Check value={value} name={name} onChange = {this.checked}/></td>;
            return (
            <tr className={className} key={index}>
                {this.group && !this.props.short && check}
                {this.renderLine(item,index)}
            </tr>);
        };
        let data = this.props.data;
        if (this.props.short) {
            data = data.filter(item => !!item._selected);
        }
        return data.map(render.bind(this));
    }





    public render() {
        console.log(this.props);
        return (
            <div className={css.wrapper}>
                <table className={css.table}>
                    <tbody>
                        {this.renderHead()}
                        {this.renderBody()}
                    </tbody>
                </table>
            </div>
        );
    }
};
