const express = require('express')
const ctrl1 = require('../../controllers/auth/register')
const ctrl2 = require('../../controllers/auth/login')


const {validateBody} = require('../../middlewares')
const {schemas} = require('../../models/user')

const router = express.Router()

router.post('/register', validateBody(schemas.registerSchema), ctrl1.register)

router.post('/login', validateBody(schemas.loginSchema), ctrl2.login)

module.exports = router