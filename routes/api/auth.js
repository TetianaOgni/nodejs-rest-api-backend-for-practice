const express = require('express')
const ctrlRegister = require('../../controllers')
const ctrlLogin = require('../../controllers')
const ctrlCurrent = require('../../controllers')
const ctrlLogout = require('../../controllers')

const {validateBody, authenticate} = require('../../middlewares')
const {schemas} = require('../../models/user')

const router = express.Router()

router.post('/register', validateBody(schemas.registerSchema), ctrlRegister.register)

router.post('/login', validateBody(schemas.loginSchema), ctrlLogin.login)

router.get('/current', authenticate, ctrlCurrent.getCurrent)

router.post('/logout', authenticate, ctrlLogout.logout)

module.exports = router 