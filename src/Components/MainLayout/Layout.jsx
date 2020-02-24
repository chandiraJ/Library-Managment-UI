import React, {Component} from 'react';
import {Route, Switch} from "react-router-dom";

import Book from '../Book/Book';
import Header from './Header';
import Member from '../Member/Member';
import Sider from './Sider';
import {Layout} from "antd";



const {Content} = Layout;

export default class LayoutX extends Component {

    render() {
        const{history} = this.props;
        return <div style={{height:100}}>
            <Header/>
            <div className="sider-n-content">
                <Sider history={history}/>
                <Content style={{width: '50%', padding: '10px', backgroundColor: '#fff' }}>

                    <Switch>
                        <Route path="/books" component={Book}/>
                        <Route path="/member" component={Member}/>
                        {/*<Route path="/users" component={Users}/>*/}
                    </Switch>
                </Content>

            </div>
        </div>
    }
}