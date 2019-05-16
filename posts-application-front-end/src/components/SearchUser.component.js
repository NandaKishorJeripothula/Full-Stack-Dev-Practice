import React, { Component } from 'react'
import Autosuggest from 'react-autosuggest';
import { Link } from 'react-router-dom';
import axios from 'axios'
export default class SearchUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usersData: [],
            value: '',
            suggestions: []
        }
    }
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
    componentDidMount() {
        this.fetchUsers();
    }
    render() {
        const inputProps = {
            placeholder: 'Type a username',
            value: this.state.value,
            onChange: this.onChange
        };
        const { suggestions } = this.state;
        return (
            <div>
                <h4>Search a User</h4>
                <Autosuggest
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    getSuggestionValue={getSuggestionValue}
                    renderSuggestion={renderSuggestion}
                    inputProps={inputProps}
                />
            </div>
        )
    }
}
const getSuggestionValue = suggestion => suggestion.username;
const getSuggestions = (value, usersData) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    return inputLength === 0 ? [] : usersData.filter(user =>
        user.username.toLowerCase().slice(0, inputLength) === inputValue
    );
};
const renderSuggestion = suggestion => (
    <div>
        <Link to={{ pathname: '/userView', state: [suggestion] }} >
            {suggestion.username}
        </Link>
    </div>
);