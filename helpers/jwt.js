const jwt = require('jsonwebtoken')

function createToken(value) {
  const token = jwt.sign(value, process.env.SCRT)
  return token
}

function verifyToken(value) {
  const decoded = jwt.verify(value, process.env.SCRT)
  return decoded
}

module.exports = {
  createToken,
  verifyToken
}