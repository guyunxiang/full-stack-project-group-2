const mongoose = require("mongoose");

async function connectDB() {
  mongoose
    .connect(
      "mongodb+srv://ygu4492:ygu4492@assignment.sqrm2qb.mongodb.net/?retryWrites=true&w=majority&appName=Assignment",
      {
        useNewUrlParser: true,
      }
    )
    .then(() => {
      console.log("MongoDB connected");
    })
    .catch((error) => {
      console.error("MongoDB connection error:", error);
    });
}

module.exports = connectDB;