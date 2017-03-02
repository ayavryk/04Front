import * as React from 'react';
import { Button} from '../../ui';
const css = require('./filter.css');

export default class FilterButtons extends React.Component < any, any > {
    public render() {
        return (
            <div  className={css.cell} >
                <div className={css.btnWrapper}>
                    <div className={css.cell}>
                        <Button label="Очистить" onClick={() => this.props.clearFilter()}>
                            <i className="fa fa-repeat"/>
                        </Button>
                    </div>
                    <div>
                        <Button label="Поиск"  onClick={() => this.props.setFilter() }>
                            <i className="fa fa-search-plus" />
                        </Button>
                    </div>
                </div>
        </div>);
    }
}

