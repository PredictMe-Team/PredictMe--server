const { User } = require('../models')
const { comparing } = require('../helpers/bcrypt')
const { createToken } = require('../helpers/jwt')
const { national, randCountry } = require('../helpers/nationalize')
const axios = require('axios')

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
        const access_token = createToken(value)
        res.status(201).json({ access_token })
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
    const { name } = req.body
    let country
    let age
    let gender
    axios({
      url: `https://api.nationalize.io/?name=${name}`,
      method: "GET",
    })
      .then(result => {
        if (result.data.country.length < 1) {
          // res.status(200).json(randCountry())
          country = randCountry()
          return axios({
            url: `https://api.agify.io?name=${name}`,
            method: "GET",
          })
        } else {
          let countryid = result.data.country[0].country_id
          let countryname = national(countryid)
          // res.status(200).json(countryname)
          country = countryname
          return axios({
            url: `https://api.agify.io?name=${name}`,
            method: "GET",
          })
        }
      })
      .then(result => {
        // console.log(result);
        age = result.data.age
        return axios({
          url: `https://api.genderize.io?name=${name}`,
          method: "GET",
        })
      })
      .then(result => {
        gender = result.data.gender
        res.status(200).json({
          country,
          age,
          gender
        })
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }
}

module.exports = UserController