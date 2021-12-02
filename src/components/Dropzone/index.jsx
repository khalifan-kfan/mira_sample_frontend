import React, { useState, useEffect } from "react";
import { useDropzone } from 'react-dropzone';

const Dropzone = ({ handleDrop }) => {
  const [files, setFiles] = useState([]);

  const {
    getRootProps,
    getInputProps
  } = useDropzone({
    accept: '.zip',
    onDrop: acceptedFiles => {
      handleDrop(acceptedFiles);
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });

  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <div className="container">
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {!files.length ?
          <p>Drag 'n' drop some files here, or click to select files</p> :
          <>{files.map(file => <p>{file.name}</p>)}</>
        }
      </div>
    </div>
  );
};

export default Dropzone;
