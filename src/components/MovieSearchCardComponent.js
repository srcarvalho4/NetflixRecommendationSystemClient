import React from 'react';
import {Link} from "react-router-dom";

export default class MovieSearchCardComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="col-md-4">
                <div className="movie-card">
                    <img className="movie-card-image"
                         src={this.props.movie.posterUrl}
                         alt="Movie Poster."/>
                    <div className="button">
                        <Link to={`/movie/${this.props.movie.id}`}>
                            Movie details
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}