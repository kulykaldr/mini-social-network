import React from 'react';
import ShowInputError from "./ShowInputError";

const TextareaField = ({ input, label, meta }) => {
    return (
        <div className='form-group'>
            {label && <label className='text-muted'>{label}</label>}
            <div>
                <textarea {...input} className='form-control'>{input.value}</textarea>
                <ShowInputError {...meta}/>
            </div>
        </div>
    );
};

export default TextareaField;