import React from 'react';
import { compose } from "redux";
import { connect } from "react-redux";

const Home = () => (
    <div className='container'>
        <h2 className='mt-5 mb-5'>Home</h2>
    </div>
);

const mapStateToProps = state => ({
    isAuth: state.auth.isAuth
});

export default compose(
    connect(mapStateToProps, null)
)(Home);