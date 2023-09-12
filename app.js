const express = require('express')
const logger = require('morgan')
const cors = require('cors')
require('dotenv').config() 
const authRouter = require('./routes/api/auth')
const contactsRouter = require('./routes/api/contacts')
// ----hash
// const bcrypt = require('bcrypt')
// const createHashPassword = async(password) => {
//   const result = await bcrypt.hash(password, 10)
//   console.log(result)
//   const compareResult1 = await bcrypt.compare(password, result)
//   console.log(compareResult1)
//   const compareResult2 = await bcrypt.compare('123457', result)
//   console.log(compareResult2)
// }
// createHashPassword('123456') 
// -----
const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())
app.use('/api/auth', authRouter)
app.use('/api/contacts', contactsRouter)
 
app.use((req, res) => {  
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  const {status = 500, message = 'Server error'} = err
  res.status(status).json({ message, })
})



module.exports = app
