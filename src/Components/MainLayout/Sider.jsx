import React, {Component} from 'react';

import {Icon, Layout, Menu} from 'antd';
import {Link} from "react-router-dom";

import '../../CSS/nav_css.css';

const {Sider} = Layout;


export default class extends Component {
    render() {
        return <Sider
            className="thestyle"
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={broken => {
                console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
                console.log(collapsed, type);
            }}
            theme="dark"
            style={{minHeight: '720pt'}}
        >
            <div className="logo"/>
            <Menu className="thestyle" theme="dark" mode="inline" defaultSelectedKeys={['home']}>
                <Menu.Item key="users">
                    <Icon type="user"/>
                    <span className="nav-text">Books</span>
                </Menu.Item>
                <Menu.Item key="other">
                    <Icon type="video-camera"/>
                    <span className="nav-text">Members</span>
                </Menu.Item>
                <Menu.Item key="other">
                    <Icon type="video-camera"/>
                    <span className="nav-text">Issue</span>
                </Menu.Item>
                <Menu.Item key="other">
                    <Icon type="video-camera"/>
                    <span className="nav-text">History</span>
                </Menu.Item>
            </Menu>
        </Sider>

    }

}