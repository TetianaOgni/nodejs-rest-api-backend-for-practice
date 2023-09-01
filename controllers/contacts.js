const contacts = require('../models/contacts')
const {HttpError, ctrlWrapper }= require('../helpers')

  const listContacts = async (req, res, next) => {
      const result = await contacts.listContacts()
      res.json(result)
  }

  const getContactById = async (req, res, next) => {
    const {id} = req.params
    const result = await contacts.getContactById(id)
    if (!result){
      throw HttpError(404, 'Not found')
    }
    res.json(result) 
  }

  const addContact = async (req, res, next) => {
      const result = await contacts.addContact(req.body)
      res.status(201).json(result)
  }

  const removeContact = async (req, res, next) => {
      const {id} = req.params
      const result = await contacts.removeContact(id)
      if (!result){
        throw HttpError(404, 'Not found')
      }
      res.json({
        message: 'contact delete'
      })
  }

  const updateContact = async (req, res, next) => {
        const {id} = req.params
        const data= req.body
        const result = await contacts.updateContact(id, data)
        if (!result){
          throw HttpError(404, 'Not found')
        }
        res.json(result) 
  }

module.exports = {
    listContacts: ctrlWrapper(listContacts),
    getContactById: ctrlWrapper(getContactById),
    addContact: ctrlWrapper(addContact),
    removeContact: ctrlWrapper(removeContact), 
    updateContact: ctrlWrapper(updateContact),
}