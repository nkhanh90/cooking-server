"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Recipe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Recipe.belongsTo(models.User, { foreignKey: "user_id" });
      Recipe.hasMany(models.Ingredient, { foreignKey: "recipe_id" });
    }
  }
  Recipe.init(
    {
      title: DataTypes.STRING,
      direction: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Recipe",
    }
  );
  return Recipe;
};
