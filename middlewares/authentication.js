const { nextTick } = require('process')
const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models')

module.exports = async (req, res, next) => {
  try {
    const access_token = req.headers.access_token
    if (!access_token) {
      res.status(401).json({
        msg: `Please login first`
      })
    } else {
      const decoded = verifyToken(access_token)
      req.loggedIn = decoded
      const data = await User.findOne({
        where: { email: decoded.email }
      })
      if (data) {
        next()
      } else {
        res.status(404).json({
          msg: `Please register account first`
        })
      }
    }
  } catch (error) {
    res.status(500).json(error)
  }
}