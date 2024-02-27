"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Rent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Rent.belongsTo(models.User);
    }
  }
  Rent.init(
    {
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "UserId cannot be empty",
          },
          notNull: {
            args: true,
            msg: "UserId cannot be null",
          },
        },
      },

      imageUrl: DataTypes.STRING,
      animeTitle: DataTypes.STRING,
      animeId: DataTypes.INTEGER,
      orderId: DataTypes.INTEGER,
      timeRemaining: DataTypes.FLOAT,
      duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Duration cannot be empty",
          },
          notNull: {
            args: true,
            msg: "Duration cannot be null",
          },
        },
      },
      paid: DataTypes.BOOLEAN,
      expired: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Rent",
      hooks: {
        beforeCreate(user) {
          user.paid = false;
          user.expired = false;
        },
      },
    }
  );
  return Rent;
};
