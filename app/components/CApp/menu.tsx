import * as React from 'react';
import { Link } from 'react-router';
const css = require('./menu.css');

declare var appConfig: any;

export default class MainMenu extends React.Component<any, any> {

    public confirm = null;

    private choicePoint(item) {
        this.props.choicePoint(item);
    }

    private menuItems() {
        const res = appConfig.menu.map(item => {
            if (item.head) {
                return <div className={css.head}><i>{item.head}</i></div>;
            }
            if (item.url) {
                return <a className={css.item} href={item.url} target="_blank"><i>{item.title}</i></a>;
            }
            if (item.route) {
                return (
                    <Link className={css.item} to={item.route}>
                        <i onClick={() => this.choicePoint(item)}>
                            {item.title}
                         </i>
                    </Link>
                );
            }
        }, this);
        return res;
    }

    public render() {
        return (
              <div className={css.menu}>
                      {this.menuItems()}
              </div>
        );
    }
};
