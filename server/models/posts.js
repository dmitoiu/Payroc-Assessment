// -----------------------------------------------------------------------
// Darie-Dragos Mitoiu
// TwitStips (postModel.js) v1.0.0 20/09/2022
// A web application designed for a personal use
// -----------------------------------------------------------------------

// Importing libraries and utilities
var mongoose = require("mongoose");

const postMemberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    }
},{
    timestamps: true
});

// Create user schema
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    likes: {
        type: String,
        required: false,
        default: 0
    },
    replies: {
        type: String,
        required: false,
        default: 0
    },
    views: {
        type: String,
        required: false,
        default: 0
    },
    href: {
        type: String,
        required: false,
        default: "#"
    },
    members: postMemberSchema,
    initials: {
        type: String,
        required: false
    },
    archived: {
        type: Boolean,
        required: true,
        default: false
    }
}, {
    timestamps: true
});

// Create User model
const Posts = mongoose.model("Post", postSchema);

module.exports = Posts;