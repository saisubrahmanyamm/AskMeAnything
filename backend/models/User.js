const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  displayName: {
    type: String,
    required: true
  },
  uid: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  photoURL: {
    type: String,
    required: true
  },
  reputationPoints: {
    type: Number,
    default: 0
  },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;