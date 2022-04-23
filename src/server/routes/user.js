const mongoose = require('mongoose')
const router = require('express').Router()
const User = mongoose.model('User')
const passport = require('passport')

router.get('/', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  User.findOne({ _id: req.user._id })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ success: false, msg: 'could not find user' })
      }
      res.status(200).json({ success: true, user_name: user.name })
    })
    .catch((err) => {
      next(err)
    })
})

router.post('/update-name', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  const { name } = req.body

  User.findByIdAndUpdate({ _id: req.user._id }, { name }, (err, result) => {
    if (err) next(err)
    else res.status(200).json({ success: true })
  })
})

module.exports = router
