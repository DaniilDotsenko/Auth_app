const { db } = require('../../database');
const {
  OK,
  BAD_REQUEST,
  UNAUTHORIZED,
} = require('../../constants/responseStatuses');
const {
  NOT_ALL_DATA,
  INVALID_DATA,
} = require('../../constants/responseMessages');
const responseData = require('../../middleware/responseData')
const { createToken } = require('../../helpers/createToken');

async function login(ctx) {
  try {
    const {
      email,
      password,
    } = ctx.request.body;

    if (!email.trim() || !password) {
      return responseData(ctx, BAD_REQUEST, NOT_ALL_DATA);
    }

    const existUser = await db.User.findOne({
      where: { email },
      attributes: ['id'],
    });

    if (!existUser) {
      return responseData(ctx, UNAUTHORIZED, INVALID_DATA);
    }

    const passwordExistUser = await db.Password.findOne({
      where: { userId: existUser.dataValues.id },
      attributes: ['hash'],
    });

    const isPasswordValid = await passwordExistUser.comparePassword(password);

    if (!isPasswordValid) {
      return responseData(ctx, UNAUTHORIZED, INVALID_DATA);
    }

    const token = createToken(existUser.id);

    return responseData(ctx, OK, 'Logged in!', { existUser, token });
  } catch (error) {
    return responseData(ctx, BAD_REQUEST, error.message);
  }
};

module.exports = login;