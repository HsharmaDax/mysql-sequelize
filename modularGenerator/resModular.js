
const status400 = (res,msg)=> res.status(400).json({message:`${msg}`})

module.exports = status400 