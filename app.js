require("dotenv").config();

const cors = require("cors");
const express = require("express");

const bodyParser = require("body-parser");
const { ApolloServer, makeExecutableSchema } = require("apollo-server-express");
const typeDefs = require("./src/schema/schema.js");
const resolvers = require("./src/resolvers/index.js");
const db = require("./models/index");

const app = express();

const { PORT } = process.env;

app.use(cors());

const server = new ApolloServer({ typeDefs, resolvers, context: { db } });

server.applyMiddleware({ app });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(PORT, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
