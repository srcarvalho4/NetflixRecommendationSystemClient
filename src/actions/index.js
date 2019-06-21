import * as constants from '../constants'
import history from '../History'
import MovieService from "../services/movieService";
import UserService from "../services/userService";
import ActorService from "../services/actorService";

const movieService = new MovieService();
const userService = new UserService();
const actorService = new ActorService();

let baseURL = "http://localhost:8080";

/**
 * LOGIN METHOD
 * @param dispatch
 * @param username
 * @param password
 */
export const doLogin = (dispatch, username, password) => {

    fetch(baseURL+ '/api/login', {
        method: 'post',
        credentials: 'include',
        body: JSON.stringify({
            'username': username,
            'password': password
        }),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.status === 200 ? response.json(): null)

        .then(user => {
        if (user === null) {

            dispatch({
                type: constants.ERROR,
                message: "Invalid Credentials"
            })
        } else {

            localStorage.setItem('username', user.username);
            localStorage.setItem('userRole', user.dtype);
            dispatch({type: constants.RESET_LOGIN_CREDENTIALS, user: user});
            dispatch({
                type: constants.SET,
                localUsername: user.username,
                localRole: user.dtype
            });
            history.push('/');
        }
    })
};

/**
 * LOGOUT METHOD
 * @param dispatch
 */
export const logOut = dispatch => {

    fetch(baseURL + '/api/logout', {
        credentials: 'include'
    }).then(() => {
        localStorage.removeItem('username');
        localStorage.removeItem('userRole');
        dispatch({
            type: constants.RESET_LOGIN_CREDENTIALS
        });
        dispatch({
            type: constants.RESET
        });
    })

};

/**
 * LOGIN HELPER METHODS
 * @param dispatch
 * @param username
 * @returns {*}
 */
export const changeUsername = (dispatch, username) => (
    dispatch({
        type: constants.CHANGE_LOGIN_USERNAME,
        username: username
    })
);

export const changePassword = (dispatch, password) => (
    dispatch({
        type: constants.CHANGE_LOGIN_PASSWORD,
        password: password
    })
);

/**
 * REGISTER METHOD
 */
export const doRegister = (dispatch, firstName, lastName, dob, email, username, password, password2, role, description) => {

    fetch(baseURL+ '/api/register/' + role.toLowerCase(), {
        method: 'post',
        body: JSON.stringify({
            'firstName': firstName,
            'lastName': lastName,
            'dob': dob,
            'email': email,
            'username': username,
            'password': password,
            'dtype': role,
            'description': description
        }),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.status === 201 ? response.json(): null)

        .then(user => {
        if (user === null) {
            dispatch({type: constants.ERROR, message: 'This username is already taken!'});
        } else {
            dispatch({type: constants.SUCCESS, message: 'Registration successful'});
            history.push('/login');
        }
    })
};

/**
 * REGISTER HELPER METHODS
 */

export const changeRegisterFirstName = (dispatch, firstName) => (
    dispatch({
        type: constants.CHANGE_REGISTER_FIRSTNAME,
        firstName: firstName
    })
);

export const changeRegisterLastName = (dispatch, lastName) => (
    dispatch({
        type: constants.CHANGE_REGISTER_LASTNAME,
        lastName: lastName
    })
);

export const changeRegisterDob = (dispatch, dob) => (
    dispatch({
        type: constants.CHANGE_REGISTER_DOB,
        dob: dob
    })
);

export const changeRegisterEmail = (dispatch, email) => (
    dispatch({
        type: constants.CHANGE_REGISTER_EMAIL,
        email: email
    })
);

export const changeRegisterUsername = (dispatch, username) => (
    dispatch({
        type: constants.CHANGE_REGISTER_USERNAME,
        username: username
    })
);

export const changeRegisterPassword = (dispatch, password) => (
    dispatch({
        type: constants.CHANGE_REGISTER_PASSWORD,
        password: password
    })
);

export const changeRegisterPassword2 = (dispatch, password2) => (
    dispatch({
        type: constants.CHANGE_REGISTER_PASSWORD2,
        password2: password2
    })
);

export const changeRegisterRole = (dispatch, role) => {
    dispatch({
        type: constants.CHANGE_REGISTER_ROLE,
        role: role
    })
};

export const changeRegisterDescription = (dispatch, description) => (
    dispatch({
        type: constants.CHANGE_REGISTER_DESCRIPTION,
        description: description
    })
);

/**
 * SEARCH MOVIE METHOD
 */

export const searchMoviesByKeyword = (dispatch, movieTitle) => {

    movieService.searchMovieByMovieName(movieTitle)
        .then(movies =>
            dispatch({
                type: constants.SEARCH_MOVIE,
                movies: movies
            })
        )
};

/**
 * HELPER METHOD FOR SEARCH MOVIE
 */
export const searchTextChanged = (dispatch, searchText) => {
    dispatch({
        type: constants.SEARCH_TEXT_CHANGED,
        searchText: searchText
    })
};

/**
 * MOVIE DETAILS METHOD
 */
export const getMovieDetails = (dispatch, movieId) => {
    movieService.getMovieDetails(movieId)
        .then(movie =>
            dispatch({
                type: constants.MOVIE_DETAILS,
                movie: movie
            }))
};

/**
 * UPCOMING MOVIES METHOD
 */
export const getUpcomingMovies = dispatch => {
    movieService.getUpcomingMovies()
        .then(upcomingMovies =>
            dispatch({
                type: constants.GET_UPCOMING_MOVIES,
                upcomingMovies: upcomingMovies
            }))
};

/**
 * NOW PLAYING MOVIES METHOD
 */
export const getNowPlayingMovies = dispatch => {
    movieService.getNowPlayingMovies()
        .then(nowPlayingMovies =>
            dispatch({
                type: constants.GET_NOW_PLAYING_MOVIES,
                nowPlayingMovies: nowPlayingMovies
            }))
};

/**
 * POPULAR MOVIES METHOD
 */
export const getPopularMovies = dispatch => {
    movieService.getPopularMovies()
        .then(popularMovies =>
            dispatch({
                type: constants.GET_POPULAR_MOVIES,
                popularMovies: popularMovies
            }))
};

/**
 * LIKE A MOVIE METHOD
 */
export const likeMovie = (dispatch, movieId, username) => {
    movieService.likeMovie(movieId, username)
        .then(() =>
            dispatch({
                type:constants.SET_LIKED_ALERT,
                message: "Liked the movie!"
            }))
};

/**
 * REVIEW A MOVIE METHOD
 */
export const reviewMovie = (dispatch, movieId, username) => {
    movieService.reviewMovie(movieId, username)
        .then(() =>
            dispatch({
                type:constants.SET_FOLLOWED_ALERT,
            })
        )
};

/**
 * RECOMMEND A MOVIE METHOD
 */
export const recommendMovie = (dispatch, movieId, username) => {
    movieService.recommendMovie(movieId, username)
        .then(() =>
            dispatch({
                type: constants.SET_RECOMMENDED_ALERT,
                message: "Recommended the movie!"
            }))
};

/**
 * SHOW REVIEW MODAL METHOD
 */
export const showReviewModal = dispatch =>
    dispatch({
       type:constants.SHOW_REVIEW_MODAL,
       showReviewModal: true
    });

/**
 * METHOD TO GET FOLLOWERS
 */
export const getFollowers = (dispatch, username) => {
    userService.getFollowers(username)
        .then(followers =>
            dispatch({
                type: constants.GET_FOLLOWERS,
                followers: followers
            })
        )
};

/**
 * METHOD TO GET FOLLOWING
 */
export const getFollowing = (dispatch, username) => {
    userService.getFollowing(username)
        .then(following =>
            dispatch({
                type: constants.GET_FOLLOWING,
                following: following
            })
        )
};

/**
 * METHOD TO GET ACTORS FOLLOWED
 */
export const getActorsFollowed = (dispatch, username) => {
    actorService.getActorsFollowed(username)
        .then(actors =>
            dispatch({
                type: constants.GET_ACTORS_FOLLOWED,
                actorsFollowed: actors
            }))
};

/**
 * METHOD TO GET MOVIES LIKED
 */
export const getMoviesLiked = (dispatch, username) => {
    movieService.getMoviesLiked(username)
        .then(movies =>
            dispatch({
                type: constants.GET_MOVIES_LIKED,
                moviesLiked: movies
            }))
};

export const searchActorsByKeyword = (dispatch, actorName) => {
    actorService.getActors(actorName)
        .then(actors =>
            dispatch({
                type: constants.SEARCH_ACTORS,
                actors: actors
            }))
};



