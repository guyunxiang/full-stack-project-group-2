// import necessary modules
const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");

const fs = require("fs");
const path = require("path");

const connectDatabase = require("./dbconnect");
const resolvers = require("./resolvers");

// initialize an express application
const app = express();

// serve static files from the 'public' directory
app.use(express.static("public"));

// connect to mongodb
connectDatabase();

// read and parse the graphql schema from the schema.graphql file
const typeDefs = gql(
  fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf-8")
);

// create an Apollo Server instance with the schema and resolvers
const server = new ApolloServer({ typeDefs, resolvers });

async function startServer() {
  // start the Apollo Server
  await server.start();

  // apply the Apollo Server middleware to the Express app, setting the GraphQL endpoint
  server.applyMiddleware({ app, path: "/graphql" });

  // start the Express server on port 3000
  app.listen(4000, () => {
    console.log(`GraphQL server is running at http://localhost:4000/graphql`);
  });
}

// start the server and handle any errors that occur
startServer().catch((error) => {
  console.error("Server failed to start", error);
});
