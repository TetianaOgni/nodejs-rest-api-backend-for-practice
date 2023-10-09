const { ctrlWrapper, HttpError } = require("../../helpers")
const { User } = require("../../models/user")

const logout = async(req, res) => {
  const {_id} = req.user 
  // const user = await User.findOne({_id})
  // if (!user){
  //   throw HttpError(401, 'Not authorized')
  // }
  await User.findByIdAndUpdate(_id, {token: ''}) 

res.status(204).send();  
}
module.exports = {
    logout: ctrlWrapper(logout)
}