import * as React from 'react';
import { browserHistory } from 'react-router';

import Button from 'ui/button';
import Dialog from 'ui/dialog';
const css = require('./cform.css');

export default class FormButtons extends React.Component < any, any > {

    private confirm;

    private cancel() {
        if (!this.props.isChanged) {
            browserHistory.goBack();
        }
        this.confirm.open({
            title: 'Подтверждение выхода',
            text: 'Вы внесли изменения в данные. Выйти без сохранения?',
            buttons: [
                { name: 'Не сохранять', onClick: () => browserHistory.goBack(), type: 'cancel' },
                { name: 'Остаться', type: 'ok' },
            ]
        });
    }

    private save() {
        if (!this.props.isChanged) {
            browserHistory.goBack();
        }
        this.confirm.open({
            title: 'Подтверждение выхода',
            text: 'Сохранить изменения?',
            buttons: [
                {name: 'Сохранить', onClick: () => this.props.save(), type: 'ok' },
                {name: 'Остаться', type: 'refresh' }
            ]
        });
    }

    public render() {
        return (
            <div className = {css.form_buttons}>
                <Button className={css.buttons} onClick = {() => this.cancel()}>Отменить</Button>
                <Button className={css.buttons} onClick = {() => this.save()}>Сохранить</Button >
                <Dialog ref={e => this.confirm = e} />
            </div>
        );
    }
};
