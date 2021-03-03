const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    id: Int!
    name: String!
    email: String!
    recipes: [Recipe!]!
  }
  type AuthPayload {
    token: String!
    user: User!
  }
  type Recipe {
    id: Int!
    title: String!
    direction: String!
    user: User!
    ingredients: [Ingredient]!
    createdAt: String!
  }
  type Ingredient {
    id: Int!
    name: String!
    ammount: String!
  }
  type Query {
    userMe: User
    user(id: Int!): User
    allRecipes: [Recipe!]!
    recipe(id: Int!): Recipe
  }
  input IngredientInput {
    name: String!
    ammount: String!
    recipe_id: Int!
  }
  type Mutation {
    login(email: String!, password: String!): AuthPayload!
    createUser(name: String!, email: String!, password: String!): User!
    createRecipe(userId: Int!, title: String!, direction: String!): Recipe!
    createIngredient(recipeId: Int!, name: String!, ammount: String): Ingredient!
    createMultipleIngredient(recipeId: Int!, ingredients: [IngredientInput!]!): [Ingredient!]!
  }
`;

module.exports = typeDefs;
