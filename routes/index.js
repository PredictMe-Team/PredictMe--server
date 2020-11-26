const router = require('express').Router()
const User = require('../controllers/user')
const Authentication = require('../middlewares/authentication')

router.post('/register', User.register)
router.post('/login', User.login)
router.use(Authentication)
router.get('/predict', User.predict)

module.exports = router