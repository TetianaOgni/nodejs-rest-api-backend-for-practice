const {Contact}= require('../../models/Contact')
const {HttpError, ctrlWrapper }= require('../../helpers')

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

module.exports = {
    removeContact: ctrlWrapper(removeContact), 
}