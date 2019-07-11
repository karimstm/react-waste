import React from 'react';

export const InputGroup = ({
    input,
    label,
    placeholder,
    type,
    isIcon = true,
    icon: Icon,
    meta: { touched, error }
}) => {
    return (
        <React.Fragment>
            <label>{label}</label>
            <div className="input-group">
            {
                isIcon && <div class="input-group-prepend">
                                <span class="input-group-text" id="basic-addon1">{Icon}</span>
                            </div>
            }
                <input className="form-control" {...input} placeholder={placeholder} type={type} />
                {touched && (error && <small className="form-text text-danger" >{error}</small>)}
            </div>
        </React.Fragment>
    );
}
