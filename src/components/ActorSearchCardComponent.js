import React from 'react';
import {Link} from "react-router-dom";

export default class ActorSearchCardComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="col-md-4">
                <div className="actor-card">
                    <img className="actor-card-image"
                         src={this.props.actor.profilePicture}
                         alt="Actor Image."/>
                    <div className="button">
                        <Link to={`/actor/${this.props.actor.actorId}`}>
                            {this.props.actor.actorName}
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}