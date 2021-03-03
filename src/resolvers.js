const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const resolvers = {
  Query: {
    async user(root, { id }, { models }) {
      return models.User.findByPk(id, { raw: true });
    },
    async allRecipes(root, args, { models, user }) {
      try {
        if (!user) throw new Error("You are not authenticated!");
        return models.Recipe.findAll();
      } catch (error) {
        throw new Error(error.message);
      }
    },
    async recipe(root, { id }, { models, user }) {
      try {
        if (!user) throw new Error("You are not authenticated!");
        return models.Recipe.findByPk(id, { raw: true });
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
  Mutation: {
    login: async (_, { email, password }, { models }) => {
      try {
        const user = await models.User.findOne({ where: { email } });
        if (!user) {
          throw new Error("No user with that email");
        }
        const isValid = password === user.password; // bcrypt.compare(password, user.password);
        if (!isValid) {
          throw new Error("Incorrect password");
        }
        // return jwt
        const token = jwt.sign({ id: user.id, email: user.email }, "jwtsecret", {
          expiresIn: "1d",
        });
        return {
          token,
          user,
        };
      } catch (error) {
        throw new Error(error.message);
      }
    },
    createUser: async (root, { name, email, password }, { models }) => {
      try {
        if (!user) throw new Error("You are not authenticated!");
        return models.User.create({
          name,
          email,
          password: await bcrypt.hash(password, 10),
        });
      } catch (error) {
        throw new Error(error.message);
      }
    },
    createRecipe: async (root, { userId, title, direction }, { models }) => {
      try {
        if (!user) throw new Error("You are not authenticated!");
        return models.Recipe.create({ user_id: userId, title, direction });
      } catch (error) {
        throw new Error(error.message);
      }
    },
    createIngredient: async (root, { recipeId, name, ammount }, { models }) => {
      try {
        if (!user) throw new Error("You are not authenticated!");
        return models.Ingredient.create({ recipe_id: recipeId, name, ammount });
      } catch (error) {
        throw new Error(error.message);
      }
    },
    createMultipleIngredient: async (root, { recipeId, ingredients }, { models }) => {
      try {
        if (!user) throw new Error("You are not authenticated!");
        return models.Ingredient.bulkCreate(
          ingredients.map((it) => ({
            ...it,
            recipe_id: recipeId,
          }))
        );
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
  User: {
    async recipes(user) {
      return user.getRecipes();
    },
  },
  Recipe: {
    async user(recipe) {
      return recipe.getUser();
    },
    async ingredients(recipe) {
      return recipe.getIngredients();
    },
  },
};

module.exports = resolvers;
