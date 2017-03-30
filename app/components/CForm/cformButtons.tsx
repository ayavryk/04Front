import * as React from 'react';
import { browserHistory } from 'react-router';

import Button from 'ui/button';
import Dialog from 'ui/dialog';
const css = require('./cform.css');

export default class FormButtons extends React.Component < any, any > {

    private confirm;

    private cancel = () => {
        if (!this.props.isChanged) {
            browserHistory.goBack();
        }
        this.confirm.open({
            title: 'Подтверждение выхода',
            text: 'Вы внесли изменения в данные. Выйти без сохранения?',
            buttons: [
                { icon: 'cancel', name: 'Не сохранять', onClick: () => browserHistory.goBack() },
                { icon: 'default', name: 'Остаться' }
            ]
        });
    }


    private requireWarning() {
        this.confirm.open({
            title: 'Ошибка заполнения данных',
            text: 'Проверьте поля, обязательные к заполнению. Они выделены цветом',
            buttons: [
                { icon: 'default', name: 'OK' },
            ]
        });
    }


    private save = () => {
        if (!this.props.check()) {
            this.requireWarning();
            return;
        }
        this.confirm.open({
            title: 'Подтверждение выхода',
            text: 'Сохранить изменения?',
            buttons: [
                { icon: 'default', name: 'Сохранить', onClick: () => this.props.save() },
                { icon: 'refresh', name: 'Остаться' }
            ]
        });
    }

    public render() {
        const disabled = this.props.isChanged ? {} : { disabled: true };
        const cancelIcon = this.props.isChanged ? 'cancel' : 'refresh' ;
        return (
            <div className = {css.form_buttons}>
                <Button icon="default" {...disabled} className={css.buttons} onClick = {this.save}>Сохранить</Button >
                <Button icon={cancelIcon} className={css.buttons} onClick = {this.cancel}>Отменить</Button>
                <Dialog ref={e => this.confirm = e} />
            </div>
        );
    }
};
