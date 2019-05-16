import React, { Component } from 'react'
import axios from 'axios'
export default class PostComments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            commentsData: [],
            ...this.props.postId
        }
    }
    getCommets = async () => {
        var uri = `https://jsonplaceholder.typicode.com/posts/${this.props.postId}/comments`
        var commentsData = await axios(
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
        this.setState({ commentsData: this.state.commentsData.concat(commentsData) })
        console.log(commentsData);
    }
    componentDidMount() {
        // console.log("Commetns " + this.state + "Props" + this.props.postId);
        this.getCommets();
    }
    render() {
        let commentLoader;
        if (this.state.commentsData.length !== 0) {
            commentLoader = this.state.commentsData.map((element, i) => (
                <div className="Comments" key={i}>
                    <h5>{"Subject : " + element.name}</h5>
                    <p>{"Commented By : " + element.email}</p>
                    <p>{element.body}</p>
                </div>
            ))
        }
        return (
            <div>
                {this.state.errorMessage}
                <h4>Comments</h4>
                {commentLoader}
            </div>
        )
    }
}
