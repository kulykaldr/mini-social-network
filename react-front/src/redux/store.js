import { applyMiddleware, combineReducers, createStore, compose } from "redux";
import { authReducer } from "./authReducer";
import ThunkMiddleware from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import { appReducer } from "./appReducer";
import { userReducer } from "./userReducer";
import { postReducer } from "./postReducer";

let reducers = combineReducers({
    auth: authReducer,
    app: appReducer,
    user: userReducer,
    form: formReducer,
    post: postReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(
    applyMiddleware(ThunkMiddleware)
));

export default store;
window.store = store;

