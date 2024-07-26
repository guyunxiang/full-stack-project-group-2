import React from "react";

import { EMPLOYEETYPES } from '../utils/const';


const employeeList = [].concat(EMPLOYEETYPES);
employeeList.unshift("All");

const EmployeeFilter = ({
  handleChange
}) => {

  return (
    <div className="d-flex align-items-center">
      <label htmlFor="type" className="form-label me-3 mb-0">
        Employee Type:
      </label>
      <div className="d-flex gap-3 ps-0 me-3">
        {employeeList.map((type, index) => (
          <label htmlFor={type} key={type}>
            <input
              type="radio"
              name="type"
              id={type}
              value={type}
              defaultChecked={!index}
              onChange={(e) => handleChange(e.target.value)}
              className="me-1 form-check-input"
            />
            {type}
          </label>
        ))}
      </div>
    </div>
  )
}

export default EmployeeFilter;