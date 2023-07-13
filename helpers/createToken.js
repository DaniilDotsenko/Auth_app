const jwt = require('jsonwebtoken');

module.exports.createToken = (id) => jwt.sign(id, process.env?.SECRET_KEY);