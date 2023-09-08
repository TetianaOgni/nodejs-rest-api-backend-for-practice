const {Contact} = require('../models/Contact.js')
// const contacts = require('../models/contacts')
const {HttpError, ctrlWrapper }= require('../helpers')

  // const listContacts = async (req, res, next) => {
  //     const result = await contacts.listContacts()
  //     res.json(result)
  // }
  const listContacts = async (req, res) => {
    const result = await Contact.find()
    res.json(result)
}

  // const getContactById = async (req, res, next) => {
  //   const {id} = req.params
  //   const result = await contacts.getContactById(id)
  //   if (!result){
  //     throw HttpError(404, 'Not found')
  //   }
  //   res.json(result) 
  // }
  const getContactById = async (req, res, next) => {
    const {id} = req.params
    const result = await Contact.findById(id)
    if (!result){
      throw HttpError(404, 'Not found')
    }
    res.json(result) 
  }

  // const addContact = async (req, res, next) => {
  //     const result = await contacts.addContact(req.body)
  //     res.status(201).json(result)
  // }
  const addContact = async (req, res, next) => {
    const result = await Contact.create(req.body)
    res.status(201).json(result)
}

  // const removeContact = async (req, res, next) => {
  //     const {id} = req.params
  //     const result = await contacts.removeContact(id)
  //     if (!result){
  //       throw HttpError(404, 'Not found')
  //     }
  //     res.json({
  //       message: 'contact delete'
  //     })
  // }
  const removeContact = async (req, res, next) => {
    const {id} = req.params
    const result = await Contact.findByIdAndRemove(id)
    if (!result){
      throw HttpError(404, 'Not found')
    }
    res.json({
      message: 'contact delete'
    })
}

  // const updateContact = async (req, res, next) => {
  //       const {id} = req.params
  //       const data= req.body
  //       const result = await contacts.updateContact(id, data)
  //       if (!result){
  //         throw HttpError(404, 'Not found')
  //       }
  //       res.json(result) 
  // }
  const updateContact = async (req, res, next) => {
    const {id} = req.params
    const data= req.body
    const result = await Contact.findByIdAndUpdate(id, data, {new: true})
    if (!result){
      throw HttpError(404, 'Not found')
    }
    res.json(result) 
}

const updateStatusContact = async (req, res, next) => {
  const {id} = req.params
  const data= req.body
  const result = await Contact.findByIdAndUpdate(id, data, {new: true})
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
    updateFavorite: ctrlWrapper(updateStatusContact)
}