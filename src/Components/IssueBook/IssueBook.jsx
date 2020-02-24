import React, {Component, Fragment} from 'react';

import axios from 'axios';
import {Form, Input, Row, Col, Button, Table, Modal, Select} from "antd";

const {Option} = Select;

/**
 * List of Book for the Booksdropdown
 * @type {Array}
 */
const books = [];
/**
 * List of Memebers for the Members Dropdown
 * @type {Array}
 */
const members = [];
/**
 * Colomn names for the table
 * @type {*[]}
 */
const columns = [
    {
        title: 'Book ID',
        dataIndex: 'bookid',
        key: 'bookid',
        render: text => <a>{text}</a>,
    },
    {
        title: 'Issued Data',
        dataIndex: 'issued_date',
        key: 'issued_date',
        render: text => <a>{text}</a>,
    },
    {
        title: 'Return Date',
        dataIndex: 'return_date',
        key: 'return_date',
        render: text => <a>{text}</a>,
    },
    {
        title: 'Issued Librarian',
        dataIndex: 'issued_librarian',
        key: 'issued_librarian',
        render: text => <a>{text}</a>,
    },
    {
        title: 'Borrowed Member',
        dataIndex: 'member_name',
        key: 'member_name',
        render: text => <a>{text}</a>,
    }
];

export default class IssueBook extends Component {
    constructor(props) {
        super(props);

        this.state = {
            bookid:'',
            member: '',
            issues: [],
            spinner: false
        }
    };

    /**
     * Will fetch books, memebers and all the book issuing records when the componeted leads
     */
    componentDidMount() {
        this.getBooks();
        this.getMembers();
        this.getAllIssueDet();
    }

    /**
     * Set book list  to the books Dropdown
     * @param bookdet
     */
    appedBooksDropDowm = (bookdet) => {
        books.length = 0;
        for (let i = 0; i < bookdet.length; i++) {
            if (bookdet[0] !== '') {
                books.push(<Option key={bookdet[i].bookid.toString()}>{bookdet[i].bookid}</Option>);
                console.log(bookdet[i].bookid)
            } else {
                books.length = 0;
            }

        }
    };

    /**
     * Sets members to the members Dropdown
     * @param memberdet
     */
    appedMembersDropDowm = (memberdet) => {
        members.length = 0;
        for (let i = 0; i < memberdet.length; i++) {
            if (memberdet[0] !== '') {
                members.push(<Option key={memberdet[i].name.toString()}>{memberdet[i].name}</Option>);
                console.log(memberdet[i].bookid)
            } else {
                members.length = 0;
            }

        }
    };

    /**
     * Retrieves member details
     */
    getMembers() {
        axios({
            method: 'get',
            url: 'member/getall'
        })
            .then((res) => {
                let {data} = res.data;
                // console.log(res.data.data)
                if (data !== undefined && data.length > 0) {
                    console.log('lsndl;nsdfknj')
                    this.appedMembersDropDowm(data);
                } else {
                    alert("No Members Found!")
                    // this.setBooksState(data = [], false);
                }
            })
            .catch((err) => {
                console.log(err);
            })
    };

    /**
     * Retrieves book details
     */
    getBooks = () => {
        axios({
            method: 'get',
            url: 'book/getall'
        })
            .then((res) => {
                let {data} = res.data;
                console.log(res.data)
                if (data !== undefined && data.length > 0) {
                    console.log('lsndl;nsdfknj')
                    this.appedBooksDropDowm(data);
                } else {
                    alert("No Books Found!")
                }
            })
            .catch((err) => {
                console.log(err);
            })
    };

    /**
     * Handle the book Dropdown Change
     * @param e
     */
    handleBookSelect = (e) => {
        this.setState({
            bookid: e
        })
    };

    /**
     * Handle the member Dropdown Change
     * @param e
     */
    handleMemberSelect = (e) => {
        this.setState({
            member: e
        })
    };

    /**
     * Clear the input form
     */
    clearForm = () => {
        this.setState({
            bookid: '',
            member:''
        })
    }

    /**
     * Save the recode when a book is issued
     */
    issue = () => {
        axios({
            method: 'post',
            url: 'issue/',
            data: {
                bookid: this.state.bookid,
                issued_librarian: sessionStorage.getItem('name'),
                member_name: this.state.member
            }
        })
            .then((res) => {
                if (res.status === 200) {
                    this.clearForm();
                    alert(res.data.message);
                    this.getAllIssueDet();
                } else {
                    alert(res.data);
                }
            })
            .catch((err) => {
                alert(err)
            });
    };

    /**
     * Set the spinner variable true while retreiving data
     */
    spin = () => {
        this.setState({
            spinner: true
        })
    };

    /**
     * Sets data to issues array and boolean value to spinner
     * @param data
     * @param spinner
     */
    setDetState = (data, spinner) => {
        this.setState({
            issues: data,
            spinner: spinner
        });
    };

    /**
     * Retrieve all the issued book details
     */
    getAllIssueDet = () => {
        this.spin();
        axios({
            method: 'get',
            url: 'issue/'
        })
            .then((res) => {
                let {data} = res.data;
                console.log(res)
                if (data !== undefined && data.length > 0) {
                    this.setDetState(data, false);
                } else {
                    alert("No Details Found!")
                    this.setDetState(data = [], false);
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    render() {
        return <Fragment>
            <Row>
                <Col span={12}>
                    <Form>
                        <Form.Item label="Book ID">
                            <span>
                                <Select
                                    showSearch
                                    // disabled={this.state.teamactive}
                                    name="team"
                                    value={this.state.bookid}
                                    style={{width: "200px"}}
                                    placeholder="Select a book"
                                    optionFilterProp="children"
                                    onChange={(e) => {
                                        this.handleBookSelect(e)
                                    }}
                                    // onFocus={this.onFocus}
                                    // onBlur={this.onBlur}
                                    // onSearch={this.onSearch}
                                    filterOption={(input, option) =>
                                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                {books}
                            </Select>
                            </span>
                        </Form.Item>
                        <Form.Item label="Memeber">
                            <Select
                                showSearch
                                // disabled={this.state.teamactive}
                                name="team"
                                value={this.state.member}
                                style={{width: "200px"}}
                                placeholder="Select a member"
                                optionFilterProp="children"
                                onChange={(e) => {
                                    this.handleMemberSelect(e)
                                }}
                                // onFocus={this.onFocus}
                                // onBlur={this.onBlur}
                                // onSearch={this.onSearch}
                                filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                {members}
                            </Select>
                        </Form.Item>
                    </Form>
                    <Button type="primary" onClick={this.issue}>Issue</Button>
                </Col>
                <Col span={12}>
                    <Table
                        columns={columns}
                        dataSource={this.state.issues}
                        loading={this.state.spinner}
                        size="small"
                    />
                </Col>
            </Row>
        </Fragment>
    }
}