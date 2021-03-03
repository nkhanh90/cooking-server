const { ApolloServer } = require("apollo-server");
const jwt = require("jsonwebtoken");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const models = require("../models");

const getUser = (token) => {
  try {
    if (token) {
      return jwt.verify(token, "jwtsecret");
    }
    return null;
  } catch (error) {
    return null;
  }
};

const app = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization || "";

    return {
      user: getUser(token.replace("Bearer", "")),
      models,
    };
  },
});

const PORT = 789;
app.listen(PORT).then(() => console.log("Server is running on localhost:789"));
