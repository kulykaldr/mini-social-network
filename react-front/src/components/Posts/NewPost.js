import React from 'react';
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
import { createNewPost, getUserPosts } from "../../redux/postReducer";

const maxWeight = validateImageWeight(800);
const imageType = validateImageFormat('image/jpeg, image/png');
const maxWidth = validateImageWidth(2048);
const maxHeight = validateImageHeight(2048);

const NewPost = ({ authProfile, error, history, isLoading, createNewPost, getUserPosts }) => {

    const onSubmit = values => {
        const userId = authProfile._id;
        createNewPost(userId, values);
        getUserPosts(userId);
        history.replace(`/user/${userId}`);
    };

    return (
        <div>
            <div className="container">
                <h2 className="mt-5 mb-5">Create new post</h2>
                {error && <div className='alert alert-danger'>{error}</div>}
                {isLoading ? <Preloader/> :
                    <NewPostFormRedux onSubmit={onSubmit}/>
                }
            </div>
        </div>
    );
};

const NewPostForm = ({ handleSubmit, submitting }) => {
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Field name='thumbnail' type='file' accept='image/*' label='Post thumbnail'
                       component={FileInputField}
                       validate={[ required, maxWeight, imageType, maxWidth, maxHeight ]}/>
                <Field name='title' type='text' label='Post title' component={InputField}
                       validate={[ required ]}/>
                <Field name='body' label='Post text' component={TextareaField} rows='5'
                       validate={[ required ]}/>
                <button className='btn btn-raised btn-primary' disabled={submitting}>Create</button>
            </form>
        </div>
    )
};

const NewPostFormRedux = reduxForm({ form: 'createNewPost' })(NewPostForm);

const mapStateToProps = state => ({
    error: state.post.error,
    isLoading: state.post.isLoading,
    authProfile: state.auth.authProfile
});

export default compose(
    connect(mapStateToProps, { createNewPost, getUserPosts })
)(NewPost);