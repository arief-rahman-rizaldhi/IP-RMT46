'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pokemon extends Model {
    static associate(models) {
      Pokemon.belongsTo(models.User);
    }
  }
  Pokemon.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "Unlucky you already have the pokemon!"
      },
      validate: {
        notNull: {
          msg: "Name is required"
        },
        notEmpty: {
          msg: "Name is required"
        },
      },
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Type is required"
        },
        notEmpty: {
          msg: "Type is required"
        },
      },
    },
    pokedex: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: {
        args: true,
        msg: "Pokedex must be unique"
      },
      validate: {
        notNull: {
          msg: "Pokedex is required"
        },
        notEmpty: {
          msg: "Pokedex is required"
        },
      },
    },
    attack: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Attack is required"
        },
        notEmpty: {
          msg: "Attack is required"
        },
      },
    },
    hp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "HP is required"
        },
        notEmpty: {
          msg: "HP is required"
        },
      },
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Weight is required"
        },
        notEmpty: {
          msg: "Weight is required"
        },
      },
    },
    height: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Height is required"
        },
        notEmpty: {
          msg: "Height is required"
        },
      },
    },
    captureRate: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Capture Rate is required"
        },
        notEmpty: {
          msg: "Capture Rate is required"
        },
      },
    },
    imagePokedex: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Image Pokedex is required"
        },
        notEmpty: {
          msg: "Image Pokedex is required"
        },
      },
    },
    imageBattleFront: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Image battle front side is required"
        },
        notEmpty: {
          msg: "Image battle front side is required"
        },
      },
    },
    imageBattleBack: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Image battle back side is required"
        },
        notEmpty: {
          msg: "Image battle back side is required"
        },
      },
    },
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        key: "id"
      },
      allowNull: false,
      validate: {
        notNull: {
          msg: "UserId is required"
        },
        notEmpty: {
          msg: "UserId is required"
        },
      },
    },
  }, {
    sequelize,
    modelName: 'Pokemon',
  });
  return Pokemon;
};