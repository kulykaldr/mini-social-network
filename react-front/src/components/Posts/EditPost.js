import React, { useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from "redux-form";
import InputField from "../../helpers/InputField";
import {
    required,
    validateImageFormat, validateImageHeight,
    validateImageWeight,
    validateImageWidth
} from "../../helpers/formValidators";
import FileInputField from "../../helpers/FileInputField";
import TextareaField from "../../helpers/TextareaField";
import Preloader from "../common/Preloader/Preloader";
import {  getSinglePost, updatePost } from "../../redux/postReducer";
import { withRouter } from "react-router-dom";

const maxWeight = validateImageWeight(800);
const imageType = validateImageFormat('image/jpeg, image/png');
const maxWidth = validateImageWidth(2048);
const maxHeight = validateImageHeight(2048);

const EditPost = ({ match, error, history, isLoading, getSinglePost, updatePost, post }) => {

    const postId = match.params.postId;

    useEffect(() => {
        getSinglePost(postId);
    }, [ getSinglePost, postId ]);

    const onSubmit = values => {
        updatePost(postId, values);
        history.push(`/post/${postId}`);
    };

    return (
        <div>
            <div className="container">
                <h2 className="mt-5 mb-5">Edit post</h2>
                {error && <div className='alert alert-danger'>{error}</div>}
                {isLoading ? <Preloader/> :
                    <EditPostFormRedux onSubmit={onSubmit} post={post}/>
                }
            </div>
        </div>
    );
};

const EditPostForm = ({ handleSubmit, submitting, post }) => {
    return (
        <div>
            <div>
                <img
                    className='img-thumbnail'
                    style={{ height: '200px', width: 'auto' }}
                    src={post.thumbnail}
                    alt={post.title}
                />
            </div>
            <form onSubmit={handleSubmit}>
                <Field name='thumbnail' type='file' accept='image/*' label='Post thumbnail'
                       component={FileInputField}
                       validate={[ maxWeight, imageType, maxWidth, maxHeight ]}/>
                <Field name='title' type='text' label='Post title' component={InputField}
                       validate={[ required ]}/>
                <Field name='body' label='Post text' component={TextareaField} rows='5'
                       validate={[ required ]}/>
                <button className='btn btn-raised btn-primary' disabled={submitting}>Update</button>
            </form>
        </div>
    )
};

const formMapStateToProps = state => ({
    initialValues: {
        title: state.post.post.title,
        body: state.post.post.body
    }
});

const EditPostFormRedux = compose(
    connect(formMapStateToProps),
    reduxForm({
        form: 'editPostForm'
    })
)(EditPostForm);

const mapStateToProps = state => ({
    error: state.post.error,
    isLoading: state.post.isLoading,
    post: state.post.post
});

export default compose(
    connect(mapStateToProps, { updatePost, getSinglePost }),
    withRouter
)(EditPost);