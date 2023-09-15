const { ctrlWrapper } = require("../../helpers")
const { User } = require("../../models/user")

const logout = async(req, res) => {
  const {_id} = req.user // маємо доступ до _id користувача 
  await User.findByIdAndUpdate(_id, {token: ''}) // у моделі User знаходимо користувача за _id і очищуємо його токен
//   res.json({
//     message: "Logout success"
// })
// по дз ---
res.status(204).send(); // установлює статус успішного виконання і посилає порожню відповідь, No Content
//-----
}
module.exports = {
    logout: ctrlWrapper(logout)
}