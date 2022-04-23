const router = require('express').Router()

router.use('/api', require('./auth'))
router.use('/api/user', require('./user'))

module.exports = router
