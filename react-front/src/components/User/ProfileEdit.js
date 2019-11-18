import React, { useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { getUser, updateUser } from "../../redux/userReducer";
import { Field, reduxForm } from "redux-form";
import InputField from "../../helpers/InputField";
import {
    email,
    required,
    validateImageFormat, validateImageHeight,
    validateImageWeight,
    validateImageWidth
} from "../../helpers/formValidators";
import Preloader from "../common/Preloader/Preloader";
import FileInputField from "../../helpers/FileInputField";
import anonimPhoto from '../../images/anonim.jpg';
import TextareaField from "../../helpers/TextareaField";

const maxWeight = validateImageWeight(800);
const imageType = validateImageFormat('image/jpeg, image/png');
const maxWidth = validateImageWidth(2048);
const maxHeight = validateImageHeight(2048);

const ProfileEdit = ({ match, user, getUser, error, updateUser, history, isLoading }) => {

    const userId = match.params.userId;

    useEffect(() => {
        getUser(userId);
    }, [ userId, getUser ]);

    const onSubmit = values => {
        values.userId = userId;
        updateUser(values);
        history.push(`/user/${userId}`);
    };

    return (
        <div>
            <div className="container">
                <h2 className="mt-5 mb-5">Edit profile</h2>
                {error && <div className='alert alert-danger'>{error}</div>}
                {isLoading ? <Preloader/> :
                    <ProfileEditFormRedux onSubmit={onSubmit} user={user}/>
                }
            </div>
        </div>
    );
};

const ProfileEditForm = ({ handleSubmit, submitting, user }) => {
    return (
        <div>
            <div>
                <img
                    className='img-thumbnail'
                    style={{ height: '200px', width: 'auto' }}
                    src={user.photo || anonimPhoto}
                    alt={user.name}
                />
            </div>
            <form onSubmit={handleSubmit}>
                <Field name='photo' type='file' accept='image/*' label='Profile Photo' component={FileInputField}
                       validate={[ maxWeight, imageType, maxWidth, maxHeight ]}/>
                <Field name='name' type='text' label='Name' component={InputField}
                       validate={[ required ]}/>
                <Field name='email' type='email' label='Email' component={InputField}
                       validate={[ required, email ]}/>
                <Field name='password' type='password' label='Password' component={InputField}/>
                <Field name='about' label='About' component={TextareaField}/>
                <button className='btn btn-raised btn-primary' disabled={submitting}>Update</button>
            </form>
        </div>
    )
};

const formMapStateToProps = state => ({
    initialValues: {
        name: state.user.profile.name,
        email: state.user.profile.email,
        about: state.user.profile.about
    }
});

const ProfileEditFormRedux = compose(
    connect(formMapStateToProps),
    reduxForm({
        form: 'updateUserForm'
    })
)(ProfileEditForm);

const mapStateToProps = state => ({
    error: state.user.error,
    isLoading: state.user.isLoading,
    user: state.user.profile
});

export default compose(
    connect(mapStateToProps, { getUser, updateUser }),
    withRouter
)(ProfileEdit);