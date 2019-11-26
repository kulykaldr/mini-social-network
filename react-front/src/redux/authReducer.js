import * as axios from "axios";
import { SubmissionError } from "redux-form";

const instance = axios.create({
    baseURL: 'http://localhost:8080'
});

const SET_AUTH_DATA = 'AUTH/SET_AUTH_DATA';
const SET_IS_LOADING = 'AUTH/SET_IS_LOADING';
const SET_MESSAGE = 'AUTH/SET_MESSAGE';
const SET_ERROR = 'AUTH/SET_ERROR';

const initialState = {
    jwt: null,
    authProfile: null,
    isAuth: false,
    isLoading: false,
    message: '',
    error: ''
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH_DATA:
            return ({
                ...state,
                jwt: action.token,
                authProfile: action.authProfile,
                isAuth: action.isAuth
            });
        case SET_IS_LOADING:
            return ({
                ...state,
                isLoading: action.isLoading
            });
        case SET_MESSAGE:
            return ({
                ...state,
                message: action.message,
                error: ''
            });
        case SET_ERROR:
            return ({
                ...state,
                error: action.error,
                message: ''
            });
        default:
            return state;
    }
};

const setAuthData = (token, authProfile, isAuth) => ({ type: SET_AUTH_DATA, token, authProfile, isAuth });
const setIsLoading = (isLoading) => ({ type: SET_IS_LOADING, isLoading });
const setMessage = message => ({ type: SET_MESSAGE, message });
const setError = error => ({ type: SET_ERROR, error });

export const signupUser = (name, email, password) => async dispatch => {
    dispatch(setIsLoading(true));
    try {
        const response = await instance.post('/auth/signup', { name, email, password });

        if (response.status === 200) {
            dispatch(setIsLoading(false));
        }
    } catch(e) {
        dispatch(setIsLoading(false));
        throw new SubmissionError(e.response.data.errors[0]);
    }

};

export const signinUser = ({ email, password }) => async dispatch => {
    dispatch(setIsLoading(true));
    try {
        const response = await instance.post('/auth/signin', { email, password });

        if (response.status === 200) {
            const { token, user } = response.data;
            dispatch(setAuthData(token, user, true));
            dispatch(setIsLoading(false));

            if (typeof window !== undefined) {
                localStorage.setItem('jwt', token);
                localStorage.setItem('authProfile', JSON.stringify(user));
            }
        }
    } catch(e) {
        dispatch(setIsLoading(false));
        throw new SubmissionError(e.response.data.errors[0]);
    }
};

export const signoutUser = () => async dispatch => {
    dispatch(setIsLoading(true));
    try {
        const { status } = await instance.get('/auth/signout');

        if (status === 200) {
            dispatch(setAuthData(null, null, false));
            dispatch(setIsLoading(false));

            if (typeof window !== undefined) {
                localStorage.removeItem('jwt');
                localStorage.removeItem('authProfile');
            }
        }
    } catch(e) {
        dispatch(setIsLoading(false));
        throw new SubmissionError(e.response.data.error);
    }
};

export const getLocalStorageAuthData = () => dispatch => {
    if (typeof window !== undefined) {
        const token = localStorage.getItem('jwt');
        const authProfile = localStorage.getItem('authProfile');

        const isAuth = !!token;
        dispatch(setAuthData(token, JSON.parse(authProfile), isAuth));
    }
};

export const forgotPassword = email => async dispatch => {
    dispatch(setIsLoading(true));
    try {
        const { data: { message }, status } = await instance.put('/auth/forgot-password', { email });

        if (status === 200) {
            dispatch(setMessage(message));
            dispatch(setIsLoading(false));
        }
    } catch(e) {
        dispatch(setIsLoading(false));

        const data = e.response.data;

        if (data.errors) {
            throw new SubmissionError(data.errors[0]);
        } else {
            dispatch(setError(data.error));
        }
    }
};

export const resetPassword = (resetPasswordLink, newPassword) => async dispatch => {
    dispatch(setIsLoading(true));
    try {
        const { data: { message }, status } = await instance.put('/auth/reset-password',
            { resetPasswordLink, newPassword });

        if (status === 200) {
            dispatch(setMessage(message));
            dispatch(setIsLoading(false));
        }
    } catch(e) {
        dispatch(setIsLoading(false));

        const data = e.response.data;

        if (data.errors) {
            throw new SubmissionError(data.errors[0]);
        } else {
            dispatch(setError(data.error));
        }
    }
};