import React, { useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { getUser, updateUser } from "../../redux/userReducer";
import { Field, reduxForm } from "redux-form";
import renderField from "../../helpers/renderField";
import { email, required } from "../../helpers/formValidators";
import Preloader from "../common/Preloader/Preloader";

const ProfileEdit = ({ match, getUser, user, error, updateUser, history, isLoading }) => {

    const userId = match.params.userId;

    useEffect(() => {
        getUser(userId);
    }, [ userId, getUser ]);

    const onSubmit = ({ name, email, password }) => {
        updateUser(userId, name, email, password);
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
            <form onSubmit={handleSubmit}>

                <Field name='name' type='text' label='Name' component={renderField}
                       validate={[ required ]}/>
                <Field name='email' type='email' label='Email' component={renderField}
                       validate={[ required, email ]}/>
                <Field name='password' type='password' label='Password' component={renderField} />

                <button className='btn btn-raised btn-primary' disabled={submitting}>Submit</button>
            </form>
        </div>
    )
};

const ProfileEditFormRedux = compose(
    connect(state => ({ initialValues: state.user.profile })),
    reduxForm({
        form: 'updateUserForm'
    })
)(ProfileEditForm);

const mapStateToProps = state => ({
    user: state.user.profile,
    error: state.user.error,
    isLoading: state.user.isLoading
});

export default compose(
    connect(mapStateToProps, { getUser, updateUser }),
    withRouter
)(ProfileEdit);