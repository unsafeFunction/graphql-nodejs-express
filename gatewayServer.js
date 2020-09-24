require("dotenv").config();

const { ApolloGateway, RemoteGraphQLDataSource } = require("@apollo/gateway");
const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const expressJwt = require("express-jwt");
const cors = require("cors");
const bodyParser = require("body-parser");

const port = 4000;
const app = express();

app.use(cors());
app.use(
  expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
    credentialsRequired: false
  })
);

const gateway = new ApolloGateway({
  serviceList: [{ name: "user", url: "http://localhost:3001" }],
  buildService({ name, url }) {
    return new RemoteGraphQLDataSource({
      url,
      willSendRequest({ request, context }) {
        request.http.headers.set(
          "user",
          context.user ? JSON.stringify(context.user) : null
        );
      }
    });
  }
});

const server = new ApolloServer({
  gateway,
  subscriptions: false,
  context: ({ req }) => {
    const user = req.user || null;
    return { user };
  }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

server.applyMiddleware({ app });

app.listen({ port }, () =>
  console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`)
);
