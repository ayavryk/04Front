import * as React from 'react';

import { Button} from 'ui';
// const css = require('./css/button.css');


export default class FormButtons extends React.Component < any, any > {


    public render() {

        const cancel = this.props.cancel || (() => alert('cancel'));
        const save = this.props.save || (() => alert('save'));
        return (
            <div >
                <Button onClick = {() => cancel()}>Отменить</Button>
                <Button onClick = {() => save()}>Сохранить</Button >
            </div>
        );
    }
};
// className = {css.form_buttons}