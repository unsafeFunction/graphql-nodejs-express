require("dotenv").config();

const cors = require("cors");
const express = require("express");
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");

const bodyParser = require("body-parser");
const { ApolloServer } = require("apollo-server-express");
const { applyMiddleware } = require("graphql-middleware");
const { buildFederatedSchema } = require("@apollo/federation");
const { mergeTypeDefs } = require("@graphql-tools/merge");
const typeDefs = require("./src/schema/schema.js");
const resolvers = require("./src/resolvers/index.js");
const db = require("./models/index");
const { permissions } = require("./src/middleware/permissionMiddleware");

const app = express();

const { PORT } = process.env;

// app.use(cors());
// const authMiddleware = jwt({
//   secret: jwksRsa.expressJwtSecret({
//     cache: true,
//     rateLimit: true,
//     jwksRequestsPerMinute: 5,
//     jwksUri: `https://YOUR_AUTH0_DOMAIN/.well-known/jwks.json`
//   }),
//   // validate the audience and the issuer.
//   audience: "{YOUR_API_IDENTIFIER}",
//   issuer: `https://YOUR_AUTH0_DOMAIN/`,
//   algorithms: ["RS256"],
//   credentialsRequired: false
// });

// app.use(authMiddleware);

const server = new ApolloServer({
  schema: applyMiddleware(
    buildFederatedSchema([{ typeDefs: mergeTypeDefs(typeDefs), resolvers }]),
    permissions
  ),
  context: ({ req }) => {
    const user = req.headers.user ? JSON.parse(req.headers.user) : null;
    return { user, db };
  }
});

// server.applyMiddleware({ app });

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

app.listen(PORT, () =>
  console.log(`🚀 Server ready at http://localhost:${process.env.PORT}`)
);
