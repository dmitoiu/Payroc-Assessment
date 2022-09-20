var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'TwitStips API v1.0.0 Express.js' });
});

module.exports = router;
