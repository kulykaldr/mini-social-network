import React from 'react';
import { compose } from "redux";
import { connect } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { signoutUser } from "../../redux/authReducer";

const MainMenu = ({ isAuth, signoutUser }) => {
    return (
        <nav>
            <ul className='nav nav-tabs bg-primary'>
                {!isAuth && <li className='nav-item'>
                    <NavLink to='/signup' className='nav-link' activeClassName='active'>Signup</NavLink>
                </li>}
                {!isAuth && <li className='nav-item'>
                    <NavLink to='/signin' className='nav-link' activeClassName='active'>Signin</NavLink>
                </li>}
                {isAuth && <li className='nav-item'>
                    <Link to={undefined} className='nav-link' onClick={signoutUser}>Signout</Link>
                </li>}
            </ul>
        </nav>
    )
};

const mapStateToProps = state => ({
    isAuth: state.auth.isAuth
});

export default compose(
    connect(mapStateToProps, {signoutUser})
)(MainMenu);