const express = require('express')
const controllers = require('../../controllers/contacts')
const {validateBody, isValidId} = require('../../middlewares')
const {schemas} = require('../../models/Contact')

const router = express.Router()

router.get('/', controllers.listContacts)

router.get('/:id', isValidId, controllers.getContactById)

router.post('/', validateBody(schemas.addSchema), controllers.addContact)

router.delete('/:id', isValidId, controllers.removeContact)

router.put("/:id", isValidId,  validateBody(schemas.addSchema), controllers.updateContact);

router.patch('/:id/favorite', isValidId, validateBody(schemas.updateFavoriteSchema), controllers.updateFavorite)

module.exports = router
