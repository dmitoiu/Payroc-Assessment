// -----------------------------------------------------------------------
// Darie-Dragos Mitoiu
// TwitStips (posts.js) v1.0.0 13/03/2022
// A web application designed for personal use
// -----------------------------------------------------------------------

// Importing libraries and utilities
var express = require('express');
var router = express.Router();
var postsController = require("../controllers/postsController");
var authMiddleware = require("../middleware/authMiddleware");
var getPosts = postsController.getPosts;
var getPostById = postsController.getPostById;
var protect = authMiddleware.protect;
var admin = authMiddleware.admin;
var addPost = postsController.addPost;
var updatePost = postsController.updatePost;
var deletePost = postsController.deletePost;

// Create api vouchers routes
router.route("/").get(getPosts);
router.route("/:id").get(getPostById);
router.route("/add").post(addPost);
router.route("/delete").post(protect, admin, deletePost);
router.route("/update").post(protect, admin, updatePost);

module.exports = router;
