const mongoose = require('mongoose')

const app = require('./app')
// mongodb+srv://Tetiana:Y5w!!Wcngcd4uwN@cluster0.nnfnnfc.mongodb.net/contacts_reader?retryWrites=true&w=majority
// const {DB_HOST} = process.env
mongoose.set('strictQuery', true)
const {DB_HOST, PORT = 3000} = process.env
mongoose.connect(DB_HOST)
  .then(() => {
    app.listen(3000, () => {
    console.log(`Database connection successful!! Use our API on port: ${PORT}`)
  })
})
  .catch(error => {
    console.log(error.message)
    // команда, яка закриває запущені процеси (1- закрити з невідомою помилкою)
    process.exit(1) 
  })



