const {
  register,
  login,
  getCurrent,
  logout,
  updateAvatar,
  verify,
  resendVerifyEmail,
} = require("./auth");

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require("./contacts");

module.exports = {
  register,
  login,
  getCurrent,
  logout,
  verify,
  resendVerifyEmail,
  updateAvatar,
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
};
