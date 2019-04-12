import React from 'react';
import './InputFile.css';

export default class InputFile extends React.Component {
  render(){
    return(
      <div className="input-file">
        <label className="btn" htmlFor={inputId}>Choose csv file</label>
        <input id={inputId} 
          type="file" 
          onChange={this.props.onInputCSVChange} 
          accept={fileType} 
        />
        <div className="selected-file">
          <span>Selected file: </span>
          <span ref={this.props.spanRef}>none</span>
        </div>
      </div>
    );
  }
}