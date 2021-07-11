const { decode } = require('./token')

const validatePermission = (token, requiredPermission) => {
  const { permission } = decode(token)
  return permission & requiredPermission
}

module.exports = {
  validatePermission,
}
