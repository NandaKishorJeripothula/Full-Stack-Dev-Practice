import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import './custom.css';
import axios from 'axios'
export default class PostListViewCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: null,
            errorMessage: null,
            ...this.props.data,
        }
    }
    getUserName = async () => {
        var uri = `https://jsonplaceholder.typicode.com/users?id=${this.state.userId}`
        var userData = await axios(
            uri,
            {
                method: 'GET',
                "headers": { "accept": "text/html,application/xhtml+xml,application/xml" },
            }
        ).then((resp) => {
            if (resp.status === 200) {
                return (resp.data.length === 0) ? false : resp.data;
            } else {
                this.setState({ errorMessage: resp.statusMessage });
                return false;
            }
        }).catch((err) => {
            this.setState({ errorMessage: err });
            return false;
        });
        if (!userData) {
            //Only for false case::API ERROR
            this.setState({ errorMessage: "Unable to Fetch" });
        } else {
            this.setState({ userData: userData });
        }
    }

    componentDidMount() {
        this.getUserName();
    }
    render() {
        let userName;
        if (this.state.userData !== null) {
            userName = this.state.userData[0].username;
        }
        return (
            <Link to={{ pathname: '/postView', state: this.state }}>
                <div className="PostListViewCard">
                    <h4>{this.state.title}</h4>
                    <Link to={{ pathname: '/userView', state: this.state.userData }} componentClass='span'>
                        <h5 style={{ float: "right" }}>
                            {"- " + userName}
                        </h5 >
                    </Link>
                </div >
            </Link >
        )
    }
}
