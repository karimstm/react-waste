import React from 'react'

export const renderField = ({
    input,
    label,
    placeholder,
    type,
    meta: { touched, error }
}) => (
    <div>
        <div className="input-group py-2">
            <input className="form-control" {...input} placeholder={ placeholder} type={type} />
        </div>
                { touched && (error && <small className="form-text text-danger" >{error}</small>)}
        </div>
)