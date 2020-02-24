import React, {Component, Fragment} from 'react';

import axios from 'axios';
import {Form, Input, Row, Col, Button, Table, Modal} from "antd";

/**
 * Colomns for the table to visualize member details
 * @type {*[]}
 */
const columns = [
    {
        title: 'Username',
        dataIndex: 'username',
        key: 'username',
        render: text => <a>{text}</a>,
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: text => <a>{text}</a>,
    }
];

export default class Member extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            name: "",
            password: "",
            showModal: false,
            uusername: '',
            uname: '',
            upassword: ''
        }
    };

    componentDidMount() {
        this.fetchMembers();
    }

    /**
     * Sets the state of the variables title and author when input elements change
     * @param e
     */
    handleChange = e => {
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        );
    };

    /**
     * Validates if username, name and password input fields are empty when user tries to insert a member to the library
     * @param username
     * @param name
     * @param password
     * @returns {boolean}
     */
    validateSave = (username, name, password) => {
        if (username !== "" && name !== "" && password !== "") {
            return true;
        } else {
            return false;
        }
    };

    /**
     * Triggers the insertMember() function when user clicks on the Add button if the input fields are validated
     */
    triggerInsert = () => {
        let username = this.state.username;
        let name = this.state.name;
        let password = this.state.password;

        if (this.validateSave(username, name, password)) {
            this.insertMember();
        } else {
            alert('Please fill all the details!!')
        }
    };

    /**
     * Clear the state of input form variables
     */
    clearInputForm = () => {
        this.setState({
            username: "",
            name: '',
            password: '',
            members: [],
            spinner: false
        })
    };

    /**
     * Triggers the spinner on the table
     */
    spin = () => {
        this.setState({
            spinner: true
        })
    };

    /**
     * Sends a post request to the http://localhost:8080/library/member/ API endpoint with the details to insert a
     * member.
     */
    insertMember = () => {
        axios({
            method: 'post',
            url: 'member/',
            data: {
                username: this.state.username,
                name: this.state.name,
                password: this.state.password
            }
        })
            .then((res) => {
                if (res.status === 200) {
                    this.clearInputForm();
                    alert(res.data.message);
                    this.fetchMembers();
                } else {
                    alert(res.data);
                }
            })
            .catch((err) => {
                alert(err)
            });
    };

    /**
     * Sets the state of the variables members and spinner.
     * @param data
     * @param spinner
     */
    setMemberState = (data, spinner) => {
        this.setState({
            members: data,
            spinner: spinner
        });
    };

    /**
     * Sends a get request to the http://localhost:8080/library/member/getall API endpoint to Fetch member details from
     * the database.
     */
    fetchMembers() {
        this.spin();
        axios({
            method: 'get',
            url: 'member/getall'
        })
            .then((res) => {
                let {data} = res.data;
                // console.log(res.data.data)
                if (data !== undefined && data.length > 0) {
                    this.setMemberState(data, false);
                } else {
                    alert("No Members Found!")
                    this.setMemberState(data = [], false);
                }
            })
            .catch((err) => {
                console.log(err);
            })
    };

    /**
     * Clear the state of update form variables
     */
    clearUptadeForm = () => {
        this.setState({
            uusername: "",
            uname: "",
            upassword: '',
            showModal: false
        })
    };

    /**
     * Triggers the updateMember() function if validates
     */
    triggerUpdate = () => {
        let username = this.state.uusername;
        let name = this.state.uname;
        let password = this.state.upassword;
        if (this.validateSave(username, name, password)) {
            this.updateMember(username, name, password);
        } else {
            alert('Please fill all the details!!')
        }
    };

    /**
     * Sends a put request to the http://localhost:8080/library/member/updatemember API endpoint to update member
     * details in database
     * @param username
     * @param name
     * @param password
     */
    updateMember = (username, name, password) => {
        axios({
            method: 'put',
            url: 'member/updatemember',
            data: {
                username: username,
                name: name,
                password: password
            }
        })
            .then((res) => {
                if (res.status === 200) {
                    console.log(res.data.data)
                    this.clearUptadeForm();
                    alert(res.data.data);
                    this.fetchMembers();
                } else {
                    alert(res.data);
                }
            })
            .catch((err) => {
                alert(err)
            });
    };

    /**
     * Set the data on the popup model when a table row is clicked
     * @param data
     */
    setDataonModal = (data) => {
        this.setState({
            uusername: data.username,
            uname: data.name,
            upassword: data.password,
            showModal: true
        })
    };

    /**
     * Sends a delete request to the http://localhost:8080/library/member/removemember API endpoint to remove a member.
     */
    removeMember = () => {
        axios({
            method: 'delete',
            url: 'member/removemember/' + this.state.uusername
        })
            .then((res) => {
                if (res.status === 200) {
                    this.clearUptadeForm();
                    alert(res.data.data);
                    this.fetchMembers();
                } else {
                    alert(res.data);
                }
            })
            .catch((err) => {
                alert(err)
            });
    };

    render() {
        return <Fragment>
            <Row>
                <Col span={12}>
                    <Form>
                        <Form.Item label="User Name">
                            <span>
                                <Input
                                    name="username"
                                    placeholder="Enter username"
                                    value={this.state.username}
                                    onChange={this.handleChange}
                                />
                            </span>
                        </Form.Item>
                        <Form.Item label="Member Name">
                            <span>
                                <Input
                                    name="name"
                                    placeholder="Enter member name"
                                    value={this.state.name}
                                    onChange={this.handleChange}
                                />
                            </span>
                        </Form.Item>
                        <Form.Item label="Password">
                            <span>
                                <Input
                                    name="password"
                                    placeholder="Enter member password"
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                />
                            </span>
                        </Form.Item>
                    </Form>
                    <Button type="primary" onClick={this.triggerInsert}>Add</Button>
                </Col>
                <Col span={12}>
                    <Row>
                        <Table
                            columns={columns}
                            dataSource={this.state.members}
                            loading={this.state.spinner}
                            size="small"
                            onRowClick={(data) => {
                                this.setDataonModal(data);
                            }}
                        />
                    </Row>
                </Col>
            </Row>
            <Modal
                title="Update Member"
                centered
                visible={this.state.showModal}
                footer={[
                    <Button key="submit" type="primary" onClick={this.triggerUpdate}>
                        Update
                    </Button>,
                    <Button key="submit" type="danger" onClick={this.removeMember}>
                        Remove
                    </Button>,
                    <Button key="back" onClick={this.clearUptadeForm}>
                        Cancel
                    </Button>
                ]}
            >
                <Form>
                    <Form.Item label="User Name">
                            <span>
                                <Input
                                    name="uusername"
                                    placeholder="Enter username"
                                    value={this.state.uusername}
                                    onChange={this.handleChange}
                                    disabled={true}
                                />
                            </span>
                    </Form.Item>
                    <Form.Item label="Member Name">
                            <span>
                                <Input
                                    name="uname"
                                    placeholder="Enter member name"
                                    value={this.state.uname}
                                    onChange={this.handleChange}
                                />
                            </span>
                    </Form.Item>
                    <Form.Item label="Password">
                            <span>
                                <Input
                                    name="upassword"
                                    placeholder="Enter member password"
                                    value={this.state.upassword}
                                    onChange={this.handleChange}
                                />
                            </span>
                    </Form.Item>
                </Form>
            </Modal>
        </Fragment>
    }
}