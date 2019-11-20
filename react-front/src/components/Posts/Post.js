import React, { useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { deletePost, getPosts, getSinglePost } from '../../redux/postReducer';
import Preloader from '../common/Preloader/Preloader';

const Post = ({ post, match, getSinglePost, isLoading, error, authProfile, deletePost, history, getPosts }) => {

    const postId = match.params.postId;

    useEffect(() => {
        getSinglePost(postId);
    }, [ getSinglePost, postId ]);

    if (isLoading) {
        return <Preloader/>
    }

    if (error) {
        return <div className='alert alert-danger'>{error}</div>
    }

    const posterUrl = post.postedBy ? `/user/${post.postedBy._id}` : '#';
    const posterId = post.postedBy ? post.postedBy._id : undefined;
    const posterName = post.postedBy ? post.postedBy.name : 'Unknown';

    const createdDate = new Date(post.created)
        .toLocaleDateString('en-US',
            {
                year: 'numeric', month: 'numeric', day: 'numeric',
                hour: 'numeric', minute: 'numeric'
            });

    const onClickDelete = () => {
        deletePost(postId);
        getPosts();
        history.push('/');
    };

    return (
        <div className='container'>
            <h1 className='display-2 mt-2 mb-2'>{post.title}</h1>
            <img className='card-img-top'
                 src={post.thumbnail}
                 alt={post.title}
                 style={{ width: '100%', height: '300px', objectFit: 'cover' }}
            />
            <div className='card-body'>
                <p className='card-text'>{post.body}</p>
                <br/>
                <p className='font-italic mark'>
                    Posted by <NavLink to={posterUrl}>{posterName}</NavLink> <br/> on {createdDate}
                </p>
                <div className='d-inline-block'>
                    <NavLink to={'/'} className='btn btn-raised btn-primary btn-sm mr-5'>Back to posts</NavLink>
                    {authProfile._id === posterId &&
                    <>
                        <NavLink className='btn btn-raised btn-warning mr-5' to={`/post/edit/${post._id}`}>Edit post</NavLink>
                        <button className='btn btn-raised btn-danger' onClick={onClickDelete}>Delete post</button>
                    </>
                    }
                </div>
            </div>
        </div>
    )
};

const mapStateToProps = state => ({
    post: state.post.post,
    isLoading: state.post.isLoading,
    error: state.post.error,
    authProfile: state.auth.authProfile
});

export default compose(
    connect(mapStateToProps, { getSinglePost, deletePost, getPosts }),
    withRouter
)(Post);