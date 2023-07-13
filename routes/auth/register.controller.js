const { db } = require('../../database');
const { CREATED, BAD_REQUEST } = require('../../constants/responseStatuses');
const { NOT_ALL_DATA, USER_EXISTS, INVALID_EMAIL } = require('../../constants/responseMessages');
const { createToken } = require('../../helpers/createToken');
const responseData = require('../../middleware/responseData')

const register = async (ctx) => {
  try {
    const {
      email = '',
      password = '',
    } = ctx.request.body;

    const data = {
      email: email.toString().trim(),
      password: password.toString().trim(),
    };

    if (!data.email || !data.password) {
      return responseData(ctx, BAD_REQUEST, NOT_ALL_DATA);
    }

    const existUser = await db.User.findOne({ where: { email: data.email } });

    if (existUser) {
      return responseData(ctx, BAD_REQUEST, USER_EXISTS);
    }

    await db.sequelize.transaction(async (t) => {
      const newUser = await db.User.create(data, { transaction: t });
      await db.Password.create({ hash: data.password, userId: newUser.id }, { transaction: t });

      const token = createToken(newUser.id);

      return responseData(ctx, CREATED, 'User created!', { newUser, token });
    });
  } catch (error) {
    console.error(error)
    if (error.name === 'SequelizeValidationError') {
      return responseData(ctx, BAD_REQUEST, INVALID_EMAIL);
    }

    return responseData(ctx, BAD_REQUEST, error.message);
  }
};

module.exports = register;
