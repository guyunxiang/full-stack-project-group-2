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
  },
  Mutation: {
    // insert employee into database via graphql
    addEmployee: async (_, data) => {
      try {
        const employee = new Employee(data);
        await employee.save();
        return employee;
      } catch (error) {
        throw new Error("Error adding employee");
      }
    },
    // update employee data
    updateEmployee: async (_, data) => {
      try {
        return await Employee.findByIdAndUpdate(data.id, data, {
          new: true,
        });
      } catch (error) {
        throw new Error("Error updating employee");
      }
    },
    // delete employee
    deleteEmployee: async (_, data) => {
      try {
        const { id } = data;
        return await Employee.findByIdAndDelete(id);
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
