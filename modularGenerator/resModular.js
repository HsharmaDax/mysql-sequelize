
const status400 = (msg)=> res.status(400).json({message:`${msg}`})

module.exports = status400