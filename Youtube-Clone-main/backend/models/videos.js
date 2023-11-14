const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const model = mongoose.model;

const videoSchema = Schema({
    videoId: {
        type: String,
        required: true,
        unique: true
    },
    url: {
        type: String
    },
    title: {
        type: String,
        required: true,
        maxlength: 255
    },
    description: {
        type: String,
        default: "No Description",
        maxlength: 512
    },
    thumbnail: {
        type: String
    },
    views: {
        type: Number,
        default: 0
    },
    likes: {
        type: Number,
        default: 0
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    tags: [
        {
            type: String
        }
    ],
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }    
    ]
}, {timestamp: true});

module.exports = model('Video', videoSchema);