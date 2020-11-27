const { User } = require('../models')
const { comparing } = require('../helpers/bcrypt')
const { createToken } = require('../helpers/jwt')
const { national, randCountry } = require('../helpers/nationalize')
const axios = require('axios')
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CID);

class UserController {
  static async register(req, res) {
    const payload = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }
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
    let url
    axios({
      url: `https://api.nationalize.io/?name=${name}`,
      method: "GET",
    })
    .then(result => {
      if (result.data.country.length < 1) {
        country = randCountry()
        return axios({
          url: `https://api.agify.io?name=${name}`,
          method: "GET",
        })
      } else {
        let countryid = result.data.country[0].country_id
        let countryname = national(countryid)
        country = countryname
        return axios({
          url: `https://api.agify.io?name=${name}`,
          method: "GET",
        })
      }
    })
    .then(result => {
      age = result.data.age
      return axios({
        url: `https://api.genderize.io?name=${name}`,
        method: "GET",
      })
    })
    .then(result => {
      gender = result.data.gender
      return axios({
        url: "https://api.thecatapi.com/v1/images/search",
        method: "GET",
        headers: {
          "x-api-key": "a6e5d737-a3fb-45b6-bec7-123f2779c615"
        }
      })
    })
    .then(result => {
      url = result.data[0].url
      res.status(200).json({
        country,
        age,
        gender,
        url
      })
    })
    .catch(err => {
      res.status(500).json(err)
    })
  }
  static googleLogin(req, res) {
    let payload;
    client.verifyIdToken({
      idToken: req.body.googleToken,
      audience: process.env.CID
    })
    .then(ticket => {
      payload = ticket.getPayload()
      return User.findOne({
        where: {
          email: payload.email
        }
      })
      .then(user => {
        if (user) {
          return user
        } else {
          return User.create({
            name: payload.name,
            email: payload.email,
            password: process.env.G_PASS
          })
        }
      })
      .then(user => {
        const access_token = createToken({ email: user.email, id: user.id, name: user.name })
        res.status(200).json({access_token})
      })
    })
    .catch(err => {
      res.status(500).json({ msg: `Internal server error` })
    })
  }
}

module.exports = UserController