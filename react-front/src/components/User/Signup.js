import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { signupUser } from '../../redux/authReducer';
import { email, required } from "../../helpers/formValidators";
import renderField from "../../helpers/renderField";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import Preloader from "../common/Preloader/Preloader";

const Signup = ({ signupUser, isSignup, isAuth, isLoading }) => {

    if (isSignup || isAuth) return <Redirect to='/signin'/>;

    const onSubmit = ({ name, email, password }) => {
        signupUser(name, email, password);
    };

    return <div className='container'>
        <h2 className='mt-5 mb-5'>Signup</h2>
        {isLoading && <Preloader/>}
        {!isLoading && <SignupFormRedux onSubmit={onSubmit}/>}
    </div>
};

const SignupForm = ({ handleSubmit, submitting }) => {
    return (
        <div>
            <form onSubmit={handleSubmit}>

                <Field name='name' type='text' label='Name' component={renderField}
                       validate={[ required ]}/>
                <Field name='email' type='email' label='Email' component={renderField}
                       validate={[ required, email ]}/>
                <Field name='password' type='password' label='Password' component={renderField}
                       validate={[ required ]}/>

                <button className='btn btn-raised btn-primary' disabled={submitting}>Submit</button>
            </form>
        </div>
    )
};


const SignupFormRedux = reduxForm({ form: 'signupForm' })(SignupForm);

const mapStateToProps = state => ({
    isSignup: state.auth.isSignup,
    isAuth: state.auth.isAuth,
    isLoading: state.auth.isLoading
});

export default compose(
    connect(mapStateToProps, { signupUser })
)(Signup);
