import React from 'react';
import './InputFile.css';

const InputFile = ({inputId, fileType, onInputChange, spanRef, inputDescription}) => {
  return(
    <div className="input-file">
      <div className="input-description">{inputDescription}</div>
      <label className="btn" htmlFor={inputId}>Choose {fileType} file</label>
      <input id={inputId} 
        type="file" 
        onChange={onInputChange} 
        accept={fileType} 
      />
      <div className="selected-file">
        <span>Selected file: </span>
        <span ref={spanRef}>none</span>
      </div>
    </div>
  );
}

InputFile.defaultProps = {
  inputDescription: ''
}

export default InputFile;