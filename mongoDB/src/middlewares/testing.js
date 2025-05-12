const middleware = (req, res, next) => {
    console.log("middleware function called")
    // next()
    next()
}


module.exports = { middleware }