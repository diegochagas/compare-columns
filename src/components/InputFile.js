import React from 'react';
import './InputFile.css';

export default class InputFile extends React.Component {
  render(){
    return(
      <div className="input-file">
        <label className="btn" htmlFor="origin-file">Choose {this.props.typeFile} file</label>
        <input 
          id="origin-file"
          type="file"
          onChange={this.props.onInputChange}
        />
      </div>
    );
  }
}