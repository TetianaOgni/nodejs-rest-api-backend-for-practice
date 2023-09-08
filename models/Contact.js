const mongoose = require('mongoose')
const Joi = require('joi')
const {handleMongooseError} = require('../helpers')
const contactSchema = new mongoose.Schema (

{
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  }
)

contactSchema.post('save', handleMongooseError)

const addSchema = Joi.object({
    name: Joi.string().required().messages({ "any.required": '!!!' }),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    favorite: Joi.boolean().required(),
  })
// const updateFavoriteSchema = Joi.object({
//   favorite: Joi.boolean().required().messages({"any.required": '!!!'}),

// })
const updateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required().messages({ "any.required": '!!!' }),
  });

const Contact = mongoose.model('contact', contactSchema)

const schemas = {
    addSchema,
    updateFavoriteSchema,
}

module.exports = {
    Contact,
    schemas,
}