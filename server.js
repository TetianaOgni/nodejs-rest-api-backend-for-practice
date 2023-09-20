const mongoose = require('mongoose')

const app = require('./app') //подключение приложения app из файла app.js

mongoose.set('strictQuery', true)
const {DB_HOST, PORT = 3000} = process.env // переменные окружения содерж адрес для подключ-я  к бд MongoDB
mongoose.connect(DB_HOST)
  .then(() => {
    app.listen(3000, () => {//метод запускает вебсервер на порте 3000
    console.log(`Database connection successful!! Use our API on port: ${PORT}`)
  })
})
  .catch(error => {// Если произошла ошибка при подключении к базе данных (промис был отклонен), выводится сообщение об ошибке, и процесс завершается с кодом завершения 1 
 
    console.log(error.message)
    process.exit(1) // завершение процесса (код отличний от 0 означает ошибку)
  })


