import * as React from 'react';
import { config as appConfig } from 'lib/appConfig';
import { hashHistory } from 'react-router';
export default class HomePage extends React.Component<any, void> {
    public componentDidMount(){
        hashHistory.push(appConfig.homePage);
    }
    public render() {
        return (
            <div/>
        );
    };
}

