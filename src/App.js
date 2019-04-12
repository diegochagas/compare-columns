import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.textAreaRef = React.createRef();
    this.selectedFile1 = React.createRef();
    this.selectedFile2 = React.createRef();
    this.state = {table1: null, table2: null};
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="input-file">
            <label className="btn" htmlFor="json-file">Choose paremeter json file</label>
            <input id="json-file" type="file" onChange={this.onInputJSONChange} accept=".json"/>
          </div>
        </header>
        <div className="App-body">
          <div className="input-file">
            <label className="btn" htmlFor="csv-file">Choose csv file</label>
            <input id="csv-file" type="file" onChange={this.onInputCSVChange} accept=".csv" />
            <div className="selected-file">
              <span>Selected file: </span>
              <span ref={this.selectedFile1}>none</span>
            </div>
          </div>
          <div className="input-file">
            <label className="btn" htmlFor="csv-file2">Choose csv2 file</label>
            <input id="csv-file2" type="file" onChange={this.onInputCSVChange2} accept=".csv" />
            <div className="selected-file">
              <span>Selected file: </span>
              <span ref={this.selectedFile2}>none</span>
            </div>
          </div>
          <div className="container-btn">
            <button className="btn" onClick={this.compareColumns}>Compare columns</button>
            <textarea className="" rows="20" ref={this.textAreaRef}></textarea>
          </div>
        </div>
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
      this.setState({table1: arrayCSV});
      this.selectedFile1.current.innerHTML = file.name;
    }
  }

  onInputCSVChange2 = event => {
    const reader = new FileReader();
    const file = event.target.files[0];
    reader.readAsText(file);
    reader.onload = event => {
      const CSV = event.target.result; 
      const arrayCSV = this.convertCSVToJSON(CSV);
      this.setState({table2: arrayCSV});
      this.selectedFile2.current.innerHTML = file.name;
    }
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
  
  compareColumns = () => {
    const {table1, table2} = this.state;
    if(table1 === null){
      alert("Select first file");
    }
    if(table2 === null){
      alert("Select second file");
    }
    if(!(table1 === null) && !(table2 === null)){
      const amountOfRows = table1.length;
      let amountOfDiscrepancys = 0;
      for(let i = 0; i < amountOfRows; i++){
        const tb1 = table1[i];
        const tb2 = table2[i];
        const jsonObj1 = Object.keys(tb1);
        const jsonObj2 = Object.keys(tb2);
        const amountOfCells = jsonObj1.length;
        for(let j = 0; j < amountOfCells; j++){
          const key1 = jsonObj1[j];
          const key2 = jsonObj2[j];
          const value1 = tb1[key1];
          const value2 = tb2[key2];
          const hasDiscrepancys =  value1 !== value2;
          if(hasDiscrepancys){
            this.textAreaRef.current.value += `
            ====================================================== 
              Table1[${key1}]: ${value1}
              Table2[${key2}]: ${value2} 
              Has discrepancys: ${hasDiscrepancys ? "YES" : "NO"}`;
            amountOfDiscrepancys++;
          }
        }
      }
      if(amountOfDiscrepancys === 0){
        this.textAreaRef.current.value = `The tables don't have discrepancys`;
      }
    }
  }
}

export default App;
