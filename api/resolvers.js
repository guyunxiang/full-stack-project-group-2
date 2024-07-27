const Employee = require("./models/employee");

const resolvers = {
  Query: {
    // query employee list api
    employees: async (_, { type }) => {
      try {
        // if search value is empty, return all employee data
        if (!type) {
          return await Employee.find();
        }
        // query condition for age or others
        const queryCondition = {
          type: { $regex: type, $options: "i" },
        };
        // return filter result
        return await Employee.find(queryCondition);
      } catch (error) {
        console.log("Error fetching employee list", error);
      }
    },
    // query employee by id
    employee: async (_, { id }) => {
      try {
        return await Employee.findById(id);
      } catch (error) {
        console.log("Error fetching employee", error);
      }
    },
    // query upcoming retirement employee
    upcomingRetirements: async () => {
      try {
        const currentDate = new Date();
        const retirementDate = new Date(currentDate.setFullYear(currentDate.getFullYear() + 60));
        return await Employee.find({
          doj: { $lt: retirementDate },
        });
      } catch (error) {
        console.log("Error fetching upcoming retirement employee", error);
      }
    }
  },
  Mutation: {
    // insert employee into database via graphql
    addEmployee: async (_, data) => {
      try {
        // create new employee
        const employee = new Employee(data);
        // save employee data
        await employee.save();
        return {
          success: true,
          message: "Employee added successfully",
        };
      } catch (error) {
        throw new Error("Error adding employee");
      }
    },
    // update employee data
    updateEmployee: async (_, data) => {
      try {
        const { id, status } = data;
        // if employee id not found
        if (!id) {
          return {
            success: false,
            message: "Employee id not found",
          };
        }
        //
        if (status < 1 || status > 5) {
          return {
            success: false,
            message: "Invalid status value",
          };
        }
        // find employee by id and update
        await Employee.findByIdAndUpdate(data.id, data, {
          new: true,
        });
        return {
          success: true,
          message: "Employee updated successfully",
        };
      } catch (error) {
        throw new Error("Error updating employee");
      }
    },
    // delete employee
    deleteEmployee: async (_, data) => {
      try {
        const { id } = data;
        const employee = await Employee.findById(id);
        // if employee not found
        if (!employee) {
          return {
            success: false,
            message: "Employee not found",
          };
        }
        // if employee status is active
        if (employee.status === 1) {
          return {
            success: false,
            message: "Can't delete employee - current status active"
          };
        }
        // delete employee
        await Employee.findByIdAndDelete(id);
        return {
          success: true,
          message: "Employee deleted successfully",
        };
      } catch (error) {
        throw new Error("Error deleting employee");
      }
    },
  },
  Employee: {
    id: (employee) => employee._id.toString(),
  },
};

module.exports = resolvers;
