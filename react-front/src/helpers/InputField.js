import React from 'react';
import ShowInputError from "./ShowInputError";

const InputField = ({ input, label, type, meta }) => (
    <div className='form-group'>
        <label className='text-muted'>{label}</label>
        <div>
            <input {...input} type={type} className='form-control'/>
            <ShowInputError {...meta}/>
        </div>
    </div>
);

export default InputField;