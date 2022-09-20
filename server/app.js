var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var dotenv = require("dotenv");

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

dotenv.config()

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/accounts');
var postsRouter = require('./routes/posts');

var app = express();

app.use(allowCrossDomain);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/accounts', usersRouter);
app.use('/api/posts', postsRouter);

/**
 * If the application is in production mode, continue...
 * Author: Brad Traversy
 * Reference: https://github.com/bradtraversy/proshop_mern/blob/master/backend/server.js
 * Adapted from the reference mentioned above
 */
if(process.env.NODE_ENV === "production"){
    // Use client build as static files
    app.use(express.static(path.join(path.resolve(), "/client/build")));
    app.get("*", (req, res) => {
        // Send client build index.html file
        res.sendFile(path.resolve(path.resolve(), "client", "build", "index.html"))
    })
} else {
    app.use(express.static(path.join(__dirname, 'public')));
    app.use('/', indexRouter);
}

module.exports = app;
