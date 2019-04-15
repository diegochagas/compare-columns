import React, { Component } from 'react';
import './App.css';
import InputFile from './components/InputFile';

class App extends Component {
  constructor(props){
    super(props);
    this.selectedFile1 = React.createRef();
    this.selectedFile2 = React.createRef();
    this.selectedFile3 = React.createRef();
    this.textAreaRef = React.createRef();
    this.state = {parameters: null, table1: null, table2: null};
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Compare columns</h1>
          <InputFile 
            inputDescription="Chooose parameter"
            inputId="json-file" 
            onInputChange={event => this.onInputChange(event, JSON.parse, "parameters", this.selectedFile1)} 
            fileType=".json"
            spanRef={this.selectedFile1} />
        </header>
        <div className="App-body">
          <InputFile 
            inputId="csv-file" 
            onInputChange={event => this.onInputChange(event, this.convertCSVToJSON, "table1", this.selectedFile2)} 
            fileType=".csv"
            spanRef={this.selectedFile2} />
          <InputFile 
            inputId="csv-file2" 
            onInputChange={event => this.onInputChange(event, this.convertCSVToJSON, "table2", this.selectedFile3)} 
            fileType=".csv"
            spanRef={this.selectedFile3} />
        </div>
        <div className="container-btn">
          <button className="btn" onClick={this.compareColumns}>Compare columns</button>
          <textarea rows="20" ref={this.textAreaRef}></textarea>
        </div>
      </div>
    );
  }

  onInputChange(event, convertToJSON, stateName, elementToShowFile) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = event => {
      const content = event.target.result;
      const arrayJSON = convertToJSON(content);
      this.setState({[stateName]: arrayJSON});
      elementToShowFile.current.innerHTML = file.name;
    }
  }

  convertCSVToJSON(CSVContent){
    const splitedBrokenLine = CSVContent.split('\n');
    const sizeWithOnlyCommas = 12;
    const columnsName = splitedBrokenLine[0].split(',');
    const rows = splitedBrokenLine.filter((row, index) => index >= 1 && row.length > sizeWithOnlyCommas);
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
    const {parameters, table1, table2} = this.state;
    this.verifyIfAllTheFilesWereSelected(parameters, table1, table2);
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
          const hasDiscrepancys = value1 !== value2;
          if(hasDiscrepancys){
            this.textAreaRef.current.value += this.buildReport(key1, key2, value1, value2);
            amountOfDiscrepancys++;
          }
        }
      }
      if(amountOfDiscrepancys === 0){
        this.textAreaRef.current.value = `The tables don't have discrepancys`;
      }
    }
  }

  buildReport = (hasDiscrepancys, key1, key2, value1, value2) => {
    const report = `
    ====================================================== 
      Table1[${key1}]: ${value1}
      Table2[${key2}]: ${value2} 
      Has discrepancys: ${hasDiscrepancys ? "YES" : "NO"}`;
    return report; 
  }

  verifyIfAllTheFilesWereSelected = (...inputFiles) => {
    inputFiles.forEach((inputFile, index) => {
      if(inputFile === null){
        alert(`Select file ${index}`);
      }
    });
  }
}

export default App;
