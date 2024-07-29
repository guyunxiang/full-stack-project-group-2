import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Table } from "react-bootstrap";

import EmployeeFilter from "../components/EmployeeFilter";
import { STATUS } from "../utils/const";

const UpComingRetirement = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const employeeType = queryParams.get("employeeType");

  const [employeeData, setEmploeeData] = useState([]);

  // fetch employee data
  const fetchEmployeeList = async (employeeType) => {
    const requestBody = {
      query: `
        query GetEmployees($type: String) {
          upcomingRetirements(type: $type) {
            id
            firstname
            lastname
            dob
            doj
            retirementDate
            title
            department
            type
            status
          }
        }
      `,
      variables: {
        type: employeeType || null,
      },
    };

    // query employee data with graphql
    const res = await fetch("/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
    if (!res.ok) {
      throw new Error("Failed to fetch employee list");
    }
    const data = await res.json();
    // update employee data
    setEmploeeData(data.data.upcomingRetirements);
  };

  useEffect(() => {
    fetchEmployeeList(employeeType);
  }, [employeeType]);

  const handleChange = (value) => {
    if (value === "All") {
      navigate("/retirements");
      return;
    }
    navigate("/retirements?employeeType=" + value);
  };

  // render each column data
  const renderTd = (id, rowData) => {
    const tds = Object.keys(rowData).map((key) => {
      // format date of joining data
      if (key === 'dob') {
        const age = new Date().getFullYear() - new Date(+rowData[key]).getFullYear();
        const dateString = new Intl.DateTimeFormat("en-CA").format(
          new Date(+rowData[key])
        );
        return (
          <React.Fragment key={rowData[key]}>
            <td key={rowData[key]}>{age}</td>
            <td key={`${rowData[key]}-dob`}>{dateString}</td>
          </React.Fragment>
        );
      }
      if (key === 'doj' || key === 'retirementDate') {
        const dateString = new Intl.DateTimeFormat("en-CA").format(
          new Date(+rowData[key])
        );
        return <td key={rowData[key]}>{dateString}</td>;
      }
      if (key === "status") {
        return <td key={rowData[key]}>{STATUS[rowData[key]]}</td>;
      }
      return <td key={rowData[key]}>{rowData[key]}</td>;
    });
    return tds;
  };

  // render each row data
  const renderTable = (tableData) => {
    // if no data, render "no data"
    if (!tableData) {
      return (
        <tr>
          <td colSpan="10" className="text-center text-secondary">
            No data
          </td>
        </tr>
      );
    }
    return tableData.map(({ id, ...item }) => (
      <tr key={id}>{renderTd(id, item)}</tr>
    ));
  };
  return (
    <div className="EmployeeTable container">
      <h2>UpComing Retirement Employee List</h2>
      <hr />
      <EmployeeFilter handleChange={handleChange} />
      <hr />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>DOB</th>
            <th>DOJ</th>
            <th>Retirement Date</th>
            <th>Title</th>
            <th>Department</th>
            <th>EmployeeType</th>
            <th>CurrentStatus</th>
          </tr>
        </thead>
        <tbody>{renderTable(employeeData)}</tbody>
      </Table>
    </div>
  );
};

export default UpComingRetirement;
