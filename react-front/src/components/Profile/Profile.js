import React, { useEffect, memo } from 'react';
import { compose } from "redux";
import { connect } from "react-redux";
import { deleteUser, followUser, getUser, unfollowUser } from "../../redux/userReducer";
import Preloader from "../common/Preloader/Preloader";
import { Link, withRouter } from "react-router-dom";
import anonimPhoto from '../../images/anonim.jpg';
import ProfileTabs from "./ProfileTabs";

const Profile = memo(({
                          getUser, user, isLoading, match, authProfile,
                          deleteUser, history, error, isAuth, followUser, unfollowUser, isFollowing
                      }) => {

    const userId = match.params.userId;

    useEffect(() => {
        getUser(userId);
    }, [ userId, getUser ]);

    if (isLoading) {
        return (
            <div className="container">
                <h2 className='mt-5 mb-5'>Profile</h2>
                <Preloader/>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container">
                <h2 className='mt-5 mb-5'>Profile</h2>
                <div className="alert alert-danger">{error}</div>
            </div>
        );
    }

    const onClickDelete = () => {
        let answer = window.confirm('Are you sure you want to delete your account?');
        if (answer) {
            deleteUser(userId);
            history.push('/');
        }
    };

    const onClickFollow = () => {
        followUser(authProfile._id, user._id);
    };

    const onClickUnfollow = () => {
        unfollowUser(authProfile._id, user._id);
    };

    const createdDate = new Date(user.created)
        .toLocaleDateString('en-US',
            {
                year: 'numeric', month: 'long', day: 'numeric',
                hour: 'numeric', minute: 'numeric'
            });

    return (
        <div className='container'>
            <h2 className='mt-5 mb-5'>Profile</h2>
            <div className="row">
                <div className="col-md-6">

                    <img className='img-thumbnail'
                         style={{ height: '200px', width: 'auto' }}
                         src={user.photo || anonimPhoto}
                         alt={user.name}
                    />
                </div>

                <div className="col-md-6">

                    <div className="lead mt-2">
                        <p>Hello {user.name}</p>
                        <p>Email: {user.email}</p>
                        <p>Created: {createdDate}</p>
                    </div>

                    {isAuth && user._id === authProfile._id
                        ? <div className='d-inline-block'>
                            <Link
                                to={`/user/edit/${userId}`}
                                className='btn btn-raised btn-success mr-5'>
                                Edit profile
                            </Link>
                            <button className="btn btn-raised btn-danger" onClick={onClickDelete}>
                                Delete profile
                            </button>
                        </div>
                        : <div className='d-inline-block'>
                            {isFollowing
                                ? <button className='btn btn-warning btn-raised'
                                                onClick={onClickUnfollow}>Unfollow</button>
                                : <button className='btn btn-success btn-raised mr-5'
                                          onClick={onClickFollow}>Follow</button>
                            }
                        </div>
                    }
                </div>
            </div>

            <div className="row">
                <div className="col md-12 mt-5 mb-5">
                    <hr/>
                    <p className="lead">{user.about || '...'}</p>
                    <hr/>

                    <ProfileTabs following={user.following} followers={user.followers}/>
                </div>
            </div>
        </div>
    );
});

const mapStateToProps = state => ({
    authProfile: state.auth.authProfile,
    user: state.user.profile,
    isLoading: state.user.isLoading,
    error: state.user.error,
    isAuth: state.auth.isAuth,
    isFollowing: state.user.isFollowing
});

export default compose(
    connect(mapStateToProps, { getUser, deleteUser, followUser, unfollowUser }),
    withRouter
)(Profile);