import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

import { TITLES, DEPARTMENTS, EMPLOYEETYPES, STATUS } from "../utils/const";
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
    const {
      data: { updateEmployee },
    } = await res.json();
    if (!updateEmployee.success) {
      toast.error(updateEmployee.message);
      return;
    }
    toast.success("Update successfully!");
    navigate("/employees");
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
      );
    }
    const { years, months, days } = JSON.parse(
      employeeData.timeToRetirement || "{}"
    );
    return (
      <div>
        Left for the retirement: &nbsp;
        {days > 0 && `${days} day${days > 1 ? "s" : ""}`}
        {years > 0 ? ", " : months ? " and " : ""}
        {months > 0 && `${months} month${months > 1 ? "s" : ""}`}
        {(days > 0 || months > 0) && years > 0 ? " and " : ""}
        {years > 0 && `${years} year${years > 1 ? "s" : ""}`}
        <hr />
      </div>
    );
  };

  // console.log(employeeData);

  return (
    <div className="container">
      <h2 className="mb-3">Employee Detail</h2>
      <hr />
      {renderRetirementInfo()}
      <Form className="row row-gap-3 form" onSubmit={handleSubmit}>
        <Form.Group className="col-12 col-xl-6 row align-items-center">
          <Form.Label className="w-25">First Name:</Form.Label>
          <Form.Control
            type="text"
            name="firstname"
            className="w-75"
            defaultValue={employeeData.firstname}
            disabled
          />
        </Form.Group>
        <Form.Group className="col-12 col-xl-6 row align-items-center">
          <Form.Label className="w-25">Last Name:</Form.Label>
          <Form.Control
            type="text"
            name="lastname"
            className="w-75"
            defaultValue={employeeData.lastname}
            disabled
          />
        </Form.Group>
        <Form.Group className="col-12 col-xl-6 row align-items-center">
          <Form.Label className="w-25">Date of Birth:</Form.Label>
          <Form.Control
            type="date"
            name="age"
            className="w-75"
            defaultValue={employeeData.dob}
            disabled
          />
        </Form.Group>
        <Form.Group className="col-12 col-xl-6 row align-items-center">
          <Form.Label className="w-25">Date of Joining:</Form.Label>
          <Form.Control
            type="date"
            name="doj"
            className="w-75"
            defaultValue={employeeData.doj}
            disabled
          />
        </Form.Group>
        <Form.Group className="col-12 col-xl-6 row align-items-center">
          <Form.Label className="w-25">Title:</Form.Label>
          <div className="d-flex w-75 gap-3 ps-0">
            {TITLES.map((title, index) => (
              <Form.Check
                key={title}
                type="radio"
                name="title"
                id={title}
                value={title}
                label={title}
                checked={title === employeeTitle}
                onChange={() => {
                  setTitle(title);
                }}
                className="me-1"
              />
            ))}
          </div>
        </Form.Group>
        <Form.Group className="col-12 col-xl-6 row align-items-center">
          <Form.Label className="w-25">Department:</Form.Label>
          <Form.Select
            name="department"
            id="department"
            className="w-75"
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
          </Form.Select>
        </Form.Group>
        <Form.Group className="col-12 col-xl-6 row align-items-center">
          <Form.Label className="w-25">Employee Type:</Form.Label>
          <div className="d-flex w-75 gap-3 ps-0">
            {EMPLOYEETYPES.map((type) => (
              <Form.Check
                key={type}
                type="radio"
                name="type"
                id={type}
                value={type}
                label={type}
                defaultChecked={employeeData.type}
                className="me-1"
                disabled
              />
            ))}
          </div>
        </Form.Group>
        <Form.Group className="col-12 col-xl-6 row align-items-center">
          <Form.Label className="w-25">Current Status:</Form.Label>
          <Form.Select
            type="select"
            name="status"
            className="w-75"
            value={employeeData.status}
            onChange={(e) =>
              setEmployeeData({
                ...employeeData,
                status: +e.target.value,
              })
            }
          >
            {Object.keys(STATUS).map((key) => (
              <option key={key} value={key}>
                {STATUS[key]}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <div className="col-12 col-xl-6 row align-items-center">
          <Button type="submit" variant="primary">
            Update
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default EmployeeDetailPage;
