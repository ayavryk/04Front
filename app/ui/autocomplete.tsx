import * as React from 'react';
import {fGet} from '../lib/fetch';
const css = require('./css/ui.css');


export default class Autocomplete extends React.Component < any, any > {

    public sizer  = null;
    public input  = null;
    public results  = null;

    public data = [];
    public type = 'Array';

    constructor( props, context ) {
            super( props, context );
            this.sizer = null;
            this.input = null;
            // данные из массива или из строки ajax-запроса
            if (!this.props.src) {
                console.log('NOT FOUND SRC FOR AUTOSUGGEST');
            }   else {
                 if (Array.isArray(this.props.src.isArray)) {
                    this.data = this.props.src;
                 } else {
                     this.type = 'AJAX';
                 }
            }
            this.state = {
                resultMaxStiring: 0,
                results: [],
                visible: false,
                current: 2
            };
        }

    private search( value ) {
       return this.data.filter( item  =>  ( new RegExp(value, 'i') ).test( item ));
    }

    private getResult(deafultValue?) {
        const value = deafultValue || this.props.value;
        const results = this.search(value);
        let max = '';
        this.data.map(item => {if (item.length > max.length) {max = item; }});
        this.setState({resultLargeStiring: max});

        this.setState({results});
        this.changeValue(value);

        this.results.style.width = getComputedStyle(this.input, null).getPropertyValue('width');

        this.setState({visible: results.length});
    }

    private ajaxDataUpdate(data) {
        if (data.res) {
            this.data = data.res;
            this.getResult();
        }
    }


    private onChange(e) {
        const value = e.target.value;
        this.setState({visible: false});
        if (this.type === 'AJAX') {
            this.changeValue(value);
            if (value.length > 1) {
                fGet(this.props.src + value, {success: this.ajaxDataUpdate.bind(this)});
            }
        } else {
            this.getResult(value);
        }
    }

    public itemClick(item) {
        this.setState({
            visible: false}
        );
        this.changeValue(this.state.results[item]);
    }

    public onKeyUp(e) {

        const keyCode = e.keyCode || e.which;
        let current = this.state.current;
        if (!this.state.results.length) {
            return;
        }

        if (this.state.visible) {
            this.setState({current: 0, visible: true});
        }

        switch ( keyCode ) {
            case 38: // Up
                current = current - 1;
                break;
            case 40: // Down
                current = current + 1;
                break;
                case 13: // Enter
                if (current >= 0) {
                    this.itemClick(current);
                    return;
                };
                break;
            default: return;
        }

        current = current < 0 ? this.state.results.length - 1 : current;
        current = current > this.state.results.length - 1 ? 0 : current;

        this.setState({current, visible: true});
        console.log(current);
    }

    public onBlur() {
        // не отрабатывается клик по списку, если его спрятать сразу по blur :(  
        setTimeout(() => {
           this.setState({visible: false});
        }, 500);
    }

    public changeValue(value) {
        this.props.onChange({field: this.props.name, value});
    }


    public itemList() {
        const current = this.state.current;
        return this.state.results.map((item, key) => {
                const className = css.autocomplete_item  + ' ' + (current === key ? css.autocomplete_select : '');
                return (
                    <div className={className} onClick={() => this.itemClick(key)} key={key}>{item}</div>
                );
            });
    }

    public render() {

        const resultStyle = this.state.visible ? {display: 'block'} : {display: 'none'};
        const items = this.itemList();
        const style = this.props.width ? {width: this.props.width} : {};
        return (
            <div className={css.autocomplete}>
                <input
                    className = {css.input}
                    style = {style}
                    type="text"
                    value={this.props.value}
                    onBlur={this.onBlur.bind(this)}
                    onChange={this.onChange.bind(this)}
                    onKeyUp={this.onKeyUp.bind(this)}
                    placeholder={this.props.placeholder}
                    ref={input => { this.input = input; }}
                />
                <div className={css.autocomplete_size}  ref={e => { this.sizer = e; }}>
                        {this.state.resultLargeStiring}
                </div>
                <div className={css.autocomplete_result} >
                    <div
                        style={resultStyle}
                        className={css.autocomplete_result_wrapper}
                        ref={e => { this.results = e; }}
                    >
                        {items}
                    </div>
                </div>
            </div>
        );
    }

};

