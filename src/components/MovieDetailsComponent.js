import React from 'react';
import {Link} from "react-router-dom";
import "../styles/movieCard.css";
import "../styles/movieDetails.css";

export default class MovieDetailsComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount = () =>
        this.props.getMovieDetails(this.props.match.params.movieId);

    render() {

        return(
            <div className="container">
                <h1 className="my-4">{this.props.movie.title}</h1>

                <div className="row">

                    <div className="col-md-6">
                        <img className="img-fluid"
                             src={this.props.movie.posterUrl}
                             alt="Movie Poster."/>
                    </div>

                    <div className="col-md-6">
                        <h3 className="my-3">Movie Description</h3>
                        <p>{this.props.movie.overview}</p>
                        <h3 className="my-3">Movie Details</h3>
                        <ul>
                            <li>Runtime: {this.props.movie.runtime}</li>
                            <li>Release Date: {this.props.movie.releaseDate}</li>
                            <li>Revenue: {this.props.movie.revenue}</li>
                            <li>Release status: {this.props.movie.releaseStatus}</li>
                        </ul>

                        <div className="row">
                            <div className="col-sm-12 text-center">
                                {
                                    this.props.localRole === "Fan" &&
                                    <button id="btnLike"
                                            className="btn btn-info btn-md center-block movie-details-btn"
                                            onClick={() => this.props.likeMovie(this.props.movie.id,
                                                this.props.localUsername)}>
                                        Like
                                    </button>
                                }
                                {
                                    this.props.localRole === "Critic" &&
                                    <button id="btnRecommend"
                                            className="btn btn-success btn-md movie-details-btn"
                                            onClick={() => this.props.recommendMovie(this.props.movie.id,
                                                this.props.localUsername)}>
                                        Recommend
                                    </button>
                                }
                                &nbsp;&nbsp;
                                {
                                    this.props.localRole === "Critic" &&
                                    <Link to={`/movie/review/${this.props.movie.id}`}>
                                        <button id="btnReview"
                                                className="btn btn-info btn-md movie-details-btn">
                                            Review
                                        </button>
                                    </Link>
                                }
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        );
    }

}