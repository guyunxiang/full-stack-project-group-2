import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { TITLES, DEPARTMENTS, EMPLOYEETYPES } from "../utils/const";
import { toast } from "react-toastify";

const EmployeeDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [employeeData, setEmployeeData] = useState({});

  const [employeeTitle, setTitle] = useState("");
  const [department, setDepartment] = useState("");

  useEffect(() => {
    const fetchEmployeeDetail = async (id) => {
      if (!id) return;
      const requestBody = {
        query: `
        query GetEmployee($id: ID) {
          employee(id: $id) {
            id
            firstname
            lastname
            dob
            doj
            timeToRetirement
            title
            department
            type
            status
          }
        }
      `,
        variables: { id },
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
      const employeeData = data.data.employee;
      employeeData.doj = new Intl.DateTimeFormat("en-CA").format(
        new Date(+employeeData.doj)
      );
      employeeData.dob = new Intl.DateTimeFormat("en-CA").format(
        new Date(+employeeData.dob)
      );
      // update employee data
      setEmployeeData(employeeData);
      setTitle(employeeData.title);
      setDepartment(employeeData.department);
      // setStatus(employeeData.status);
    };
    fetchEmployeeDetail(id);
  }, [id]);

  const updateEmployee = async (data) => {
    const requestBody = {
      query: `
        mutation updateEmployee(
          $id: ID!
          $title: String!
          $department: String!
          $status: Int!
        ) {
          updateEmployee(
            id: $id
            title: $title
            department: $department
            status: $status
          ) {
            success
            message
          }
        }
      `,
      variables: { id, ...data },
    };
    const res = await fetch("/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
    if (!res.ok) {
      throw new Error("Failed to update employee data");
    }
    const { data: { updateEmployee } } = await res.json();
    if (!updateEmployee.success) {
      toast.error(updateEmployee.message);
      return;
    }
    toast.success("Update successfully!");
  };

  // on create a new employee
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {};

    formData.forEach((value, key) => {
      data[key] = value;
    });
    data.status = +data.status;
    updateEmployee(data);
  };

  if (!id) {
    navigate("/");
    return;
  }

  // render retirement info
  const renderRetirementInfo = () => {
    if (!employeeData.timeToRetirement) {
      return (
        <div>
          You are retired
          <hr />
        </div>
      )
    }
    const { years, months, days } = JSON.parse(employeeData.timeToRetirement || "{}");
    return (
      <div>
        Left for the retirement: &nbsp;
        {days > 0 && `${days} day${days > 1 ? 's' : ''}`}
        {years > 0 ? ', ' : months ? ' and ' : ''}
        {months > 0 && `${months} month${months > 1 ? 's' : ''}`}
        {(days > 0 || months > 0) && years > 0 ? ' and ' : ''}
        {years > 0 && `${years} year${years > 1 ? 's' : ''}`}
        <hr />
      </div>
    )
  }

  return (
    <div className="container">
      <h2 className="mb-3">Employee Detail</h2>
      <hr />
      {renderRetirementInfo()}
      <form className="row row-gap-3 form" onSubmit={handleSubmit}>
        <div className="col-12 col-xl-6 row align-items-center">
          <label htmlFor="firstname" className="w-25 form-label">
            First Name:
          </label>
          <input
            type="text"
            name="firstname"
            className="w-75 form-control"
            defaultValue={employeeData.firstname}
            disabled
          />
        </div>
        <div className="col-12 col-xl-6 row align-items-center">
          <label htmlFor="lastname" className="w-25 form-label">
            Last Name:
          </label>
          <input
            type="text"
            name="lastname"
            className="w-75 form-control"
            defaultValue={employeeData.lastname}
            disabled
          />
        </div>
        <div className="col-12 col-xl-6 row align-items-center">
          <label htmlFor="age" className="w-25">
            Date of Birth:
          </label>
          <input
            type="date"
            name="age"
            className="w-75 form-control"
            defaultValue={employeeData.dob}
            disabled
          />
        </div>
        <div className="col-12 col-xl-6 row align-items-center">
          <label htmlFor="doj" className="w-25 form-label">
            Date of Joining:
          </label>
          <input
            type="date"
            name="doj"
            className="w-75 form-control"
            defaultValue={employeeData.doj}
            disabled
          />
        </div>
        <div className="col-12 col-xl-6 row align-items-center">
          <label htmlFor="title" className="w-25 form-label">
            Title:
          </label>
          <div className="d-flex w-75 gap-3 ps-0">
            {TITLES.map((title, index) => (
              <label htmlFor={title} key={title} className="form-check-label">
                <input
                  type="radio"
                  name="title"
                  id={title}
                  value={title}
                  checked={title === employeeTitle}
                  onChange={() => {
                    setTitle(title);
                  }}
                  className="me-1 form-check-input"
                />
                {title}
              </label>
            ))}
          </div>
        </div>
        <div className="col-12 col-xl-6 row align-items-center">
          <label htmlFor="department" className="w-25 form-label">
            Department:
          </label>
          <select
            name="department"
            id="department"
            className="w-75 form-select"
            value={department}
            onChange={(e) => {
              setDepartment(e.target.value);
            }}
          >
            {DEPARTMENTS.map((department) => (
              <option key={department} value={department}>
                {department}
              </option>
            ))}
          </select>
        </div>
        <div className="col-12 col-xl-6 row align-items-center">
          <label htmlFor="type" className="w-25 form-label">
            Employee Type:
          </label>
          <div className="d-flex w-75 gap-3 ps-0">
            {EMPLOYEETYPES.map((type, index) => (
              <label htmlFor={type} key={type}>
                <input
                  type="radio"
                  name="type"
                  id={type}
                  value={type}
                  defaultChecked={employeeData.type}
                  className="me-1 form-check-input"
                  disabled
                />
                {type}
              </label>
            ))}
          </div>
        </div>
        <div className="col-12 col-xl-6 row align-items-center">
          <label htmlFor="status" className="w-25 form-label">
            Current Status:
          </label>
          <input
            type="number"
            name="status"
            className="w-75 form-control"
            defaultValue={employeeData.status}
          />
        </div>
        <div className="col-12 col-xl-6 row align-items-center">
          <input type="submit" value="Update" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
};

export default EmployeeDetailPage;
