import React, { Component } from 'react'
import axios from 'axios';
import PostListViewCard from './PostListViewCard.component';
import Autosuggest from 'react-autosuggest';
import { Link } from 'react-router-dom';
export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lastPostId: 0,
            errorMessage: null,
            postsLimit: 10,
            postsData: [],
            usersData: [],
            value: '',
            suggestions: []

        }
    }

    //Methods Related to the AutoSuggest Content
    onChange = (event, { newValue, method }) => {
        this.setState({
            value: newValue
        });
    };
    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: getSuggestions(value, this.state.usersData)
        });
    };
    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };
    //API handlers
    fetchUsers = async () => {
        var uri = "http://jsonplaceholder.typicode.com/users";
        var usersData = await axios(
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
        this.setState({ usersData: this.state.usersData.concat(usersData) });
        console.log(usersData);
    }
    fetchPosts = async () => {
        var uri = `http://jsonplaceholder.typicode.com/posts?_start=${this.state.lastPostId}&_limit=${this.state.postsLimit}`
        var postsData = await axios(
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
        //console.log(postsData)
        this.setState({ postsData: this.state.postsData.concat(postsData) })
        // console.log("updated states\n", this.state.postsData)
    }
    componentDidMount() {
        this.fetchPosts();
        this.fetchUsers();
    }
    render() {
        const inputProps = {
            placeholder: 'Type a username',
            value: this.state.value,
            onChange: this.onChange
        };
        const { suggestions } = this.state;
        let postsLoader;
        if (this.state.postsData.length !== 0) {
            postsLoader = this.state.postsData.map((element, i) => (
                < PostListViewCard key={i} data={element} />
            ))
        }
        return (
            <div>
                <h2>Search a User</h2>
                <Autosuggest
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    getSuggestionValue={getSuggestionValue}
                    renderSuggestion={renderSuggestion}
                    inputProps={inputProps}
                />
                <h5>{this.state.errorMessage}</h5>
                <h3>Posts</h3>
                {postsLoader}
            </div >
        )
    }
}
const renderSuggestion = suggestion => (
    <div>
        <Link to={{ pathname: '/userView', state: [suggestion] }} >
            {suggestion.username}
            {console.log("From Rdenr" + suggestion)}
        </Link>
    </div>
);
const getSuggestionValue = suggestion => suggestion.username;

const getSuggestions = (value, usersData) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : usersData.filter(user =>
        user.username.toLowerCase().slice(0, inputLength) === inputValue
    );
};