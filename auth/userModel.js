const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    userrole: {
      type: String,
      required: [true, 'Please add a USER ROLE'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
    accessType: {
      type: String
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('AllUser', userSchema)
