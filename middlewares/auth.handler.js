const boom = require('@hapi/boom')

const { config } = require('../config/config')

function checkApiKey(req, res, next) {
  const isApiKey = req.headers['api'] === config.apikey
  if (!isApiKey) {
    next(boom.unauthorized())
  }
  next()
}

function checkRoles(...roles) {
  return (req, res, next) => {
    const user = req.user
    if (!roles.includes(user.role)) {
      next(boom.unauthorized())
    }
    next()
  }
}

module.exports = { checkApiKey, checkRoles }
