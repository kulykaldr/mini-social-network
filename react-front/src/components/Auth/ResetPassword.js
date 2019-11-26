import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from "redux-form";
import { Redirect, withRouter } from "react-router-dom";
import { resetPassword } from "../../redux/authReducer";
import InputField from "../../helpers/InputField";

const ResetPassword = ({ match, error, isAuth, message, resetPassword }) => {

    const onSubmit = ({ newPassword }) => {
        resetPassword(match.params.resetPasswordToken, newPassword);
    };

    if (isAuth) {
        return <Redirect to='/' />
    }

    return (
        <div>
            <div className="container">
                <h2 className="mt-5 mb-5">Reset Password</h2>
                {error && <div className='alert alert-danger'>{error}</div>}
                {message && <div className='alert alert-success'>{message}</div>}
                <ResetPasswordFormRedux onSubmit={onSubmit}/>
            </div>
        </div>
    );
};

const ResetPasswordForm = ({ handleSubmit, submitting }) => {
    return (
        <form onSubmit={handleSubmit}>
            <Field name='newPassword' type='password' label='New password' component={InputField}/>
            <button className='btn btn-raised btn-primary' disabled={submitting}>Submit</button>
        </form>
    )
};

const ResetPasswordFormRedux = reduxForm({
    form: 'resetPasswordForm'
})(ResetPasswordForm);

const mapStateToProps = state => ({
    error: state.auth.error,
    isAuth: state.auth.isAuth,
    message: state.auth.message
});

export default compose(
    connect(mapStateToProps, { resetPassword }),
    withRouter
)(ResetPassword);