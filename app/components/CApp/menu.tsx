import * as React from 'react';
import { Link } from 'react-router';
const css = require('./menu.css');

import { config as appConfig } from 'lib/appConfig';

export default class Menu extends React.Component<any, any> {

    public confirm = null;

    private choicePoint(item) {
        if (!item.main) {
            this.props.choicePoint(item);
        }  else {
            this.props.choicePoint(null);
        }
    }

    private menuItems() {
        const res = appConfig.menu.map((item, index) => {
            if (item.head) {
                return <div key={index} className={css.head}><i>{item.head}</i></div>;
            }
            if (item.route) {
                return (
                    <Link key = {index} className={css.item} to={item.route}>
                        <i onClick={() => this.choicePoint(item)}>
                            {item.title}
                         </i>
                    </Link>
                );
            }  
            return (<div>no head, no route :(</div>);
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
