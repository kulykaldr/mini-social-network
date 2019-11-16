import React from 'react';
import { compose } from "redux";
import { connect } from "react-redux";
import { Link, NavLink, withRouter } from "react-router-dom";
import { signoutUser } from "../../redux/authReducer";

const MainMenu = ({ isAuth, signoutUser, authProfile }) => {
    return (
        <nav>
            <ul className='nav nav-tabs bg-primary'>
                <li className='nav-item'>
                    <NavLink exact to='/' className='nav-link' activeClassName='active'>Home</NavLink>
                </li>
                <li className='nav-item'>
                    <NavLink exact to='/users' className='nav-link' activeClassName='active'>Users</NavLink>
                </li>
                {!isAuth && <li className='nav-item'>
                    <NavLink exact to='/signup' className='nav-link' activeClassName='active'>Signup</NavLink>
                </li>}
                {!isAuth && <li className='nav-item'>
                    <NavLink exact to='/signin' className='nav-link' activeClassName='active'>Signin</NavLink>
                </li>}
                {isAuth && <li className='nav-item'>
                    <Link to='#' className='nav-link' onClick={signoutUser}>Signout</Link>
                </li>}
                {isAuth && <li className='nav-item'>
                    <NavLink to={`/user/${authProfile._id}`} className='nav-link' style={{color: 'rgb(255,254,155)'}}>{`Profile: ${authProfile.name}`}</NavLink>
                </li>}
            </ul>
        </nav>
    )
};

const mapStateToProps = state => ({
    isAuth: state.auth.isAuth,
    authProfile: state.auth.authProfile
});

export default compose(
    connect(mapStateToProps, {signoutUser}),
    withRouter
)(MainMenu);