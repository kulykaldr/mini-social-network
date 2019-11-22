import React, { useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from "redux-form";
import TextareaField from "../../helpers/TextareaField";
import Preloader from "../common/Preloader/Preloader";
import { commentPost, uncommentPost } from "../../redux/postReducer";
import { NavLink } from "react-router-dom";
import anonimPhoto from "../../images/anonim.jpg";

const Comment = ({ error, post, authProfile, commentPost, uncommentPost, isAuth }) => {

    const [ loading, setLoading ] = useState(false);

    const postId = post._id;
    const userId =  authProfile && authProfile._id;
    const comments = post.comments && post.comments.length ? post.comments : [];

    const onSubmit = ({ comment }) => {
        setLoading(true);
        commentPost(postId, userId, comment);
        setLoading(false);
    };

    const dateOptions = {
        year: 'numeric', month: 'numeric', day: 'numeric',
        hour: 'numeric', minute: 'numeric'
    };

    const commentsItems = comments.map(comment =>
        <div key={comment._id}>
            <NavLink to={`/user/${comment.postedBy._id}`}>
                <img
                    style={{
                        borderRadius: '50%',
                        border: '1px solid black'
                    }}
                    className='float-left mr-2'
                    height='30px'
                    width='30px'
                    src={comment.postedBy.photo || anonimPhoto}
                    alt={comment.postedBy.name}
                />
                <div>
                    <p className='lead'>{comment.text}</p>
                </div>
            </NavLink>
            <p className='font-italic mark'>
                Posted by <NavLink to={comment.postedBy ? `/user/${comment.postedBy._id}` : '#'}
            >
                {comment.postedBy ? comment.postedBy.name : 'Unknown'}</NavLink>{' '}
                on {new Date(post.created).toLocaleDateString('en-US', dateOptions)}


                {userId === comment.postedBy._id &&
                <span
                    className='text-danger float-right mr-1'
                    onClick={() => uncommentPost(postId, comment.postedBy._id, comment)}
                    style={{cursor: 'pointer'}}
                >
                    Delete
                </span>
                }

            </p>

        </div>
    );

    return (
        <div>
            <div className="container">
                <h2 className="mt-5 mb-5">Leave a comment</h2>
                {error && <div className='alert alert-danger'>{error}</div>}
                {isAuth
                    ? <CommentFormRedux onSubmit={onSubmit}/>
                    : 'PLease signin to leave a comment'
                }

                <div className="col-md-12">
                    <hr/>
                    <h3 className='text-primary'>{comments.length} Comments</h3>
                    {loading && <Preloader/>}
                    {!loading && comments.length ? commentsItems : 'No comments yet! Be the first!'}
                </div>
            </div>
        </div>
    );
};

const CommentForm = ({ handleSubmit, submitting }) => {
    return (
        <form onSubmit={handleSubmit}>
            <Field name='comment' component={TextareaField}/>
            <button className='btn btn-raised btn-primary' disabled={submitting}>Send</button>
        </form>
    )
};

const CommentFormRedux = reduxForm({
    form: 'commentPostForm'
})(CommentForm);

const mapStateToProps = state => ({
    error: state.post.error,
    post: state.post.post,
    authProfile: state.auth.authProfile,
    isAuth: state.auth.isAuth
});

export default compose(
    connect(mapStateToProps, { commentPost, uncommentPost })
)(Comment);