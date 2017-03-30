import * as React from 'react';
import { FormCell } from 'ui';
const css = require('ui/css/form.css');

export default class CForm extends React.Component < any, any > {


    constructor(props) {
        super(props);
    }

    public state = {
        activeLine: -1
    };

    public parseLine(line, lineIndex) {
        const update = e => this.props.actions.update(e);
        const values = this.props.data;
        const activate = () => { 
            this.setState({ activeLine: lineIndex });
        };
        const parse = (cell, index) => {
            const data = cell.data ? { data: cell.data } : {};
            const src = cell.src ? { src: cell.src } : {};
            const flex = cell.flex ? { flex: cell.flex } : {};
            const config = cell.config ? { config: cell.config } : {};
            return (
                    <FormCell
                        activate = {activate}
                        key = {index}
                        {...flex}
                        {...data}
                        {...src}
                        {...config}
                        label = {cell.label || '?Empty Label?'}
                        value = {values[cell.field] || ''}
                        name={cell.field}
                        type={cell.type || 'input'}
                        placeholder={cell.placeholder || ''}
                        onChange = {update}
                    />
            );
        };
        return line.map(parse);
    }

    public parse() {
        const config = this.props.config;
        if (!config.length) {
            return (<i>&nbsp;</i>);
        }
        const countLine = config.length + 2;
        const parse = (line, index) => {
            const zIndex = (this.state.activeLine === index) ? 1000 : (countLine - index);

            return (
                <div style={{ zIndex }} className={css.line} key={index}>
                    {this.parseLine(line,index)}
                </div>
            );
        };
        return(
            <div>
                {config.map(parse)}
            </div>

        );
    }

    public render() {
        const body = this.parse();
        const style = {zIndex: 1};
        return (
                <div style={style} className={this.props.className || ''} >
                    {body}
                </div>
        );
    }
};
