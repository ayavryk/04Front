import * as React from 'react';
import { Button } from 'ui';
import CTableCommand from './cTableCommand';
import FilterButtons from './filterButtons';
import FilterControls from './filterControls';
import GroupButton from './groupButton';
const css = require('./filter.css');



export default class CTableControl extends React.Component < any, any > {

    private groupCommand = null;

    constructor(props) {
        super(props);
    }


    public groupClick(item) {
        this.groupCommand.openDialog(item);
    }

    public render() {
        return (
            <div>
                <div className={css.wrapper} >
                    <Button  onClick={() => this.props.createNewItem()} label="Добавить">
                        <i className="fa fa-plus" />
                    </Button>
                    <GroupButton {...this.props} groupClick={item => this.groupClick(item)} />
                    <div className={css.divider} />
                    <FilterControls {...this.props} />
                    <FilterButtons
                        clearFilter = {() => this.props.clearFilter()}
                        setFilter = {() => this.props.setFilter()}
                    />
                </div>
                <CTableCommand
                    actions = {this.props.actions}
                    ref={(e) => this.groupCommand = e}
                    config = {this.props.config}
                    data = {this.props.data}
                />
            </div>
        );
    }
};
