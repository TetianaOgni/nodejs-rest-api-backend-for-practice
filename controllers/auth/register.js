const gravatar = require("gravatar");
const bcrypt = require("bcrypt");
const { nanoid } = require("nanoid");
const { User } = require("../../models/user");
const { HttpError, ctrlWrapper, sendEmail } = require("../../helpers");

const { BASE_URL } = process.env;

const register = async (req, res) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    return res.status(409).header("Content-Type", "application/json").json({
      message: "Email in use",
    });
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarUrl = gravatar.url(email, { protocol: "http", s: "250" });
  const verificationToken = nanoid();

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarUrl,
    verificationToken,
  });

  const verifyEmail = {
    email,
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Click to verify email</a>`,
  };

  await sendEmail(verifyEmail);

  const responseBody = {
    user: {
      email: email,
      subscription: subscription,
    },
  };
  res.status(201).header("Content-Type", "application/json").json(responseBody);
};

module.exports = {
  register: ctrlWrapper(register),
};
