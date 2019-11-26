import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from "redux-form";
import { Redirect } from "react-router-dom";
import { forgotPassword } from "../../redux/authReducer";
import InputField from "../../helpers/InputField";

const ForgotPassword = ({ error, isAuth, message, forgotPassword }) => {

    if (isAuth) {
        return <Redirect to='/' />
    }

    return (
        <div>
            <div className="container">
                <h2 className="mt-5 mb-5">Forgot Password</h2>
                {error && <div className='alert alert-danger'>{error}</div>}
                {message && <div className='alert alert-success'>{message}</div>}
                <ForgotPasswordFormRedux onSubmit={forgotPassword}/>
            </div>
        </div>
    );
};

const ForgotPasswordForm = ({ handleSubmit, submitting }) => {
    return (
        <form onSubmit={handleSubmit}>
            <Field name='email' type='email' label='Your email' component={InputField}/>
            <button className='btn btn-raised btn-primary' disabled={submitting}>Submit</button>
        </form>
    )
};

const ForgotPasswordFormRedux = reduxForm({
    form: 'forgotPasswordForm'
})(ForgotPasswordForm);

const mapStateToProps = state => ({
    error: state.auth.error,
    isAuth: state.auth.isAuth,
    message: state.auth.message
});

export default compose(
    connect(mapStateToProps, { forgotPassword })
)(ForgotPassword);