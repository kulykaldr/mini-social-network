import { getLocalStorageAuthData } from "./authReducer";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

const initialState = {
    initialized: false
};

export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return ({
                ...state,
                initialized: true
            });
        default:
            return state;
    }
};

const initializeSuccess = () => ({ type: INITIALIZED_SUCCESS });

export const initializeApp = () => dispatch => {
    dispatch(getLocalStorageAuthData());
    dispatch(initializeSuccess())
};