const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User} = require('../../models/user')
const {HttpError, ctrlWrapper} = require('../../helpers')

const {SECRET_KEY} = process.env

const login = async(req, res) => {
    const {email, password} = req.body
    const user = await User.findOne({email})
    if(!user) {
        throw HttpError(401, 'Not authorized')
    }
    const passwordCompare = await bcrypt.compare(password, user.password)
    if(!passwordCompare){
        throw HttpError(401, 'Not authorized')
    }
    
    const payload = {
        id: user._id,
    }
    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "23h"})
    res.json({
        token,
    })
}
module.exports = {
    login: ctrlWrapper(login)
}