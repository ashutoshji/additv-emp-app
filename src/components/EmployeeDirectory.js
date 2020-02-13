import React, { useState, useReducer } from "react";
import Header from "./Header";
import Employee from "./Employee";
import Search from "./Search";
import { reducer,initialState } from '../store/reducer';

const EMP_API_URL = "http://api.additivasia.io/api/v1/assignment/employees"; // you should replace this with yours

const EmployeeDirectory = () => {

    const [state, dispatch] = useReducer(reducer, initialState);
    const[employeeName,setEmployeeName] = useState('');
  
    const search = searchValue => {
        dispatch({
          type: "SEARCH_EMPLOYEE_REQUEST"
        });
        setEmployeeName(searchValue);
        fetch(`${EMP_API_URL}/${searchValue}`)
        .then(response => response.json())
        .then(jsonResponse => {
          if (jsonResponse.length > 0) {
            dispatch({
                type: "SEARCH_EMPLOYEE_SUCCESS",
                payload: jsonResponse
            });
          } else {
            dispatch({
                type: "SEARCH_EMPLOYEE_FAILURE",
                error: jsonResponse
            });
          }
        });
    };

   const { employees, errorMessage, isFound } = state;
   const subordinates = errorMessage ? (
      <div className="errorMessage">{errorMessage}</div>  
    ) : (isFound && employees["1"] ? 
      employees["1"]["direct-subordinates"].map((data, index) => (
            <Employee key={index} emp={data} />
          )): employeeName.length>0 ?(<div>No subordinates found</div>):<div></div>);


    return (
     <div>
      <Header text="Employee Directory" />
      <Search search={search} />
      <h3>Employee Overview</h3>
      <p className="intro">Subordinates of Employee : {employeeName}</p>
      <div className="employees">
         {subordinates}
      </div>
    </div>
  );
};


export default EmployeeDirectory;
