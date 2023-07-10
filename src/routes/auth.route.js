const authController = require('../controllers/auth.controller')
const bodyMiddleware = require('../middlewares/body.validator')
const { registerValidator, loginValidator } = require('../validators/auth.validator')

const authRoute = require('express').Router()


authRoute.post('/register', bodyMiddleware(registerValidator), authController.register)
authRoute.post('/login', bodyMiddleware(loginValidator), authController.login)


module.exports = authRoute