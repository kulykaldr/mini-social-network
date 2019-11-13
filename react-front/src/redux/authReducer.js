import * as axios from "axios";
import { SubmissionError } from "redux-form";

const instance = axios.create({
    // withCredentials: true,
    baseURL: 'http://localhost:8080'
});

const SET_AUTH_DATA = 'SET_AUTH_DATA';
const SET_IS_SIGNUP = 'SET_IS_SIGNUP';
const SET_IS_LOADING = 'SET_IS_LOADING';

const initialState = {
    jwt: null,
    user: null,
    isAuth: false,
    isSignup: false,
    isLoading: false
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH_DATA:
            return ({
                ...state,
                jwt: action.token,
                user: action.user,
                isAuth: action.isAuth
            });
        case SET_IS_SIGNUP:
            return ({
                ...state,
                isSignup: action.isSignup
            });
        case SET_IS_LOADING:
            return ({
                ...state,
                isLoading: action.isLoading
            });
        default:
            return state;
    }
};

const setAuthData = (token, user, isAuth = false) => ({ type: SET_AUTH_DATA, token, user, isAuth });
const setIsSignup = (isSignup) => ({ type: SET_IS_SIGNUP, isSignup });
const setIsLoading = (isLoading) => ({ type: SET_IS_LOADING, isLoading });

export const signupUser = ({ name, email, password }) => async dispatch => {
    dispatch(setIsLoading(true));
    try {
        const response = await instance.post('/auth/signup', { name, email, password });

        if (response.status === 200) {
            dispatch(setIsSignup(true));
            dispatch(setIsLoading(false));
        }
    } catch (e) {
        dispatch(setIsLoading(false));
        throw new SubmissionError( e.response.data.errors[0]);
    }

};

export const signinUser = ({ email, password }) => async dispatch => {
    dispatch(setIsLoading(true));
    try {
        const response = await instance.post('/auth/signin', { email, password });

        if (response.status === 200) {

            const { token, user } = response.data;

            if (typeof window !== undefined) {
                dispatch(setAuthData(token, user, true));
                dispatch(setIsSignup(false));
                localStorage.setItem('jwt', token);
                localStorage.setItem('user', JSON.stringify(user));
                dispatch(setIsLoading(false));
            }
        }
    } catch (e) {
        dispatch(setIsLoading(false));
        throw new SubmissionError( e.response.data.errors[0]);
    }
};

export const signoutUser = () => async dispatch => {
    dispatch(setIsLoading(true));
    try {
        const response = await instance.get('/auth/signout');

        if (response.status === 200) {
            if (typeof window !== undefined) {
                dispatch(setAuthData(null, null, false));
                dispatch(setIsSignup(false));
                localStorage.clear();

                dispatch(setIsLoading(false));
            }
        }
    } catch (e) {
        dispatch(setIsLoading(false));
        throw new SubmissionError( e.response.data.errors[0]);
    }
};