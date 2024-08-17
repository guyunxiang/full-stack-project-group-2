import React from "react";
import bannerImage from '../image/banner2.jpg';
import { Table } from "react-bootstrap";

const HomePage = () => {
  const bannerStyle = {
    backgroundImage: `url(${bannerImage})`,
    backgroundSize: 'contain', 
    backgroundPosition: 'center', 
    backgroundRepeat: 'no-repeat', 
    height: '400px',
    width: '100vw',
    margin: '0px',
    padding: '0px',
  };
  const theadStyle = {
    backgroundColor: 'purple',
    color: 'white',
  };
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
    {
      name: "David, Akhigbe",
      number: "8919368",
    },
  ];

  return (
    <div className="container">
      <h1>Welcome to visit Group 2 project</h1>
      <div style={bannerStyle} className="img-fluid my-4"></div>
      <hr />
      <Table striped bordered hover>
        <thead>
          <tr style={theadStyle}>
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
        
        
      </div>
    </div>
  );
};

export default HomePage;