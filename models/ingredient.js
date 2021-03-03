"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Ingredient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Ingredient.belongsTo(models.Recipe, { foreignKey: "recipe_id" });
    }
  }
  Ingredient.init(
    {
      name: DataTypes.STRING,
      ammount: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Ingredient",
    }
  );
  return Ingredient;
};
