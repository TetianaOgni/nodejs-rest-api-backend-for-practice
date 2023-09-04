const mongoose = require('mongoose')

const app = require('./app')

const DB_HOST = 'mongodb+srv://Tetiana:Y5w!!Wcngcd4uwN@cluster0.nnfnnfc.mongodb.net/contacts_reader?retryWrites=true&w=majority'

mongoose.set('strictQuery', true)
mongoose.connect(DB_HOST)
  .then(()=> {
    app.listen(3000, () => {
    console.log('Database connection successful')
  })
})
  .catch(error => {
    console.log(error.message)
    // команда, яка закриває запущені процеси (1- закрити з невідомою помилкою)
    process.exit(1) 
  })



