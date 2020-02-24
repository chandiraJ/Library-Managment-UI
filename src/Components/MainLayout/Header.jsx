import React, {Component} from 'react';

import {Icon, Layout, Menu} from 'antd';
import {Link} from "react-router-dom";

import '../../CSS/nav_css.css';

const {Header} = Layout;


export default class extends React.Component {

    /**
     * Clears the sessionStorage
     */
    singOut = () => {
        sessionStorage.clear();
        window.location.reload();
    }

    render() {
        return <Header className="thestyle">
            <div className="logo"/>
            {/*<Link to={'/'} className="logo" style={{marginLeft: '20px'}}>*/}
            {/*    <img alt="Pearson" className="logo"*/}
            {/*         src={plogo}/>*/}
            {/*</Link>*/}
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['2']}
                style={{lineHeight: '60px'}}
                className="thestyle"
            >
                {/*<Menu.Item className="floatLeft" key="home"><Link to={'/home'}>Home</Link></Menu.Item>*/}
                {/*<Menu.Item className="floatLeft" key="other"><Link to={'/other'}>Documents</Link></Menu.Item>*/}
                <Menu.Item className="floatRight" key="4" onClick={this.singOut}>
                    <Icon type="user"/>
                    <span className="nav-text">Sign out</span>
                </Menu.Item>
                <Menu.Item className="floatRight">
                    {/*<Icon type="user" />*/}
                    <span className="nav-text">Hi, {sessionStorage.getItem("name")}</span>
                </Menu.Item>
            </Menu>
        </Header>
    }

}