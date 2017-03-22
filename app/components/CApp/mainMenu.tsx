import * as React from 'react';
import { hashHistory, Link } from 'react-router';
import Dialog from 'ui/dialog';

const css = require('./mainMenu.css');

declare var appConfig: any;

export default class MainMenu extends React.Component<any, any> {

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
        const mainMenuPoints = appConfig.menu.filter(item => !!item.main);
        if (this.props.additionPoint) {
            mainMenuPoints.push(this.props.additionPoint);
        }
        const res = mainMenuPoints.map(item => {
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
                <div className="editWrapper" >
                        <span className={css.item} onClick={this.props.extMemuShow}>
                          <i className={'fa fa-bars ' + css.extIcons} aria-hidden="true"/>
                        </span>
                      {this.menuItems()}
                  </div>
              </div>
              <Dialog ref={e => this.confirm = e} />
          </div>
        );
    }
};
