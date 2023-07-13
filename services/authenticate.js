async function authenticate(ctx, next) {
  try {
    const { 'x-access-token': accessToken } = ctx.request.headers;
    if (!accessToken) {
      return basic(ctx, statuses[401], sm.missingToken);
    }

    const decoded = await jwt.verify(accessToken, config.TOKENS.access.secret);
    const { accessImage = '', id = null } = decoded || {};
    if (!(accessImage && id)) {
      return basic(ctx, statuses[401], sm.invalidToken);
    }

    const redisImage = await get(id);
    if (redisImage && redisImage === accessImage) {
      ctx.id = id;
      return next();
    }

    const user = await db.Users.findOne({
      where: {
        id,
        accessImage,
        registrationCompleted: true,
        isDeleted: false,
      },
    });
    if (!user) {
      return basic(ctx, statuses[401], sm.accessDenied);
    }

    await set(user.id, user.accessImage);

    ctx.id = id;
    return next();
  } catch (err) {
    if (err.name && err.name === 'TokenExpiredError') {
      return basic(ctx, statuses[401], sm.tokenExpired);
    }

    return basic(ctx, statuses[401], sm.accessDenied);
  }
}

module.exports = authenticate;