import * as React from 'react';
import { Button} from '../../ui';
const css = require('./filter.css');

export default class GroupButton extends React.Component < any, any > {
    public render() {
        const config = this.props.config;
        if (!config.group) {
            return <input type="hidden"/>;
        }
        const disabled = !this.props.data.some( elem => !!elem._selected);
        let click = item => {
            this.props.groupClick(item);
        };
        click = click.bind(this);
        const list = config.group.map((item, key) => {
            return (<div key = {key} onClick={() => click(item)}>
                {item.name}
            </div>);
        }, this);
        const className = css.selectedBtn + (disabled ? ' ' + css.disabled : '');
        return (
            <Button disabled={disabled} className={className} label="Операция с выделенными строками">
                <i className="fa fa-list-ul" />
                    <div className={css.menuContainer}>
                        <div className={css.menu}>{list}</div>
                    </div>
           </Button>
        );
    }
}
