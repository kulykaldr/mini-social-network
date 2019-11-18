import React from 'react';

const ShowInputError = ({ touched, error, warning }) => (
    <>
        {touched &&
        ((error && <div className='alert alert-danger'>{error}</div>) ||
            (warning && <div className='alert alert-warning'>{warning}</div>))}
    </>
);

export default ShowInputError;