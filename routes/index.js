const router = require('express').Router()
const User = require('../controllers/user')
const Authentication = require('../middlewares/authentication')

router.post('/register', User.register)
router.post('/login', User.login)
router.post('/googleLogin', User.googleLogin)
router.use(Authentication)
router.post('/predict', User.predict)

module.exports = router