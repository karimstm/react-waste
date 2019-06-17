import React, { useState } from "react";
import { Form, Field, reduxForm } from "redux-form";
import DropzoneField from "../components/DropzoneField";


function UploadImageForm (props) {

    const { handleSubmit, pristine, submitting } = props;
    const [imageFile, setImageFile] = useState([]);

    const blobToBase64 = function (blob, callback) {
        var reader = new FileReader();
        reader.onload = function() {
            var dataUrl = reader.result;
            var base64 = dataUrl.split(',')[1];
            callback(base64);
        };
        reader.readAsDataURL(blob);
    }

    const handleFormSubmit = formProps => {
        const fd = new FormData();
        fd.append("imageFile", formProps.imageToUpload[0]);
        alert(JSON.stringify(formProps, null, 4));
        Object.keys(formProps.imageToUpload).map(function(key) {
            return console.log([Number(key), formProps.imageToUpload[key]]);
          });
        blobToBase64(formProps.imageToUpload[0], (data) => {
            console.log(data);
        });
        return true;
    };

    const handleOnDrop = newImageFile => setImageFile(newImageFile);

    return (
        <div className="app-container">
            <h1 className="title">Upload An Image</h1>
            <hr />
            <Form onSubmit={handleSubmit(handleFormSubmit)}>
                <Field
                    name="imageToUpload"
                    component={DropzoneField}
                    type="file"
                    imagefile={imageFile}
                    handleOnDrop={handleOnDrop}
                />
                <Field
                    name="title"
                    component="input"
                    type="text"
                />
                <button
                    type="submit"
                    className="uk-button uk-button-primary uk-button-large"
                    disabled={submitting}
                >
                    Submit
        </button>
                <button
                    type="button"
                    className="uk-button uk-button-default uk-button-large"
                    disabled={pristine ||submitting}
                    style={{ float: "right" }}
                >
                    Clear
        </button>
            </Form>
            <div className="clear" />
        </div>
    );
}

export default reduxForm({ form: "UploadImageForm" })(UploadImageForm);
