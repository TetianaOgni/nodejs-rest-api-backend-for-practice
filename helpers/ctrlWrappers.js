const ctrlWrapper = ctrl => {
    const func = async(req, res, next)=>{
        try {
            await ctrl(req, res, next)
        }
        catch(error){
            console.log(1, error)
            next(error)
        }
    }
    return func
}

module.exports = ctrlWrapper