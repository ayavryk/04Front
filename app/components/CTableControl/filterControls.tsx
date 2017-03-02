import * as React from 'react';

import defaultConfig from './filterDefaultConfig';
import { Select, AutoComplete } from 'ui';
import {getRoute} from 'lib';
const css = require('./filter.css');

export default class FilterControls extends React.Component < any, any > {


    public onChange(e) {
       this.props.onChange(e);
    }

    public render() {

        const path = getRoute();
        const func = ($item,key) => {
            const item = Object.assign({},$item);
            if (item.src && typeof(item.src) === 'string' ) {
                item.src = item.src.replace('{method}',path.method);
            }
            const props =  {
                value: this.props.filter[item.name] || '',
                onChange : this.onChange.bind(this)
            };
            return (
                <div key={key} className={css.cell + ' ' +  (item.flex ? css.full : '')}>
                    {item.type === 'select' && <Select  {...item} {...props}  />}
                    {item.type !== 'select' && <AutoComplete  {...item} {...props}  />}
                </div>
            );
        };
        return  (
                 <div className={css.ctrlWrapper}>
                    {defaultConfig.map(func,this)}
                </div>
                );
        }
}

