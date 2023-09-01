const express = require('express')
// const Joi = require('joi')
// const contacts = require('../../models/contacts')
// const {HttpError }= require('../../helpers')

const controllers = require('../../controllers/contacts')
// const { listContacts } = require('../../models/contacts')

const router = express.Router()

const {validateBody} = require('../../middlewares')

const schemas = require('../../schemas/contacts')

// const addSchema = Joi.object({
//   name: Joi.string().required(),
//   email: Joi.string().required(),
//   phone: Joi.string().required(),
// })

router.get('/',
controllers.listContacts
//  async (req, res, next) => {
  // try{
  //   const result = await contacts.listContacts()
  //   res.json(result)
  // }
  // catch(error){
  //   next(error)
  // }}
  )

router.get('/:id',
controllers.getContactById
//  async (req, res, next) => {
//   console.log(req.params)
//   try{
//     const {id} = req.params
//     const result = await contacts.getContactById(id)
//     if (!result){
//       throw HttpError(404, 'Not found')
//     }
//     res.json(result) 
//   }
//   catch(error){
//     next(error)
//   }}
  )

router.post('/', 
validateBody(schemas.addSchema),
controllers.addContact
// async (req, res, next) => {
//   try{
//     const {error} = addSchema.validate(req.body)
//     if (error){
//       throw HttpError(400, 'missing required name field')
//     }
//     const result = await contacts.addContact(req.body)
//     res.status(201).json(result)
//   }catch(error){
//     next(error)
//   }}
  )

router.delete('/:id', 
controllers.removeContact
//  async (req, res, next) => {
//   try {
//     const {id} = req.params
//     const result = await contacts.removeContact(id)
//     if (!result){
//       throw HttpError(404, 'Not found')
//     }
//     res.json({
//       message: 'contact delete'
//     })
//   } catch (error) {
//     next(error)
//   }}
  )

router.put('/:id', 
validateBody(schemas.addSchema),
controllers.updateContact
// async (req, res, next) => {
//   try {
//     const {error} = addSchema.validate(req.body)
//     if (error){
//       throw HttpError(400, 'missing fields')
//     }
//     const {id} = req.params
//     const data= req.body
//     const result = await contacts.updateContact(id, data)
//     if (!result){
//       throw HttpError(404, 'Not found')
//     }
//     res.json(result) 
    
//   } catch (error) {
//     next(error)
//   }}
  )

module.exports = router
