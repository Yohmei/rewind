const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  name: { type: String, default: '' },
  username: { type: String, unique: true },
  hash: String,
  salt: String,
  timestamp: { type: Date, default: new Date() },
})

module.exports = mongoose.model('User', UserSchema)
