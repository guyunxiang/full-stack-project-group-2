const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  age: Number,
  doj: Date,
  title: String,
  department: String,
  type: String,
  status: Number,
});

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
