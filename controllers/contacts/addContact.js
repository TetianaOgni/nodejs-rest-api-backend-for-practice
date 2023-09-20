const fs = require('fs/promises')//модуль FileSystem отвечает за работу с файлами в Node.js
const path = require('path')//   модуль path, який входить до стандартної бібліотеки Node.js потрібен роботи з шляхами файлової системи

const {Contact}= require('../../models/Contact')
const {ctrlWrapper }= require('../../helpers')

const avatarsPath = path.resolve('public', 'avatars') 
const addContact = async (req, res, next) => {
    const {_id: owner} = req.user
    const {path: oldPath, filename} = req.file 
    const newPath = path.join(avatarsPath, filename) 
    await fs.rename(oldPath, newPath)
    const avatar = path.join('avatars', filename)
    const result = await Contact.create({...req.body, avatar, owner})
    res.status(201).json(result)
}

module.exports = {
    addContact: ctrlWrapper(addContact),
}