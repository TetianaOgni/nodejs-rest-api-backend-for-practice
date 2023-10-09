const express = require('express')
const ctrl = require('../../controllers')
const {validateBody, isValidId, authenticate, upload} = require('../../middlewares')
const {schemas} = require('../../models/Contact')

const router = express.Router()

router.get('/', authenticate, ctrl.listContacts)

router.get('/:id', authenticate, isValidId, ctrl.getContactById)

router.post('/', upload.single('avatarUrl'), authenticate, validateBody(schemas.addSchema), ctrl.addContact)

router.delete('/:id', authenticate, isValidId, ctrl.removeContact)

router.put("/:id", authenticate, isValidId,  validateBody(schemas.addSchema), ctrl.updateContact);

router.patch('/:id/favorite', authenticate, isValidId, validateBody(schemas.updateFavoriteSchema), ctrl.updateStatusContact)

module.exports = router
