const Router = require('koa-router');

const register = require('./register.controller');
const login = require('./login.controller');
const validate = require('./validate.controller');

const prefix = `/api/auth`;

const router = new Router();
router.post(`${prefix}/register`, register);
router.post(`${prefix}/login`, login);

router.get(`${prefix}/validate`, validate);

module.exports = router;