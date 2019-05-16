import React from 'react';
import { Link } from 'react-router-dom';
import PostComments from './PostComments.component';
export default function Post(props) {
    const data = props.location.state;
    return (
        <div className="container">
            <h2>{data.title}</h2>
            <Link to={{ pathname: '/userView', state: data.userData }} >
                <h5 >{"- " + data.userData[0].username}</h5 >
            </Link>
            <p>{data.body}</p>
            <PostComments postId={data.id} />
        </div>
    )
}
