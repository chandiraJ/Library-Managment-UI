import React, {Component} from 'react';
import {Route, Switch} from "react-router";

import Header from './Header';
import Sider from './Sider';
import {Layout} from "antd";

const {Content} = Layout;

export default class LayoutX extends Component {
    render() {
        return <div>
            <Header/>
            <div className={'sider-n-content'}>
                <Sider/>
                <Content style={{width: '50%', minHeight: '700pt', padding: '10px', backgroundColor: '#fff'}}>

                    <Switch>
                        {/*<Route exact={true} path="/" component={Home}/>*/}
                        {/*<Route path="/other" component={Documents}/>*/}
                        {/*<Route path="/users" component={Users}/>*/}
                    </Switch>
                </Content>

            </div>
        </div>
    }
}