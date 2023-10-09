const jimp = require('jimp');
const fs = require('fs/promises')
const path = require('path')

const { ctrlWrapper } = require("../../helpers")
const {User} = require('../../models/user')

const avatarsPath = path.resolve('public', 'avatars') 

const updateAvatar = async(req, res)=>{

   const {_id} = req.user
   const {path: oldPath, filename} = req.file 
   const newPath = path.join(avatarsPath, filename) 
   await fs.rename(oldPath, newPath)
   
     const jimpImage = await jimp.read(newPath);
     await jimpImage.resize(250, 250, jimp.RESIZE_BEZIER);
     await jimpImage.writeAsync(newPath);
   
   const uniqFilename = `${_id}_${filename}`
   const avatarUrl = path.join('avatars', uniqFilename)
   await User.findByIdAndUpdate(_id, {avatarUrl})
    
    res.status(200).header('Content-Type', 'application/json').json({
        avatarUrl
    })
}

module.exports = {
    updateAvatar: ctrlWrapper(updateAvatar), 
  }