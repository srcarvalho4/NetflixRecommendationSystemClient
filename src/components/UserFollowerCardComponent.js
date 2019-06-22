import React from 'react';
import {Link} from "react-router-dom";
import "../styles/userCard.css";

export default class UserFollowerCardComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="card text-center">
                <div className="card-body">
                    <h5 className="card-title">{this.props.user.firstName} {this.props.user.lastName}</h5>
                    <p className="card-text">Role: {this.props.user.dtype}</p>
                    <Link to={`/profile/${this.props.user.username}`} className="btn btn-primary">
                        See Profile
                    </Link>
                    &nbsp;
                    {
                        this.props.currentUsername === localStorage.getItem("username") &&
                        <button className="btn btn-danger"
                                onClick={() => this.props.removeUser(this.props.currentUsername,
                                    this.props.user.username)}>
                            Remove
                        </button>
                    }
                </div>
            </div>
        );
    }
}