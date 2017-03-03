import * as React from 'react';
import { Select, AutoComplete, Button } from 'ui';
import defaultConfig from './filterDefaultConfig';
import FilterButtons from './filterButtons';
import FilterControls from './filterControls';
import CTable from 'components/CTable/ctable';
import Dialog from 'ui/dialog';
import GroupButton from './groupButton';
import {getRoute} from 'lib';
const css = require('./filter.css');



export default class Search extends React.Component < any, any > {

    private groupDialog = null;

    constructor(props) {
        super(props);
    }

    public groupClick(item) {

        this.groupDialog.open({
            title: 'Групповая операция',
            text: 'Вы внесли изменения в данные. Выйти без сохранения?',
            buttons:[
                {name:'Не сохранять'},
                {name:'Остаться'}
            ]
            });
    }


    public render() {
        return (
            <div>
                <div className={css.wrapper} >
                    <Button label="Добавить"><i className="fa fa-plus" /></Button>
                    <GroupButton {...this.props}  />
                    <div className={css.divider} />
                    <FilterControls {...this.props} />
                    <FilterButtons
                        clearFilter = {() => this.props.clearFilter()}
                        setFilter = {() => this.props.setFilter()}
                    />
                </div>
                <Dialog ref={(e) => this.groupDialog = e}>
                    <CTable
                        config={this.props.config.group}
                        actions={this.props.actions}
                        data={this.props.data}
                    />
                </Dialog>
            </div>
        );
    }
};
