const bcrypt = require('bcryptjs')

function hashing(value) {
  const salt = bcrypt.genSaltSync(10)
  return bcrypt.hashSync(value, salt)
}

function comparing(plainPass, hashPass) {
  return bcrypt.compareSync(plainPass, hashPass)
}

module.exports = {
  hashing,
  comparing
}