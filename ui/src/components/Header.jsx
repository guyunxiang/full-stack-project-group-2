import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="mb-3 py-3" style={{ backgroundColor: "#f5f5f5" }}>
      <div className="container d-flex justify-content-between">
        <div>
          <Link to="/">Group 2</Link>
        </div>
        <nav>
          <ul className="d-flex gap-3 m-0 p-0" style={{ listStyle: "none" }}>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/retirement">UpComing Retirement</Link>
            </li>
            <li>
              <Link to="/add">Add Employee</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
