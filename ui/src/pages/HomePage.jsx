import React from "react";
import { Table } from "react-bootstrap";

const HomePage = () => {
  const students = [
    {
      name: "Gurleen, Kaur",
      number: "8915254",
    },
    {
      name: "Sukhmit, Kaur",
      number: "8914645",
    },
    {
      name: "Yunxiang, Gu",
      number: "8904492",
    },
  ];

  return (
    <div className="container">
      <h1>Welcome to visit Group 2 final project</h1>
      <hr />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Student Number</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td>{student.name}</td>
              <td>{student.number}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <hr />
      <div>
        <h2 className="text-center h4">Group Project</h2>
        <p className="fw-bold">Group of 2 people working on project:</p>
        <ul>
          <li>
            In this project, you start from where you left in assignment 2
          </li>
          <li>
            You need to include React_Bootstrap and change various html
            elements/components and use bootstrap components or You can use
            UI-Material design:
            https://mui.com/material-ui/gettingstarted/overview/
          </li>
          <li>
            You need to do following modifications for Delete api, not when you
            try to delete employee and if employee’s CurrentStatus is true you
            need to display message: “CAN’T DELETE EMPLOYEE – STATUS ACTIVE”
          </li>
          <li>
            Add one more tab (function), UpComing Retirement, this function will
            display all the employee whose retirement is coming in next six
            month. It is upto you how you want to implement it.
          </li>
          <li>
            You also need to add an extra filter so that user can filter
            employees with UpComing retirement based on their EmployeeType
            (Assume Retirement Age is 65 Yrs)
          </li>
          <li>
            Additional requirements if you are working in group of 3 people
          </li>
          <li>
            Modify Employee Details API, now when you click on the Employee
            Details, it will also display the no of Days, Months and Years left
            for the retirement. (ie Date of Joining 1st January 2001, Age at the
            time of Joining: 40 yrs, Retirement Date: 31st December 2025. So the
            no of days, months and years from today (20th July 2022) ={">"} 9
            days, 5 months, 3 years )
          </li>
        </ul>
        <p className="fw-bold">
          Summary: In this assignment, you will add more stuff into your
          project. Delete should not delete active employee. Filter Employees
          with UpComing retirement.
        </p>
      </div>
    </div>
  );
};

export default HomePage;
