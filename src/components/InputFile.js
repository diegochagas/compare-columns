import React from 'react';
import './InputFile.css';

const InputFile = ({inputId, fileType, onInputCSVChange, spanRef}) => {
    return(
      <div className="input-file">
        <label className="btn" htmlFor={inputId}>Choose {fileType} file</label>
        <input id={inputId} 
          type="file" 
          onChange={onInputCSVChange} 
          accept={fileType} 
        />
        <div className="selected-file">
          <span>Selected file: </span>
          <span ref={spanRef}>none</span>
        </div>
      </div>
    );
}

export default InputFile;