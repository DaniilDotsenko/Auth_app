
const env = require('dotenv').config();

if (env.error) {
  throw new Error(env.error.stack || env.message || env.error);
}

const Koa = require('koa');
const { bodyParser } = require("@koa/bodyparser");
const db = require('./database');

const auth = require('./routes/auth')
const app = new Koa();
db.createDbInstance();

app.use(bodyParser());
app.use(auth.routes())

app.listen(3000, function() {
  console.log('Server running...');
});