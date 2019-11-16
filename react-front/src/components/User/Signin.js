import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { signinUser } from '../../redux/authReducer';
import { email, required } from "../../helpers/formValidators";
import renderField from "../../helpers/renderField";
import { compose } from "redux";
import { Redirect } from "react-router-dom";

const Signin = ({ signinUser, isAuth }) => {

    if (isAuth) return <Redirect to='/'/>;

    return <div className='container'>
        <h2 className='mt-5 mb-5'>Signin</h2>
        <SigninFormRedux onSubmit={signinUser}/>
    </div>
};

const SigninForm = ({ handleSubmit, submitting }) => {
    return (
        <div>
            <form onSubmit={handleSubmit}>

                <Field name='email' type='email' label='Email' component={renderField}
                       validate={[ required, email ]}/>
                <Field name='password' type='password' label='Password' component={renderField}
                       validate={[ required ]}/>

                <button className='btn btn-raised btn-primary' disabled={submitting}>Submit</button>
            </form>
        </div>
    )
};


const SigninFormRedux = reduxForm({ form: 'SigninForm' })(SigninForm);

const mapStateToProps = state => ({
    isAuth: state.auth.isAuth
});

export default compose(
    connect(mapStateToProps, { signinUser })
)(Signin);
