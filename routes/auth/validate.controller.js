const jwt = require('jsonwebtoken');

const {
  OK,
  UNAUTHORIZED,
} = require('../../constants/responseStatuses');
const responseData = require('../../middleware/responseData')

async function validate(ctx) {
  try {
    const token = ctx.request.header.authorization.split(' ')[1];
    jwt.verify(token, process.env?.SECRET_KEY)
    return responseData(ctx, OK, 'Good token');
  } catch (error) {
    return responseData(ctx, UNAUTHORIZED, 'Bad token');
  }
};

module.exports = validate;