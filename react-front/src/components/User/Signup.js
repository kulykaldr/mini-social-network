import React, {useState} from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { signupUser } from '../../redux/authReducer';
import { email, required } from "../../helpers/formValidators";
import renderField from "../../helpers/renderField";
import { compose } from "redux";
import { NavLink, Redirect } from "react-router-dom";

const Signup = ({ signupUser, isAuth }) => {

    const [isSignup, setIsSignup] = useState(false);

    if (isAuth) return <Redirect to='/' />;

    const onSubmit = ({ name, email, password }) => {
        signupUser(name, email, password);
        setIsSignup(true);
    };

    return <div className='container'>
        <h2 className='mt-5 mb-5'>Signup</h2>

        {isSignup && <div className='alert alert-success'>
            New account is successfully created. Please <NavLink to={'/signin'}>Sign In</NavLink>
        </div>}

        <SignupFormRedux onSubmit={onSubmit} />
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
    isAuth: state.auth.isAuth,
    isLoading: state.auth.isLoading
});

export default compose(
    connect(mapStateToProps, { signupUser })
)(Signup);
