import React, { useEffect, useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { deletePost, getPosts, getSinglePost, likePost, unlikePost } from '../../redux/postReducer';
import Preloader from '../common/Preloader/Preloader';

const SinglePost = ({
                        post, match, getSinglePost, isLoading, error,
                        authProfile, deletePost, history, getPosts, likePost, unlikePost
                    }) => {

    const postId = match.params.postId;
    const userId = authProfile && authProfile._id;

    const posterUrl = post.postedBy ? `/user/${post.postedBy._id}` : '#';
    const posterId = post.postedBy ? post.postedBy._id : undefined;
    const posterName = post.postedBy ? post.postedBy.name : 'Unknown';

    useEffect(() => {
        getSinglePost(postId);
    }, [ getSinglePost, postId ]);

    const [ like, setLike ] = useState(false);
    const [ likes, setLikes ] = useState(0);

    useEffect(() => {
        if (post.likes) {
            setLikes(post.likes.length);
            setLike(post.likes.indexOf(userId) !== -1)
        }
    }, [ like, post.likes, userId ]);

    if (isLoading) {
        return <Preloader/>
    }

    if (error) {
        return <div className='alert alert-danger'>{error}</div>
    }

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

    const likeToggle = () => {
        const action = like ? unlikePost : likePost;
        action(userId, postId);
    };

    return (
        <div className='container'>
            <h1 className='display-2 mt-2 mb-2'>{post.title}</h1>
            <img className='card-img-top mb-2'
                 src={post.thumbnail}
                 alt={post.title}
                 style={{ width: '100%', height: '300px', objectFit: 'cover' }}
            />
            {like ? (
                <h3 onClick={likeToggle} style={{ cursor: 'pointer' }}><i className='fa fa-thumbs-up text-warning bg-dark'
                                            style={{ padding: '10px', borderRadius: '50%' }}
                /> {likes} Like</h3>
            ) : (
                <h3 onClick={likeToggle} style={{ cursor: 'pointer' }}><i
                    className='fa fa-thumbs-up text-success bg-dark'
                    style={{ padding: '10px', borderRadius: '50%' }}
                /> {likes} Like</h3>
            )}

            <div className='card-body'>
                <p className='card-text'>{post.body}</p>
                <br/>
                <p className='font-italic mark'>
                    Posted by <NavLink to={posterUrl}>{posterName}</NavLink> <br/> on {createdDate}
                </p>
                <div className='d-inline-block'>
                    <NavLink to={'/'} className='btn btn-raised btn-primary btn-sm mr-5'>Back to posts</NavLink>
                    {userId === posterId &&
                    <>
                        <NavLink className='btn btn-raised btn-warning mr-5' to={`/post/edit/${post._id}`}>Edit
                            post</NavLink>
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
    connect(mapStateToProps, { getSinglePost, deletePost, getPosts, likePost, unlikePost }),
    withRouter
)(SinglePost);