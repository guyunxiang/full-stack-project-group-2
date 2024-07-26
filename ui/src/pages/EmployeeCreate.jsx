import React, { useRef, useState } from "react";

import { TITLES, DEPARTMENTS, EMPLOYEETYPES } from "../utils/const";
import { toast } from "react-toastify";

const EmployeeCreatePage = () => {
  const formRef = useRef(null);
  const [errors, setErrors] = useState([]);

  // validate form field
  const formValidation = (formData) => {
    const newErrors = [];

    if (!formData.firstname.trim()) {
      newErrors.push("First Name is required");
    }

    if (!formData.lastname.trim()) {
      newErrors.push("Last Name is required");
    }

    const age = parseInt(formData.age);
    if (isNaN(age) || age < 20 || age > 70) {
      newErrors.push("Age must be between 20 and 70");
    }

    if (!formData.doj) {
      newErrors.push("Date of Joining is required");
    }

    return newErrors;
  };

  // add an employee
  const addEmployee = async (formData) => {
    const requestBody = {
      query: `
        mutation addEmployee(
          $firstname: String!
          $lastname: String!
          $age: Int!
          $doj: String!
          $title: String!
          $department: String!
          $type: String!
          $status: Int!
        ) {
          addEmployee(
            firstname: $firstname
            lastname: $lastname
            age: $age
            doj: $doj
            title: $title
            department: $department
            type: $type
            status: $status
          ) {
            id
            firstname
            lastname
            age
            doj
            title
            department
            type
            status
          }
        }
      `,
      variables: formData,
    };
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
    await res.json();
    toast.success("Create employee successfully!");
    formRef.current.reset();
  };

  // on create a new employee
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {};

    formData.forEach((value, key) => {
      data[key] = value;
    });

    // validate form data
    const newErrors = formValidation(data);
    // update errors
    setErrors(newErrors);
    // if find error, return
    if (newErrors.length) {
      return;
    }
    // set age and status to int type
    data.age = parseInt(data.age);
    data.status = 1;
    addEmployee(data);
  };

  // render error message
  const renderErrorMessage = () => {
    if (!errors.length) return null;
    return (
      <div className="alert alert-danger">
        {errors.map((error) => (
          <p className="m-0" key={error}>
            {error}
          </p>
        ))}
      </div>
    );
  };

  // default date of joining
  const defaultDateOfJoining = new Intl.DateTimeFormat("en-CA").format(
    new Date()
  );

  return (
    <div className="container">
      <h2 className="mb-3">Add an employee</h2>
      <hr />
      {renderErrorMessage()}
      <form
        className="row row-gap-3 form"
        ref={formRef}
        onSubmit={handleSubmit}
      >
        <div className="col-12 col-xl-6 row align-items-center">
          <label htmlFor="firstname" className="w-25 form-label">
            First Name:
          </label>
          <input type="text" name="firstname" className="w-75 form-control" />
        </div>
        <div className="col-12 col-xl-6 row align-items-center">
          <label htmlFor="lastname" className="w-25 form-label">
            Last Name:
          </label>
          <input type="text" name="lastname" className="w-75 form-control" />
        </div>
        <div className="col-12 col-xl-6 row align-items-center">
          <label htmlFor="age" className="w-25">
            Age:
          </label>
          <input type="number" name="age" className="w-75 form-control" />
        </div>
        <div className="col-12 col-xl-6 row align-items-center">
          <label htmlFor="doj" className="w-25 form-label">
            Date of Joining:
          </label>
          <input
            type="date"
            name="doj"
            className="w-75 form-control"
            defaultValue={defaultDateOfJoining}
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
                  defaultChecked={!index}
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
                  defaultChecked={!index}
                  className="me-1 form-check-input"
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
            defaultValue={1}
            disabled
          />
        </div>
        <div className="col-12 col-xl-6 row align-items-center">
          <input
            type="submit"
            value="Add an Employee"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
};

export default EmployeeCreatePage;
