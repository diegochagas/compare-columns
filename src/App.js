import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.textAreaRef = React.createRef();
    this.selectedFile = React.createRef();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
        <div className="input-file">
          <label className="btn" htmlFor="json-file">Choose json file</label>
          <input id="json-file" type="file" onChange={this.onInputJSONChange} accept=".json"/>
        </div>
        <div className="input-file">
          <label className="btn" htmlFor="csv-file">Choose csv file</label>
          <input id="csv-file" type="file" onChange={this.onInputCSVChange} accept=".csv" />
        </div>
        <p ref={this.selectedFile}></p>
        </header>
        <article>
          <textarea className="" rows="25" cols="80" ref={this.textAreaRef}></textarea>
        </article>
      </div>
    );
  }
  
  onInputCSVChange = event => {
    const reader = new FileReader();
    const file = event.target.files[0];
    reader.readAsText(file);
    reader.onload = event => {
      const CSV = event.target.result; 
      const arrayCSV = this.convertCSVToJSON(CSV);
      this.textAreaRef.current.value = JSON.stringify(arrayCSV);
    }
    this.selectedFile.current.innerHTML = file.name;
  }

  convertCSVToJSON(CSVContent){
    const splitedBrokenLine = CSVContent.split('\n');
    const sizeWithOnlyCommas = 12;
    const columnsName = splitedBrokenLine[0].split(',');
    const rows = splitedBrokenLine.filter((row, index) => 
      index >= 1 && row.length > sizeWithOnlyCommas);
    let clientList = {};
    let clients = [];
    for(let i = 1; i < rows.length; i++){
      clientList = {};
      let items = rows[i].split(',');
      for(let j = 0; j < items.length; j++){
        clientList[`${columnsName[j]}`] = items[j];
      }
      clients.push(clientList);
    }
    return clients;
  }

  onInputJSONChange = event => {
    const reader = new FileReader();
    const file = event.target.files[0];
    reader.onload = event => {
      const obj = JSON.parse(event.target.result);
      this.textAreaRef.current.value = JSON.stringify(obj[0]);
    }
    reader.readAsText(file);
    this.selectedFile.current.innerHTML = file.name;
  }

  compareColumns(obj){
    obj.forEach(json => {
      console.log(json.from.column);
      console.log(json.to.column);
    });
  }
}

export default App;
