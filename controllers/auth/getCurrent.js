const {ctrlWrapper} = require('../../helpers')

const getCurrent = async(req, res)=>{

    const {email, name, subscription} = req.user
    console.log(subscription)
    // res.json({
    //   email,
    //   name,
    // })
    const responseBody = {
      email: email,
      subscription: subscription 
    };
    res.status(200).header('Content-type', 'application/json').json(responseBody)
  
  }
  module.exports =  {
    getCurrent: ctrlWrapper(getCurrent)
}