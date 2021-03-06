import React, {Component} from 'react';

// import {Route, Switch, } from "react-router-dom";
import {Icon, Layout, Menu} from 'antd';
import {Link} from "react-router-dom";

import '../../CSS/nav_css.css';

const {Sider} = Layout;

const usertype =  sessionStorage.getItem('membertype');

// const usertype = 'admin';

export default class extends Component {

    handleClick = (e) => {
        this.props.history.replace(`/${e.key}`);
    };
    // componentDidMount() {
    //     this.props.history.replace(`/other`);
    // }
    render() {
        // const{history} = this.props;
        return <Sider
            className="thestyle sider"
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={broken => {
                console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
                console.log(collapsed, type);
            }}
            theme="dark"
            // style={{height: calc(100% - 100px);}}
        >
            <div className="logo"/>
            <Menu className="thestyle" theme="dark" mode="inline" defaultSelectedKeys={['book']}
                  onClick={this.handleClick}
            >
                {usertype === 'admin' && <Menu.Item key="books">
                    <Icon type="book"/>
                    <span className="nav-text">Books</span>
                </Menu.Item>
                }
                {usertype === 'admin' && <Menu.Item key="member">
                    <Icon type="user"/>
                    <span className="nav-text">Members</span>
                </Menu.Item>
                }
                {usertype === 'admin' && <Menu.Item key="issue">
                    <Icon type="video-camera"/>
                    <span className="nav-text">Issue</span>
                </Menu.Item>
                }
                {usertype === 'user' && <Menu.Item key="user">
                    <Icon type="video-camera"/>
                    <span className="nav-text">Borrowed Books</span>
                </Menu.Item>
                }


            </Menu>
        </Sider>

    }

}