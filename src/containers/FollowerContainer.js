import {connect} from 'react-redux';
import FollowerComponent from "../components/FollowerComponent";
import * as actions from "../actions";

const stateToPropertyMapper = state => ({
    followers: state.UserReducer.followers,
});

export const dispatcherToPropsMapper = dispatch => ({
    getFollowers: username => actions.getFollowers(dispatch, username),
});

const FollowerContainer = connect(stateToPropertyMapper,dispatcherToPropsMapper)(FollowerComponent);

export default FollowerContainer;