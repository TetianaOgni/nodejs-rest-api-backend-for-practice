const handleMongooseError = (error, data, next) => {
    const {name, code} = error
     const status = (name === 'MongoServerError' && code === 11000) ? 409 : 400
     error.status = status;
     next()
}
const runValidateAtUpdate = function(next) {
     this.options.runValidators = true;
     next();
 }

module.exports = {
     handleMongooseError,
     runValidateAtUpdate,
}