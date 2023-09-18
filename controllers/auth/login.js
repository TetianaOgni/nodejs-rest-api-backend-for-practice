const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User} = require('../../models/user')
const {HttpError, ctrlWrapper} = require('../../helpers')

const {SECRET_KEY} = process.env

const login = async(req, res) => {
    const {email, password, subscription} = req.body
    const user = await User.findOne({email})
    if(!user) {
        throw HttpError(401, 'Email or password is wrong')

    }
    const passwordCompare = await bcrypt.compare(password, user.password)
    if(!passwordCompare){
        throw HttpError(401, 'Email or password is wrong')

    }
    
    const payload = {
        id: user._id,
    }
    
    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "23h"})
    await User.findByIdAndUpdate(user._id, {token})
    
    const responseBody = {
        token,
        user: {
            email: email,
            subscription: subscription
        }
    }
    res.status(200).header('Content-Type', 'application/json').json(responseBody)
}


module.exports = {
    login: ctrlWrapper(login),
}