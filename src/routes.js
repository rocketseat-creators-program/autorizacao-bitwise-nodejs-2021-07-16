const Router = require('koa-router')

const { authorization: authorizationConfig } = require('../config')

// middlewares
const error = require('./middlewares/error')
const authenticated = require('./middlewares/auth')
const authorized = require('./middlewares/authorization')

// handlers
const users = require('./handlers/users')
const auth = require('./handlers/auth')

const permissions = authorizationConfig.permissions

const router = new Router()

router.use(error)

router.get('/users', authenticated, authorized(permissions.manageUsers), users.getAllUsers)
router.post('/users', authenticated, users.createUser)

router.get('/exams', authenticated, authorized(permissions.getExams), async (ctx, next) => {
  ctx.body = { Glicemia: 90 }
  await next()
})

router.get('/personal', authenticated, authorized(permissions.getPersonalInfo), async (ctx, next) => {
  ctx.body = { Nome: 'André' }
  await next()
})

router.get('/medicines', authenticated, authorized(permissions.getMedicines), async (ctx, next) => {
  ctx.body = { Dipirona: '10ml' }
  await next()
})

router.post('/auth', auth.authenticate)

module.exports = router
