import * as axios from "axios";
import { signoutUser } from "./authReducer";

const instance = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
    }
});

const SET_USER_DATA = 'USER/SET_USER_DATA';
const SET_USERS = 'USER/SET_USERS';
const SET_IS_LOADING = 'USER/SET_IS_LOADING';
const SET_ERROR = 'USER/SET_ERROR';

const initialState = {
    profile: {},
    users: [],
    isLoading: true,
    error: ''
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
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
        default:
            return state;
    }
};

const setUserData = (profile) => ({ type: SET_USER_DATA, profile });
const setUsers = (users) => ({ type: SET_USERS, users });
const setIsLoading = (isLoading) => ({ type: SET_IS_LOADING, isLoading });
const setError = (error) => ({ type: SET_ERROR, error });

export const getUser = userId => async dispatch => {
    dispatch(setIsLoading(true));

    try {

        const { data, status } = await instance.get(`/users/${userId}`);

        if (status === 200) {
            dispatch(setUserData(data));
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
            dispatch(setUsers(data));
            dispatch(setIsLoading(false));
        }
    } catch(e) {
        dispatch(setIsLoading(false));
        dispatch(setError(e.response.data.error));
    }
};

export const updateUser = (userId, name, email, password) => async dispatch => {
    dispatch(setIsLoading(true));
    try {

        const { data, status } = await instance.put(`/users/${userId}`, {
            name, email, password
        });

        if (status === 200) {
            dispatch(setUserData(data));
            dispatch(setIsLoading(false));
        }
    } catch(e) {
        dispatch(setIsLoading(false));
        dispatch(setError(e.response.data.error));
    }
};