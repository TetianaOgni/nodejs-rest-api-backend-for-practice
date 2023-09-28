const {
  register,
  login,
  getCurrent,
  logout,
  updateAvatar,
  verify,
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
  updateAvatar,
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
};
