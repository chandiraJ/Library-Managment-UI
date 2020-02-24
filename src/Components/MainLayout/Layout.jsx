import React, {Component} from 'react';
import {Route, Switch} from "react-router-dom";

import Book from '../Book/Book';
import Header from './Header';
import IssueBook from '../IssueBook/IssueBook';
import Member from '../Member/Member';
import Sider from './Sider';
import User from '../User/User';
import {Layout} from "antd";

const usertype =  sessionStorage.getItem('membertype');



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
                        <Route path="/issue" component={IssueBook}/>
                        <Route path="/user" component={User}/>
                    </Switch>

                </Content>

            </div>
        </div>
    }
}