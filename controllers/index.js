const {register, login, getCurrent, logout} = require('./auth')
const {listContacts, getContactById, addContact, removeContact,  updateContact, updateStatusContact} = require('./contact')
module.exports = {
    register,
    login,
    getCurrent,
    logout,
    listContacts,
    getContactById,
    addContact,
    removeContact,
    updateContact,
    updateStatusContact
}