import * as axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        Accept: 'application/json',
    }
});

const SET_POST = 'POST/SET_POST';
const SET_IS_LOADING = 'POST/SET_IS_LOADING';
const SET_ERROR = 'POST/SET_ERROR';

const initialState = {
    post: {},
    isLoading: false
};

export const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_POST:
            return ({
                ...state,
                post: action.post
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
        default:
            return state;
    }
};

const setPost = post => ({ type: SET_POST, post });
const setIsLoading = isLoading => ({ type: SET_IS_LOADING, isLoading });
const setError = error => ({ type: SET_ERROR, error });

export const getUserPosts = userId => async dispatch => {
    dispatch(setIsLoading(true));
    try {
        const { data, status } = await instance.get(`/posts/by/${userId}`);

        if (status === 200) {
            dispatch(setPost(data));
            dispatch(setIsLoading(false));
        }
    } catch(e) {
        dispatch(setIsLoading(false));
        dispatch(setError(e.response.data.error));
    }
};