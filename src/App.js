import React, { Component } from 'react';
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';


class App extends Component{

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            id: '',
            firstname: '',
            lastname: '',
            age: '',
            intervalIsSet:false,
            columnDefs: [
                {headerName: "ID", field: "id",filter: "agNumberColumnFilter",
                    headerCheckboxSelection: true,
                    headerCheckboxSelectionFilteredOnly: true,
                    checkboxSelection: true},
                {headerName: "FirstName", field: "firstname",filter: "agTextColumnFilter"},
                {headerName: "LastName", field: "lastname",filter: "agTextColumnFilter"},
                {headerName: "Age", field: "age",filter: "agNumberColumnFilter"}
            ],
            rowData: [],
            headerCheckboxSelection: true,
            headerCheckboxSelectionFilteredOnly: true,
            checkboxSelection: true
        };
    }

   componentDidMount() {
        this.getSchoolData();
       if (!this.state.intervalIsSet) {
           let interval = setInterval(this.getSchoolData, 10000);
           this.setState({ intervalIsSet: interval });
        console.log(this.state);
    }}


    getSchoolData=()=>{
    fetch('http://localhost:3002/api/getData')
    .then((data)=> data.json())
    .then((response)=> this.setState({data:response.data}))
        .catch((error)=>console.log(error));
    console.log(this.state);
    };

 addUser=(e)=>{
console.log("add user clicked now");
console.log(this.state);
     console.log(e);
     axios.put('http://localhost:3002/api/postData', {
         id: this.state.id,
         firstname: this.state.firstname,
         lastname: this.state.lastname,
         age: this.state.age
     });
     this.getSchoolData();
 };


render() {
  const { data }=this.state;
    return (
    <div>
        <h4> Enrolled Students </h4>
            <div
                className="ag-theme-balham"
                style={{ height: '400px', width: '800px' }}
            >
                <AgGridReact
                    columnDefs={this.state.columnDefs}
                    rowData={data}
                    enableSorting={true}
                    pagination={true}
                    suppressRowClickSelection={true}
                    rowSelection={this.state.rowSelection}>
                </AgGridReact>
            </div>
            <div>
                <h4>Add student Here</h4>
            <form onSubmit={this.addUser}>
                <label> ID
                    <input onChange={((event)=>this.setState({id:event.target.value}))} required type="number"/>
                </label>
                <label> FirstName
                    <input onChange={(event)=> this.setState({firstname:event.target.value})} required type="text"/>
                </label>
                <label> LastName
                    <input onChange={(event)=> this.setState({lastname:event.target.value})} reruired type="text"/>
                </label>
                <label> Age
                    <input onChange={(event)=> this.setState({age:event.target.value})} required type="number"/>
                </label>
                <input type="submit" value="Submit"/>

            </form>
            </div>

        </div>

    );
}}

export default App;
