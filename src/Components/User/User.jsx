import React, {Component, Fragment} from 'react';

import axios from 'axios';
import {Form, Input, Row, Col, Button, Table, Modal} from "antd";

const username = sessionStorage.getItem('name');

const columns = [
    {
        title: 'Book ID',
        dataIndex: 'bookid',
        key: 'bookid',
        render: text => <a>{text}</a>,
    },
    {
        title: 'Borrowed Data',
        dataIndex: 'issued_date',
        key: 'issued_date',
        render: text => <a>{text}</a>,
    },
    {
        title: 'Return Date',
        dataIndex: 'return_date',
        key: 'return_date',
        render: text => <a>{text}</a>,
    }
];

export default class LayoutX extends Component {
    constructor(props) {
        super(props);

        this.state = {
            det: [],
            spinner: false
        }
    };
    componentDidMount() {
        this.fetchDet();
    }

    spin = () => {
        this.setState({
            spinner: true
        })
    };

    setDetState = (data, spinner) => {
        this.setState({
            det: data,
            spinner: spinner
        });
    };

    fetchDet = () => {
        this.spin();
        axios({
            method: 'get',
            url: 'issue/specific/' + sessionStorage.getItem('name')
        })
            .then((res) => {
                // let {data} = res.data;
                console.log(res.data.data)
                if (res.data.data !== undefined && res.data.data.length > 0) {
                    this.setDetState(res.data.data, false);
                } else {
                    alert("No Books Found!")
                    this.setDetState(res.data = [], false);
                }
            })
            .catch((err) => {
                console.log(err);
            })
    };


    render() {
        return <Fragment>
            <Table
                columns={columns}
                dataSource={this.state.det}
                loading={this.state.spinner}
                size="small"
            />
        </Fragment>
    }
}