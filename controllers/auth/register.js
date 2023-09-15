const bcrypt = require('bcrypt')
const {User} = require('../../models/user')
const {HttpError, ctrlWrapper} = require('../../helpers')

const register = async(req, res) => {
  const {email, password, subscription} = req.body
  const user = await User.findOne({email})
  // if (user){
  //   throw HttpError(409, 'Email in use')
  // }
  // по дз ---
  if (user) {
    return res.status(409).header('Content-Type', 'application/json').json({
      message: 'Email in use',
    });
  }
  // ------------  
 const hashPassword = await bcrypt.hash(password, 10)

  const newUser = await User.create({...req.body, password: hashPassword})
  // res.status(201).json({
  //   email: newUser.email,
  //   name: newUser.name,
  // })
  // по дз ---
  const responseBody = {
    user: {
      email: email,
      subscription: subscription,
    },
  };
  res.status(201).header('Content-Type', 'application/json').json(responseBody);
  // ---------
}

module.exports = {
  register: ctrlWrapper(register), 
}

