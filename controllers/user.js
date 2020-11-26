const { User } = require('../models')
const { comparing } = require('../helpers/bcrypt')
const { createToken } = require('../helpers/jwt')

class UserController {
  static async register(req, res) {
    const payload = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }
    // console.log(payload);
    try {
      const data = await User.create(payload)
      res.status(201).json({
        id: data.id,
        name: data.name,
        email: data.email
      })
    } catch (error) {
      res.status(500).json({ msg: `Internal server error` })
    }
  }

  static async login(req, res) {
    try {
      const data = await User.findOne({ where: { email: req.body.email } })
      if (!data) {
        res.status(404).json({
          msg: `Invalid Account`
        })
      } else if (comparing(req.body.password, data.password)) {
        const value = {
          email: data.email
        }
        const token = createToken(value)
        res.status(201).json({ token })
      } else {
        res.status(404).json({
          msg: `Invalid email or password`
        })
      }
    } catch (error) {
      res.status(500).json({ msg: `Internal server error` })
    }
  }

   static async predict(req, res) {
     
   }
}

module.exports = UserController