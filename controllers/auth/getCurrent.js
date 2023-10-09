const {ctrlWrapper} = require('../../helpers')

// const getCurrent = async(req, res)=>{
  const getCurrent = (req, res)=>{//async тут не потрібен тк у цьому контролері ми з бд не працюємо

    // const {email, subscription} = req.user
    const {name, email, avatarUrl} = req.user//

    
    const responseBody = {
      name, 
      email,
      avatarUrl
      // email: email,
      // subscription: subscription 
    };
    res.status(200).header('Content-type', 'application/json').json(responseBody)
  
  }
  module.exports =  {
    getCurrent: ctrlWrapper(getCurrent)
}