const bcrypt = require('bcrypt');

const { Model } = require('sequelize');

const SALT_ROUNDS = 10;

module.exports = (sequelize, DataTypes) => {
  class Password extends Model {
    static associate(models) {
      Password.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
      });
    }
  }

  Password.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    hash: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  }, {
    sequelize,
    modelName: 'Password',
  });

  Password.beforeSave(async (password) => {
    if (password.hash) {
      password.hash = await bcrypt.hash(password.hash, SALT_ROUNDS);
    }
  });

  Password.prototype.comparePassword = function compare(password) {
    return new Promise((res, rej) => {
      bcrypt.compare(password, this.hash, (err, isMatch) => {
        if (err) {
          return rej(err);
        }
        return res(isMatch);
      });
    });
  };

  Password.sync();

  return Password;
};