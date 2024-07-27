import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import EmployeeFilter from "../components/EmployeeFilter";

const EmployeeListPage = () => {
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
          employees(type: $type) {
            id
            firstname
            lastname
            dob
            doj
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
    setEmploeeData(data.data.employees);
  };

  useEffect(() => {
    fetchEmployeeList(employeeType);
  }, [employeeType]);

  const handleChange = (value) => {
    if (value === "All") {
      navigate("/");
      return;
    }
    navigate("/?employeeType=" + value, {
      state: { employeeType: value },
    });
  };

  const handleDeleteEmployee = async (id) => {
    const requestBody = {
      query: `
        mutation deleteEmployee($id: ID!) {
          deleteEmployee(id: $id) {
            success
            message
          }
        }
      `,
      variables: { id },
    };
    const res = await fetch("/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
    if (!res.ok) {
      throw new Error("Failed to delete employee");
    }
    const { data: { deleteEmployee } } = await res.json();
    if (!deleteEmployee.success) {
      toast.error(deleteEmployee.message);
      return;
    }
    toast.success("Delete successfully!");
    fetchEmployeeList(employeeType);
  };

  // render each column data
  const renderTd = (id, rowData) => {
    const tds = Object.keys(rowData).map((key) => {
      // format date of joining data
      if (key === 'doj') {
        const dateString = new Intl.DateTimeFormat("en-CA").format(
          new Date(+rowData[key])
        );
        return <td key={rowData[key]}>{dateString}</td>;
      }
      if (key === 'dob') {
        const age = new Date().getFullYear() - new Date(+rowData[key]).getFullYear();
        return <td key={rowData[key]}>{age}</td>;
      }
      return <td key={rowData[key]}>{rowData[key]}</td>;
    });
    tds.push(
      <td key={id} className="actions">
        <Link
          to={`/employee/${id}`}
          state={{ id }}
          className="text-primary me-3"
        >
          Update
        </Link>
        <span
          className="text-danger"
          onClick={() => {
            handleDeleteEmployee(id);
          }}
        >
          Delete
        </span>
      </td>
    );
    return tds;
  };

  // render each row data
  const renderTable = (tableData) => {
    // if no data, render "no data"
    if (!tableData) {
      return (
        <tr>
          <td colSpan="8" className="text-center text-secondary">
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
      <h2>Employee List</h2>
      <hr />
      <EmployeeFilter handleChange={handleChange} />
      <hr />
      <table className="table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Date of Joining</th>
            <th>Title</th>
            <th>Department</th>
            <th>EmployeeType</th>
            <th>CurrentStatus</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{renderTable(employeeData)}</tbody>
      </table>
    </div>
  );
};

export default EmployeeListPage;
