const Joi = require('joi')
const contacts = require('../models/contacts')
const {HttpError, ctrlWrapper }= require('../helpers')

const addSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
  })

  const listContacts = async (req, res, next) => {
    // try{
      const result = await contacts.listContacts()
      res.json(result)
    // }
    // catch(error){
    //   next(error)
    // }
  
  }
  const getContactById = async (req, res, next) => {
  console.log(req.params)
  // try{
    const {id} = req.params
    const result = await contacts.getContactById(id)
    if (!result){
      throw HttpError(404, 'Not found')
    }
    res.json(result) 
  // }
  // catch(error){
  //   next(error)
  // }
}
  
  const addContact = async (req, res, next) => {
    // try{
      const {error} = addSchema.validate(req.body)
      if (error){
        throw HttpError(400, 'missing required name field')
      }
      const result = await contacts.addContact(req.body)
      res.status(201).json(result)
    // }catch(error){
    //   next(error)
    // }
  }

  const removeContact = async (req, res, next) => {
    // try {
      const {id} = req.params
      const result = await contacts.removeContact(id)
      if (!result){
        throw HttpError(404, 'Not found')
      }
      res.json({
        message: 'contact delete'
      })
    // } catch (error) {
    //   next(error)
    // }
  }

const updateContact = async (req, res, next) => {
      // try {
        const {error} = addSchema.validate(req.body)
        if (error){
          throw HttpError(400, 'missing fields')
        }
        const {id} = req.params
        const data= req.body
        const result = await contacts.updateContact(id, data)
        if (!result){
          throw HttpError(404, 'Not found')
        }
        res.json(result) 
        
      // } catch (error) {
      //   next(error)
      // }
    }

  module.exports = {
    listContacts: ctrlWrapper(listContacts),
    getContactById: ctrlWrapper(getContactById),
    addContact: ctrlWrapper(addContact),
    removeContact: ctrlWrapper(removeContact), 
    updateContact: ctrlWrapper(updateContact),
  }