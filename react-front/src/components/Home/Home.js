import React from 'react';
import { compose } from "redux";
import { connect } from "react-redux";

const Home = () => (
    <div className='container'>
        Home
    </div>
);

const mapStateToProps = state => ({
    isAuth: state.auth.isAuth
});

export default compose(
    connect(mapStateToProps, null)
)(Home);