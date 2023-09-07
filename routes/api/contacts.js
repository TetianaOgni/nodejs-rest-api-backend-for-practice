const express = require('express')
const controllers = require('../../controllers/contacts')
const router = express.Router()
const {validateBody} = require('../../middlewares')
const schemas = require('../../schemas/contacts')

router.get('/', controllers.listContacts)

// router.get('/:id', controllers.getContactById)

// router.post('/', validateBody(schemas.addSchema), controllers.addContact)

// router.delete('/:id', controllers.removeContact)

// router.put('/:id', validateBody(schemas.addSchema), controllers.updateContact)

module.exports = router
