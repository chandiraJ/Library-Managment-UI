import React, {Component} from "react";

import '../../CSS/login.css';

import axios from "axios";
import {Button} from "antd";

export default class Login extends Component {

    login = () => {
        sessionStorage.setItem("username", 'Chandi95');
        sessionStorage.setItem("name", 'Chandira Jayasekara');
        sessionStorage.setItem("membertype", 'Admin');
        sessionStorage.setItem("loging_status", 'true');
        window.location.reload();
    }
    render() {
        return (
            <div className="login_bg">
                <Button type="primary" onClick={this.login}>Add</Button>
            </div>
        );
    }
}