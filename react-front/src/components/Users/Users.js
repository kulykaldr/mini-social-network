import React, { useEffect } from 'react';
import { compose } from "redux";
import { connect } from "react-redux";
import UserCard from "./UserCard";
import { getUsers } from "../../redux/userReducer";
import Preloader from "../common/Preloader/Preloader";

const Users = ({ error, users, getUsers, isLoading }) => {

    useEffect(() => {
        getUsers();
    }, [ getUsers ]);

    const usersItems = users.map(user => <UserCard user={user} key={user._id}/>);

    return (
        <div className='container'>
            <h2 className="mt-5 mb-5">Users</h2>
            {isLoading && <Preloader/>}
            {error && <div className="alert alert-danger">{error}</div>}

            <div className="row">
                {!error && usersItems}
            </div>
        </div>
    )
};

const mapStateToProps = state => ({
    users: state.user.users,
    isLoading: state.user.isLoading,
    error: state.user.error
});

export default compose(
    connect(mapStateToProps, { getUsers })
)(Users);