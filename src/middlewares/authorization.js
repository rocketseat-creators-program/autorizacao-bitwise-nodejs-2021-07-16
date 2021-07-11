const { validatePermission } = require('../services/authorization')

const extractToken = ctx => {
  const authorization = ctx.headers.authorization || ''
  return authorization.replace('Bearer ', '')
}

module.exports = requiredPermission =>
  async (ctx, next) => {
    const token = extractToken(ctx)

    if (!validatePermission(token, requiredPermission)) {
      /* eslint-disable prefer-promise-reject-errors */
      return Promise.reject({
        status: 403,
        message: 'Insufficient permission',
        code: 'FORBIDDEN',
      })
    }
    await next()
  }
