const jwt = require('jsonwebtoken')

function createToken(value) {
  const token = jwt.sign(value, 'predict')
  return token
}

function verifyToken(value) {
  const decoded = jwt.verify(value, 'predict')
  return decoded
}

module.exports = {
  createToken,
  verifyToken
}