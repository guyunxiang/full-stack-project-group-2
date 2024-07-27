const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  doj: Date,
  dob: Date,
  title: String,
  department: String,
  type: String,
  status: {
    type: Number,
    required: true,
    default: 1
    // 1 = Active
    // 2 = On Leave
    // 3 = Sick Leave
    // 4 = Suspended
    // 5 = Terminated
  },
});

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
