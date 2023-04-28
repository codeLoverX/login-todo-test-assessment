 function logErrorMiddleware (err, _req, _res, next) {
    console.error(err.message)
    next(err)
}
   
function returnError (err, _req, res, _next) {
    res.status(err.statusCode || 500).json({error: err.message})
}
   
  
module.exports = {
    returnError,
    logErrorMiddleware
}