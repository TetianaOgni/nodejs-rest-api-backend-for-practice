const {Contact} = require('../models/Contact.js')
const {HttpError, ctrlWrapper }= require('../helpers')

 
  const listContacts = async (req, res) => {
     // дізнаємося хто робить запит і віддаємо данні до яких є доступ у користувача завдяки _id: owner
     const {_id: owner} = req.user
     // пагінація
     const {page = 1, limit = 10} = req.query
     const skip = (page - 1) * limit
    const result = await Contact.find({owner}, {skip, limit}).populate('owner', 'name email')  //populate повертає інфу про користувача, принимает перш. арг. що найти, а другим - що конкретно передать
    res.json(result)
}

  const getContactById = async (req, res, next) => {
   
    const {id} = req.params
    const result = await Contact.findById(id)
    if (!result){
      throw HttpError(404, 'Not found')
    }
    res.json(result) 
  }

 
  const addContact = async (req, res, next) => {
    // додаємо контакт и привʼязуємо єго до користувача який робить запит
    const {_id: owner} = req.user
    const result = await Contact.create({...req.body, owner})
    // const result = await Contact.create(req.body, owner)
    res.status(201).json(result)
}

  const removeContact = async (req, res, next) => {
    const {id} = req.params
    const result = await Contact.findByIdAndRemove (id)
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