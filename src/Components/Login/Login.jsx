import React, {Component} from "react";

import '../../CSS/login.css';

import axios from "axios";
import {Button, Form, Input} from "antd";

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        }
    };

    handleChange = e => {
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        );
    };

    insertBook = () => {
        axios({
            method: 'post',
            url: 'book/',
            data: {
                title: this.state.title,
                author: this.state.author
            }
        })
            .then((res) => {
                if (res.status === 200) {
                    this.clearInputForm();
                    alert(res.data.message);
                    this.fetchBooks();
                } else {
                    alert(res.data);
                }
            })
            .catch((err) => {
                alert(err)
            });
    };

    login = () => {
        axios({
            method: 'post',
            url: 'login/',
            data: {
                username: this.state.username,
                password: this.state.password
            }
        })
            .then((res) => {
                console.log(res.data)
                console.log(res.data.member.username);
                if (res.data.member.username !== undefined) {
                    console.log('inside session seting')
                    sessionStorage.setItem('username', res.data.member.username);
                    sessionStorage.setItem('name', res.data.member.name);
                    sessionStorage.setItem('membertype', res.data.member.membertype);
                    sessionStorage.setItem('login_status', 'true');
                    window.location.reload();
                } else {
                    sessionStorage.setItem("login_status", 'false');
                    alert('Login Failed!!!')
                }
            })
            .catch((err) => {
                sessionStorage.setItem("login_status", 'false');
                alert('Login Failed!!!')
            });
    }

    render() {
        return (
            <div className="login_bg">
                <Form>
                    <Form.Item label="User Name">
                            <span>
                                <Input
                                    className="input_fields"
                                    name="username"
                                    placeholder="Enter username"
                                    value={this.state.username}
                                    onChange={this.handleChange}
                                />
                            </span>
                    </Form.Item>
                    <Form.Item label="Password">
                            <span>
                                <Input
                                    className="input_fields"
                                    type="password"
                                    name="password"
                                    placeholder="Enter password"
                                    onChange={this.handleChange}
                                    // onKeyPress={this.checkEnter}
                                    value={this.state.password}
                                />
                            </span>
                    </Form.Item>
                </Form>
                <Button type="primary" onClick={this.login}>Login</Button>
            </div>
        );
    }
}