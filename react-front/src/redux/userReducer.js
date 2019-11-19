import * as axios from "axios";
import { signoutUser } from "./authReducer";

const instance = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        Accept: 'application/json',
    }
});

const SET_PROFILE = 'USER/SET_PROFILE';
const SET_USERS = 'USER/SET_USERS';
const SET_IS_LOADING = 'USER/SET_IS_LOADING';
const SET_ERROR = 'USER/SET_ERROR';
const SET_IS_FOLLOWING = 'USER/SET_IS_FOLLOWING';

const initialState = {
    profile: {},
    users: [],
    isLoading: true,
    error: '',
    isFollowing: false
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PROFILE:
            return ({
                ...state,
                profile: action.profile
            });
        case SET_IS_LOADING:
            return ({
                ...state,
                isLoading: action.isLoading
            });
        case SET_ERROR:
            return ({
                ...state,
                error: action.error
            });
        case SET_USERS:
            return ({
                ...state,
                users: action.users
            });
        case SET_IS_FOLLOWING:
            return ({
                ...state,
                isFollowing: action.isFollowing
            });
        default:
            return state;
    }
};

const setProfile = (profile) => ({ type: SET_PROFILE, profile });
const setUsers = (users) => ({ type: SET_USERS, users });
const setIsLoading = (isLoading) => ({ type: SET_IS_LOADING, isLoading });
const setError = (error) => ({ type: SET_ERROR, error });
const setIsFollowing = isFollowing => ({ type: SET_IS_FOLLOWING, isFollowing });

const photoDataToImgUrl = photoData => {
    const base64Flag = `data:${photoData.contentType};base64,`;
    return base64Flag + new Buffer(photoData.data.data, 'binary').toString('base64');
};

const mapEncodingToImgUrl = arr => {
    return arr.map(item => {
        if (item.photo) {
            item.photo = photoDataToImgUrl(item.photo);
        }

        return item
    })
};

const userPhotoEncoding = user => {
    if (user.photo) {
        user.photo = photoDataToImgUrl(user.photo);
    }

    if (user.following) {
        user.following = mapEncodingToImgUrl(user.following);
    }

    if (user.followers) {
        user.followers = mapEncodingToImgUrl(user.followers);
    }

    return user;
};

export const getUser = userId => async dispatch => {
    dispatch(setIsLoading(true));
    try {
        const { data, status } = await instance.get(`/users/${userId}`);

        if (status === 200) {
            const user = userPhotoEncoding(data);

            // set isFollow to current user
            const isFollow = checkFollow(user.followers);
            dispatch(setIsFollowing(isFollow));

            dispatch(setProfile(user));
            dispatch(setIsLoading(false));
        }
    } catch(e) {
        dispatch(setIsLoading(false));
        dispatch(setError(e.response.data.error));
    }
};

export const deleteUser = userId => async dispatch => {
    dispatch(setIsLoading(true));
    dispatch(signoutUser());
    try {
        const { status } = await instance.delete(`/users/${userId}`);

        if (status === 410) {
            dispatch(setIsLoading(false));
        }
    } catch(e) {
        dispatch(setIsLoading(false));
        dispatch(setError(e.response.data.error));
    }
};

export const getUsers = () => async dispatch => {
    dispatch(setIsLoading(true));

    try {
        const { data, status } = await instance.get('/users');

        if (status === 200) {
            const users = data.map(user => userPhotoEncoding(user));

            dispatch(setUsers(users));
            dispatch(setIsLoading(false));
        }
    } catch(e) {
        dispatch(setIsLoading(false));
        dispatch(setError(e.response.data.error));
    }
};

export const updateUser = ({ userId, ...body }) => async dispatch => {
    dispatch(setIsLoading(true));
    try {
        const formData = createFormData(body);

        const { data, status } = await instance.put(`/users/${userId}`, formData);

        if (status === 200) {
            dispatch(setProfile(data));
            dispatch(setIsLoading(false));
        }
    } catch(e) {
        dispatch(setIsLoading(false));
        dispatch(setError(e.response.data.error));
    }
};

const createFormData = (body) => {
    const data = new FormData();

    Object.keys(body).forEach(key => {
        data.set(key, body[key]);
    });

    return data;
};

const checkFollow = followers => {
    const authProfile = JSON.parse(localStorage.getItem('authProfile'));
    return followers.some(follower => follower._id === authProfile._id);
};

export const followUser = (userId, followId) => async dispatch => {
    try {
        const { data, status } = await instance.put('/users/follow', { userId, followId });

        if (status === 200) {
            // set isFollow to current user
            const isFollow = checkFollow(data.followers);
            dispatch(setIsFollowing(isFollow));
        }
    } catch(e) {
        dispatch(setError(e.response.data.error));
    }
};

export const unfollowUser = (userId, unfollowId) => async dispatch => {
    try {
        const { data, status } = await instance.put('/users/unfollow', { userId, unfollowId });

        if (status === 200) {
            // set isFollow to current user
            const isFollow = checkFollow(data.followers);
            dispatch(setIsFollowing(isFollow));

        }
    } catch(e) {
        dispatch(setError(e.response.data.error));
    }
};