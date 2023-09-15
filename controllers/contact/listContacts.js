const {Contact}= require('../../models/Contact')
const {HttpError, ctrlWrapper }= require('../../helpers')

const listContacts = async (req, res) => {
    // дізнаємося хто робить запит і віддаємо данні до яких є доступ у користувача завдяки _id: owner
    const {_id: owner} = req.user
    // пагінація
    const {page = 1, limit = 10} = req.query
    const skip = (page - 1) * limit
   const result = await Contact.find({owner}, '-versionKey', {skip, limit}).populate('owner', 'name email')  //populate повертає інфу про користувача, принимает перш. арг. що найти, а другим - що конкретно передать
   res.json(result)
}
module.exports = {
    listContacts: ctrlWrapper(listContacts),
}