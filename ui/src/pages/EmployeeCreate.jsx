import React, { useRef, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";

import { TITLES, DEPARTMENTS, EMPLOYEETYPES } from "../utils/const";

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

    const age = new Date().getFullYear() - new Date(formData.dob).getFullYear();
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
          $doj: String!
          $dob: String!
          $title: String!
          $department: String!
          $type: String!
          $status: Int!
        ) {
          addEmployee(
            firstname: $firstname
            lastname: $lastname
            doj: $doj
            dob: $dob
            title: $title
            department: $department
            type: $type
            status: $status
          ) {
            success
            message
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
    const { data: { addEmployee } } = await res.json();
    if (!addEmployee.success) {
      toast.error(addEmployee.message);
      return;
    }
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


  // default date of joining
  const defaultDateOfJoining = new Intl.DateTimeFormat("en-CA").format(
    new Date()
  );

  return (
    <div className="container">
      <h2 className="mb-3">Add an employee</h2>
      <hr />
      {
        errors.length > 0 && (
          <div className="alert alert-danger">
            {errors.map((error) => (
              <p className="m-0" key={error}>
                {error}
              </p>
            ))}
          </div>
        )
      }
      <Form className="row row-gap-3 form" ref={formRef} onSubmit={handleSubmit}>
        <Form.Group className="col-12 col-xl-6 row align-items-center" controlId="firstName">
          <Form.Label className="w-25 form-label">
            First Name:
          </Form.Label>
          <Form.Control type="text" name="firstname" className="w-75 form-control" />
        </Form.Group>
        <Form.Group className="col-12 col-xl-6 row align-items-center" controlId="lastName">
          <Form.Label className="w-25 form-label">
            Last Name:
          </Form.Label>
          <Form.Control type="text" name="lastname" className="w-75 form-control" />
        </Form.Group>
        <Form.Group className="col-12 col-xl-6 row align-items-center" controlId="age">
          <Form.Label className="w-25">
            Date of Birth:
          </Form.Label>
          <Form.Control
            type="date"
            name="dob"
            className="w-75 form-control"
            defaultValue={defaultDateOfJoining}
          />
        </Form.Group>
        <Form.Group className="col-12 col-xl-6 row align-items-center" controlId="doj">
          <Form.Label className="w-25 form-label">
            Date of Joining:
          </Form.Label>
          <Form.Control
            type="date"
            name="doj"
            className="w-75 form-control"
            defaultValue={defaultDateOfJoining}
          />
        </Form.Group>
        <Form.Group className="col-12 col-xl-6 row align-items-center" controlId="title">
          <Form.Label className="w-25 form-label">
            Title:
          </Form.Label>
          <div className="d-flex w-75 gap-3 ps-0">
            {TITLES.map((title, index) => (
              <Form.Check
                key={title}
                type="radio"
                name="title"
                id={title}
                value={title}
                defaultChecked={!index}
                label={title}
              />
            ))}
          </div>
        </Form.Group>
        <Form.Group className="col-12 col-xl-6 row align-items-center" controlId="department">
          <Form.Label className="w-25 form-label">
            Department:
          </Form.Label>
          <Form.Select name="department" className="w-75 form-select">
            {DEPARTMENTS.map((department) => (
              <option key={department} value={department}>
                {department}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="col-12 col-xl-6 row align-items-center" controlId="type">
          <Form.Label className="w-25 form-label">
            Employee Type:
          </Form.Label>
          <div className="d-flex w-75 gap-3 ps-0">
            {EMPLOYEETYPES.map((type, index) => (
              <Form.Check
                key={type}
                type="radio"
                name="type"
                id={type}
                value={type}
                defaultChecked={!index}
                label={type}
              />
            ))}
          </div>
        </Form.Group>
        <Form.Group className="col-12 col-xl-6 row align-items-center" controlId="status">
          <Form.Label className="w-25 form-label">
            Current Status:
          </Form.Label>
          <Form.Control
            type="number"
            name="status"
            className="w-75 form-control"
            defaultValue={1}
            disabled
          />
        </Form.Group>
        <div className="col-12 col-xl-6 row align-items-center">
          <Button type="submit" className="btn btn-primary">
            Add an Employee
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default EmployeeCreatePage;
