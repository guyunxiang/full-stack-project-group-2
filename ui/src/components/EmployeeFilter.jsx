import React from "react";
import { Form } from "react-bootstrap";

import { EMPLOYEETYPES } from '../utils/const';


const employeeList = [].concat(EMPLOYEETYPES);
employeeList.unshift("All");

const EmployeeFilter = ({
  handleChange
}) => {

  return (
    <div className="d-flex align-items-center">
      <Form.Label htmlFor="type" className="form-label me-3 mb-0">
        Employee Type:
      </Form.Label>
      <Form.Group className="d-flex gap-3 ps-0 me-3">
        {employeeList.map((type, index) => (
          <div className="d-flex align-items-center w-75 gap-1 ps-0">
            <Form.Check
              type="radio"
              name="type"
              id={type}
              value={type}
              defaultChecked={!index}
              label={type}
              onChange={(e) => handleChange(e.target.value)}
            />
          </div>
        ))}
      </Form.Group>
    </div>
  )
}

export default EmployeeFilter;