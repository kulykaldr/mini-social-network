import React from 'react';

const renderField = ({ input, label, type, meta: { touched, error, warning }}) => (
    <div className='form-group'>
        <label className='text-muted'>{label}</label>
        <div>
            <input {...input} type={type} className='form-control'/>
            {touched &&
            ((error && <div className='alert alert-danger'>{error}</div>) ||
                (warning && <div className='alert alert-warning'>{warning}</div>))}
        </div>
    </div>
);

export default renderField;