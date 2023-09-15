const {Contact}= require('../../models/Contact')
const {HttpError, ctrlWrapper }= require('../../helpers')
const addContact = async (req, res, next) => {
    // додаємо контакт и привʼязуємо єго до користувача який робить запит
    const {_id: owner} = req.user
    const result = await Contact.create({...req.body, owner})
    // const result = await Contact.create(req.body, owner)
    res.status(201).json(result)
}

module.exports = {
    addContact: ctrlWrapper(addContact),
}