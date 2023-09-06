const mongoose = require('mongoose')

const app = require('./app')
// mongodb+srv://Tetiana:Y5w!!Wcngcd4uwN@cluster0.nnfnnfc.mongodb.net/contacts_reader?retryWrites=true&w=majority
// const {DB_HOST} = process.env
// mongoose.set('strictQuery', true)
mongoose.connect(process.env.DB_HOST)
  .then(() => {
    app.listen(3000, () => {
    console.log('Database connection successful!!')
  })
})
  .catch(error => {
    console.log(error.message)
    // команда, яка закриває запущені процеси (1- закрити з невідомою помилкою)
    process.exit(1) 
  })



