const {Contact}= require('../../models/Contact')
const {HttpError, ctrlWrapper }= require('../../helpers')

const updateContact = async (req, res, next) => {
    const {id} = req.params
    const data= req.body
    const result = await Contact.findByIdAndUpdate(id, data, {new: true})
    if (!result){
      throw HttpError(404, 'Not found')
    }
    res.json(result) 
}


module.exports = {
    updateContact: ctrlWrapper(updateContact),
}