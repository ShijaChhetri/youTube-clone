const mongoose = require("mongoose");

const Schema = mongoose.Schema  
const model = mongoose.model;

const User = new Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  hashedPassword: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 1024,
  },
  description: {
    type: String,
    default: "No Description",
  },
  thumbnail: {
    type: String,
    default: "https://via.placeholder.com/150",
  },
  videos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Video'
    },
  ],
  subscribers: {
    type: Number,
    default: 0
  },
  subscribedTo: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
  ],
  likedVideos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Video'
    },
  ],
  likedComments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
});

module.exports = model('User', User);