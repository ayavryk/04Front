import * as React from 'react';
import { hashHistory, Link } from 'react-router';
import Dialog from 'ui/dialog';
import { config as appConfig } from 'lib/appConfig';

const css = require('./mainMenu.css');

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
              { icon: 'cancel', name: 'Не сохранять', onClick: gogo },
              { icon: 'default', name: 'Остаться' }
            ]
        });
        e.preventDefault();
    }

    private menuItems() {
        const mainMenuPoints = appConfig.menu.filter(item => !!item.main);
        if (this.props.additionPoint) {
            mainMenuPoints.push(this.props.additionPoint);
        }
        const res = mainMenuPoints.map((item, index) => {
            const active = (item.route !== '' && location.hash.indexOf(item.route) >= 0) ? css.active : '';
            const className = active + ' ' + css.item + ' ';
            return (
              <Link
                onClick = {e => this.jump(e,item)}
                key={index}
                className={className}
                to={item.route}
              >{item.title}
              </Link>);
        }, this);
        return res;
    }

    public render() {
        const lightColor = this.props.lightColor ? css.lightColor : '';
        return (
            <div>
              <div className={css.menu + ' ' + lightColor}>
                <div className="editWrapper">
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
