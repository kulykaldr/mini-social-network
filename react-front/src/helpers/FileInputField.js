import React from 'react';
import ShowInputError from "./ShowInputError";

const adaptFileEventToValue = delegate => e => delegate(e.target.files[0]);

const FileInputField = ({ input: { value: omitValue, onChange, onBlur }, meta: omitMeta, ...props }) => {
    return (
        <div className='form-group'>
            <label className='text-muted'>{props.label}</label>
            <div>
                <input
                    className='form-control-file'
                    onChange={adaptFileEventToValue(onChange)}
                    onBlur={adaptFileEventToValue(onBlur)}
                    type="file"
                    {...props.input}
                    {...props}
                />
                <ShowInputError {...omitMeta}/>
            </div>
        </div>
    );
};

export default FileInputField;