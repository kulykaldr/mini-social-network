import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ component, isAuth, ...rest }) => (
    <>
        {isAuth ? <Route {...rest} component={component}/> : <Redirect to='/'/>}
    </>
);

const mapStateToProps = state => ({
    isAuth: state.auth.isAuth
});

export default compose(
    connect(mapStateToProps)
)(PrivateRoute);