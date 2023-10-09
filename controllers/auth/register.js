const gravatar = require("gravatar");
// const bcrypt = require("bcrypt");
// const { nanoid } = require("nanoid");
const { User } = require("../../models/user");
// const { HttpError, ctrlWrapper, sendEmail } = require("../../helpers");
const { ctrlWrapper } = require("../../helpers");//
const jwt = require("jsonwebtoken")//
// const { BASE_URL, SECRET_KEY } = process.env;
const { SECRET_KEY } = process.env;//

const register = async (req, res) => {
  // const { email, password, subscription } = req.body;
  const {name, email, password } = req.body;//

  const user = await User.findOne({ email });

  if (user) {
    return res.status(409).header("Content-Type", "application/json").json({
      message: "Email in use",
    });
  }

  // const hashPassword = await bcrypt.hash(password, 10);
  const avatarUrl = gravatar.url(email, { protocol: "http", s: "250" });
  // const verificationToken = nanoid();

  // const newUser = await User.create({
  //   ...req.body,
  //   password: hashPassword,
  //   avatarUrl,
  //   verificationToken,
  // });

  // const verifyEmail = {
  //   email,
  //   to: email,
  //   subject: "Verify email",
  //   html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Click to verify email</a>`,
  // };
   
  const newUser = new User({name, email, password, avatarUrl})//створюємо юзера на базі моделі
 await newUser.hashPassword()//отримуемо захеширований пароль
await newUser.save()//зберегаємо юзера в базі
const payload = {id: newUser._id}//
const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" })//підписуємо токен і оновлюємо щойно збереженного юзера у базі 
await User.findByIdAndUpdate(newUser._id, {token}) //
const responseBody = {
    user: {
      name,
      email,
      avatarUrl
      // email: email,
      // subscription: subscription,
    },
    token,//
  };
  res.status(201).header("Content-Type", "application/json").json(responseBody);
};

module.exports = {
  register: ctrlWrapper(register),
};
