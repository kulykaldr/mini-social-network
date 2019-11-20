import React from 'react';
import { compose } from "redux";
import { connect } from "react-redux";
import Posts from "../Posts/Posts";

const Home = () => (
    <div className='container'>
        <h2 className='mt-5 mb-5'>Main page</h2>
        Welcome to main page
        <Posts />
    </div>
);

const mapStateToProps = state => ({
    isAuth: state.auth.isAuth
});

export default compose(
    connect(mapStateToProps, null)
)(Home);