import React, {Component, Fragment} from 'react';

import axios from 'axios';
import {Form, Input, Row, Col, Button, Table, Modal} from "antd";

/**
 * Colomns for the table to visualize book details
 * @type {*[]}
 */
const columns = [
    {
        title: 'BookID',
        dataIndex: 'bookid',
        key: 'bookid',
        render: text => <a>{text}</a>,
    },
    {
        title: 'Book Title',
        dataIndex: 'title',
        key: 'title',
        render: text => <a>{text}</a>,
    },
    {
        title: 'Author',
        dataIndex: 'author',
        key: 'author',
        render: text => <a>{text}</a>,
    }
];

export default class Book extends Component {
    constructor(props) {
        super(props);

        this.state = {
            bookid: "",
            bookstatus: "",
            title: "",
            author: "",
            spinner: false,
            books: [],
            utitle: "",
            uauthor: "",
            showModal: false,
            sbookid: "",
            stitle: "",
            sauthor: ""
        }
    };

    componentDidMount() {
        /**
         * All the details of books in the library will be fetched when the component loads
         */
        this.fetchBooks();
    };

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
     * Clear the state of title and author variables to default
     */
    clearInputForm = () => {
        this.setState({
            title: "",
            author: ''
        })
    };

    /**
     * Validates if title and author input fields are empty when user tries to insert a book to the library
     * @param title
     * @param author
     * @returns {boolean}
     */
    validateSave = (title, author) => {
        if (title !== "" && author !== "") {
            return true;
        } else {
            return false;
        }
    };

    /**
     * Sends a post request to the http://localhost:8080/library/book/ API endpoint with the details to insert a book.
     */
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

    /**
     * Triggers the insertBook() function when user clicks on the Add button if the input fields are validated
     */
    triggerInsert = () => {
        let title = this.state.title;
        let author = this.state.author;
        if (this.validateSave(title, author)) {
            this.insertBook();
        } else {
            alert('Please check inputs!!!');
        }
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
     * Sets the state of the variables books and spinner.
     * @param data
     * @param spinner
     */
    setBooksState = (data, spinner) => {
        this.setState({
            books: data,
            spinner: spinner
        });
    };

    /**
     * Sends a get request to the http://localhost:8080/library/book/getall API endpoint to Fetch book details from the
     * database.
     */
    fetchBooks() {
        this.spin();
        axios({
            method: 'get',
            url: 'book/getall'
        })
            .then((res) => {
                let {data} = res.data;
                console.log(res)
                if (data !== undefined && data.length > 0) {
                    this.setBooksState(data, false);
                } else {
                    alert("No Books Found!")
                    this.setBooksState(data = [], false);
                }
            })
            .catch((err) => {
                console.log(err);
            })
    };

    /**
     * Set the data on the popup model when a table row is clicked
     * @param data
     */
    setDataonModal = (data) => {
        this.setState({
            bookid: data.bookid,
            bookstatus: data.status,
            utitle: data.title,
            uauthor: data.author,
            showModal: true
        })
    };

    /**
     * Clears the states to defaults
     */
    clearUptadeForm = () => {
        this.setState({
            bookid: "",
            bookstatus: "",
            utitle: "",
            uauthor: "",
            showModal: false
        })
    };

    /**
     * Sends a put request to the http://localhost:8080/library/book/updatebook API endpoint to update book details in
     * the database.
     */
    updateBook = () => {
        axios({
            method: 'put',
            url: 'book/updatebook',
            data: {
                bookid: this.state.bookid,
                title: this.state.utitle,
                author: this.state.uauthor,
                status: this.state.bookstatus
            }
        })
            .then((res) => {
                if (res.status === 200) {
                    console.log(res.data.data)
                    this.clearUptadeForm();
                    alert(res.data.data);
                    this.fetchBooks();
                } else {
                    alert(res.data);
                }
            })
            .catch((err) => {
                alert(err)
            });
    };

    /**
     * Triggers the updateBook() function if the input fields are validated
     */
    triggerUpdate = () => {
        let title = this.state.utitle;
        let author = this.state.uauthor;
        if (this.validateSave(title, author)) {
            this.updateBook();
        } else {
            alert('Please check inputs!!!');
        }
    };

    /**
     * Sends a delete request to the http://localhost:8080/library/book/removebook API endpoint to remove a book.
     */
    removeBook = () => {
        axios({
            method: 'delete',
            url: 'book/removebook/' + this.state.bookid
        })
            .then((res) => {
                if (res.status === 200) {
                    this.clearUptadeForm();
                    alert(res.data.data);
                    this.fetchBooks();
                } else {
                    alert(res.data);
                }
            })
            .catch((err) => {
                alert(err)
            });
    };

    /**
     * Trigger searckBook() method if atleast one of bookid, title or author provided.
     */
    triggerSearch = () => {
        let bookid = this.state.sbookid;
        let title = this.state.stitle;
        let author = this.state.sauthor;

        if (bookid !== "" || title !== "" || author !== "") {
            this.searchBooks(bookid, title, author);
        } else {
            alert('Please provide bookid, title or author to search!!')
        }
    };

    /**
     * Sends a post request to the http://localhost:8080/library/book/searchbook API endpoint to retrieve specific
     * book details.
     * @param bookid
     * @param title
     * @param author
     */
    searchBooks = (bookid, title, author) => {
        this.spin();
        axios({
            method: 'post',
            url: 'book/searchbook',
            data: {
                bookid: bookid,
                title: title,
                author: author
            }
        })
            .then((res) => {
                let {data} = res.data;
                if (data !== undefined && data.length > 0) {
                    console.log(data)
                    this.setBooksState(data, false);
                } else {
                    alert("No Books Found!")
                    this.setBooksState(data = [], false);
                }
            })
            .catch((err) => {
                alert(err)
            });
    };

    /**
     * Clears the search for and resets the table with all the book details.
     */
    clearSearchForm = () => {
        this.setState({
            sbookid: "",
            stitle: "",
            sauthor: ""
        });
        this.fetchBooks();
    }

    render() {
        return <Fragment>
            <Row>
                <Col span={12}>
                    <Form>
                        <Form.Item label="Book Title">
                            <span>
                                <Input
                                    name="title"
                                    placeholder="Enter book title"
                                    value={this.state.title}
                                    onChange={this.handleChange}
                                />
                            </span>
                        </Form.Item>
                        <Form.Item label="Author">
                            <span>
                                <Input
                                    name="author"
                                    placeholder="Enter authors name"
                                    value={this.state.author}
                                    onChange={this.handleChange}
                                />
                            </span>
                        </Form.Item>
                    </Form>
                    <Button type="primary" onClick={this.triggerInsert}>Add</Button>
                </Col>
                <Col span={12}>
                    <Row>
                        <Col span={6}>
                            <Input
                                name="sbookid"
                                placeholder="Enter bookid"
                                value={this.state.sbookid}
                                onChange={this.handleChange}
                            />
                        </Col>
                        <Col span={6}>
                            <Input
                                name="stitle"
                                placeholder="Enter title"
                                value={this.state.stitle}
                                onChange={this.handleChange}
                            />
                        </Col>
                        <Col span={6}>
                            <Input
                                name="sauthor"
                                placeholder="Enter authors name"
                                value={this.state.sauthor}
                                onChange={this.handleChange}
                            />
                        </Col>
                        <Col span={6}>
                            <Button type="primary" onClick={this.triggerSearch}>Search</Button>
                            <Button type="primary" onClick={this.clearSearchForm}>Clear</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Table
                            columns={columns}
                            dataSource={this.state.books}
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
                title="Update Book"
                centered
                visible={this.state.showModal}
                footer={[
                    <Button key="submit" type="primary" onClick={this.triggerUpdate}>
                        Update
                    </Button>,
                    <Button key="submit" type="danger" onClick={this.removeBook}>
                        Remove
                    </Button>,
                    <Button key="back" onClick={this.clearUptadeForm}>
                        Cancel
                    </Button>
                ]}
            >
                <Form>
                    <Form.Item label="Book Title">
                            <span>
                                <Input
                                    name="utitle"
                                    placeholder="Enter book title"
                                    value={this.state.utitle}
                                    onChange={this.handleChange}
                                />
                            </span>
                    </Form.Item>
                    <Form.Item label="Author">
                            <span>
                                <Input
                                    name="uauthor"
                                    placeholder="Enter authors name"
                                    value={this.state.uauthor}
                                    onChange={this.handleChange}
                                />
                            </span>
                    </Form.Item>
                </Form>
            </Modal>
        </Fragment>
    }
}