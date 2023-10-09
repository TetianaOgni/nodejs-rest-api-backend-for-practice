const { Schema, model } = require("mongoose");
const Joi = require("joi");
const bcrypt = require('bcrypt')// 
const { handleMongooseError, runValidateAtUpdate } = require("../helpers");

const subscriptionOptions = ["starter", "pro", "business"];
const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const userSchema = new Schema(
  {
    name: {//додаемо у схему имʼя юзера
      type: String,
      required: [true, "Set name for user"],
    },
    password: {
      type: String,
      minlength: 6,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      match: emailRegexp,
      required: [true, "Email is required"],
      unique: true,
    },
    // subscription: {
    //   type: String,
    //   enum: subscriptionOptions,
    //   default: "starter",
    // },
    token: {
      type: String,
      default: "",
    },
    avatarUrl: {
      type: String,
    },
    // verify: {
    //   type: Boolean,
    //   default: false,
    // },
    // verificationToken: {
    //   type: String,
    //   default: "",
    // },
  },
  { versionKey: false }
);
userSchema.methods.hashPassword = async function(){//створюємо кастомний метод для хешування пароля юзера
  this.password = await bcrypt.hash(this.password, 10)
}

userSchema.methods.comparePassword = async function(password){//створюємо кастомний метод для порівняння пароля юзера в бд и того що ввели
  return await bcrypt.compare(password, this.password)
}

userSchema.post("save", handleMongooseError);
userSchema.pre("findOneAndUpdate", runValidateAtUpdate);
userSchema.post("findOneAndUpdate", handleMongooseError);

const registerSchema = Joi.object({
  name: Joi.string().min(2).required(),//
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(emailRegexp).required(),
  // subscription: Joi.string()
  //   .valid("starter", "pro", "business")
  //   .default("starter"),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const emailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
});

const schemas = {
  registerSchema,
  loginSchema,
  emailSchema,
};

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};
