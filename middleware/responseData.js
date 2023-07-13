module.exports = (ctx = {}, status = 200, info = '', data = null) => {
  ctx.status = status;
  ctx.body = {
    data,
    info,
    status,
  };
  return ctx.body;
}