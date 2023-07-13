const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasOne(models.Password, {
        foreignKey: 'userId',
        as: 'password',
      });
    }
  }

  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notEmpty: true,
      },
    },
  }, {
    sequelize,
    modelName: 'User',
  });

  User.sync();

  return User;
};