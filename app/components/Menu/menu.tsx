import * as React from 'react';
import { hashHistory, Link } from 'react-router';
import Dialog from 'ui/dialog';

const css = require('./menu.css');

declare var appConfig: any;


export default class Menu extends React.Component<any, any> {

    public confirm = null;

    private jump(e, item) {

        if (!this.props.isChanged) {
            return;
        }

        const gogo = () => {
            hashHistory.push(item.route);
        };
        this.confirm.open({
            title: 'Подтверждение выхода',
            text: 'Вы внесли изменения в данные. Выйти без сохранения?',
            buttons: [
              { name: 'Не сохранять', onClick: gogo },
              { name: 'Остаться' }
            ]
        });
        e.preventDefault();
    }

    private menuItems() {
        const res = appConfig.menu.map(item => {
            const active = (item.route !== '' && location.hash.indexOf(item.route) >= 0) ? css.active : '';
            const className = active + ' ' + css.item + ' ';
            return (
              <Link
                onClick = {e => this.jump(e,item)}
                key={item.title}
                className={className}
                to={item.route}
              >{item.title}
              </Link>);
        }, this);
        return res;
    }



    public render() {
        return (
            <div>
              <div className={css.menu}>
                <div className="editWrapper">
                      {this.menuItems()}
                  </div>
              </div>
              <Dialog ref={e => this.confirm = e} />
          </div>
        );
    }
};
