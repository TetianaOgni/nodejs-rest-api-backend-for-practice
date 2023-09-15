const express = require('express')
const controllers = require('../../controllers/contacts')
const {validateBody, isValidId, authenticate} = require('../../middlewares')
const {schemas} = require('../../models/Contact')

const router = express.Router()

router.get('/', authenticate, controllers.listContacts)

router.get('/:id', authenticate, isValidId, controllers.getContactById)

router.post('/', authenticate, validateBody(schemas.addSchema), controllers.addContact)

router.delete('/:id', authenticate, isValidId, controllers.removeContact)

router.put("/:id", authenticate, isValidId,  validateBody(schemas.addSchema), controllers.updateContact);

router.patch('/:id/favorite', authenticate, isValidId, validateBody(schemas.updateFavoriteSchema), controllers.updateFavorite)

module.exports = router
