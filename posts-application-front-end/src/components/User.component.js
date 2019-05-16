import React from 'react'

export default function User(props) {
    var userdata = props.location.state[0];

    return (
        <div>
            <h2>{"Name : " + userdata.name}</h2>
            <h3>{"Username : " + userdata.username}</h3>
            <h3>{"Company : " + userdata.company.name}</h3>
            <h3>{"Phone : " + userdata.phone}</h3>
            <h3>{"Email : " + userdata.email}</h3>
            <h3>{"Website : " + userdata.website}</h3>

        </div>
    )
}
