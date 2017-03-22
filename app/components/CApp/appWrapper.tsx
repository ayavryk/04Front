import * as React from 'react';
import MainMenu from './mainMenu';
import Menu from './menu';
const css = require('./appWrapper.css');

export default class AppWrapper extends React.Component < any, any > {

    public state = {
        ext: false,
        additionPoint: null
    };

    public extMenuShow = () => this.setState({ ext: true });

    public extMenuHide = () => {
        if (this.state.ext) {
            this.setState({ ext: false });
        }
    };

    public choicePoint(item) {
        this.setState({
            ext: false,
            additionPoint: item
        });
    }

    public render()  {
        const extClassName = this.state.ext ? css.ext : '';
        return (
            <div className={css.app + ' ' + extClassName}>
                <div className={css.leftMenuColumn}>
                    <Menu choicePoint = {this.choicePoint.bind(this)} />
                </div>
                <div onClick={this.extMenuHide} className={css.appColumn}>
                    <MainMenu
                        extMemuShow={this.extMenuShow}
                        additionPoint={this.state.additionPoint}
                        isChanged = {this.props.isChanged}
                    />
                    {this.props.children}
                </div>

            </div>
        );
    }
}
