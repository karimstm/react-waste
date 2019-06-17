import React, {useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import PropTypes from "prop-types";

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
};


const DropzoneField = ({
    handleOnDrop,
    input,
    imagefile,
    meta: { error, touched }}, {...rest}) => {
  const [files, setFiles] = useState([]);
  const {getRootProps, getInputProps} = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
        handleOnDrop(acceptedFiles);
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });
  
  const thumbs = files.map(file => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
        />
      </div>
    </div>
  ));

  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <section>
      <div onChange={file => input.onChange(file)} {...getRootProps({className: 'dropzone text-center  text-muted py-4'})}>
        <input name={input.name} {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <aside style={thumbsContainer}>
        {thumbs}
      </aside>
    </section>
  );
}


DropzoneField.propTypes = {
    handleOnDrop: PropTypes.func.isRequired,
    input: PropTypes.shape({
      name: PropTypes.string,
      onBlur: PropTypes.func.isRequired,
      onChange: PropTypes.func.isRequired,
      onDragStart: PropTypes.func.isRequired,
      onDrop: PropTypes.func.isRequired,
      onFocus: PropTypes.func.isRequired,
      value: PropTypes.shape({
        preview: PropTypes.string
      })
    }),
    imagefile: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
    label: PropTypes.string,
    touched: PropTypes.bool,
    error: PropTypes.string
  };

export default DropzoneField;
