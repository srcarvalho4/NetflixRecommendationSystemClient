import React from 'react';
import ActorCardComponent from "./ActorCardComponent";

export default class ActorListComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getActorsFollowed(this.props.match.params.username);
    }

    render() {
        return (
            <div className="row">
                {
                    this.props.actorsFollowed.map(movie =>
                        <ActorCardComponent
                            className="col-2"
                            getActorDetails = {this.props.getActorDetails}
                            movie={movie}
                            key={movie.id}/>)
                }
            </div>
        );
    }
}