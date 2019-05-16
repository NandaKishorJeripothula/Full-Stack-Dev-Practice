import React, { Component } from 'react'
import axios from 'axios';
import PostListViewCard from './PostListViewCard.component';
import SearchUser from './SearchUser.component';
export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lastPostId: 0,
            errorMessage: null,
            postsLimit: 10,
            postsData: [],
        }
    }
    //API handlers
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
    }

    render() {
        let postsLoader;
        if (this.state.postsData.length !== 0) {
            postsLoader = this.state.postsData.map((element, i) => (
                < PostListViewCard key={i} data={element} />
            ))
        }
        return (
            <div>
                <SearchUser />
                <h5>{this.state.errorMessage}</h5>
                <h3>Posts</h3>
                {postsLoader}
            </div >
        )
    }
}