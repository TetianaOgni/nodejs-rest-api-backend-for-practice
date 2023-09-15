const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User} = require('../../models/user')
const {HttpError, ctrlWrapper} = require('../../helpers')

const {SECRET_KEY} = process.env

const login = async(req, res) => {
    const {email, password} = req.body
    const user = await User.findOne({email})
    if(!user) {
        throw HttpError(401, 'Email or password is wrong')

        // return res.status(401).json({
        //     message: 'Email or password is wrong',
        //   });
    }
    const passwordCompare = await bcrypt.compare(password, user.password)
    if(!passwordCompare){
        throw HttpError(401, 'Email or password is wrong')

        // return res.status(401).json({
        //     message: 'Email or password is wrong',
        //   });
    }
    
    const payload = {
        id: user._id,
    }
    // создаємо токен
    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "23h"})
    // const decodeToken = jwt.decode(token)
    await User.findByIdAndUpdate(user._id, {token})
    // res.json ({
    //     token,
    // })
    const responseBody = {
        token,
        user: {
            email: user.email,
            subscription: 'starter'
        }
    }
    res.status(200).header('Content-Type', 'application/json').json(responseBody)
}


module.exports = {
    login: ctrlWrapper(login),
}