import React from 'react';

import { compose } from "redux";
import { connect } from "react-redux";
import { signoutUser } from "../../redux/authReducer";
import { NavLink } from "react-router-dom";

const MainMenu = ({ signoutUser }) => (
    <nav>
        <div>
            <button onClick={() => signoutUser()} className="btn btn-primary">Signout</button>
        </div>
        <div>
            <NavLink to='/signin'>Signin</NavLink>
        </div>
        <div>
            <NavLink to='/signup'>Signup</NavLink>
        </div>
    </nav>
);

const mapStateToProps = state => ({
    isAuth: state.auth.isAuth
});

export default compose(
    connect(mapStateToProps, { signoutUser })
)(MainMenu);