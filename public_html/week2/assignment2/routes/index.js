var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Welcome, 007' });
});

/* GET about page. */
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About' });
});

/* GET submit page. */
router.get('/submit', function(req, res, next) {
  res.render('submit', { title: 'Submit' });
});

module.exports = router;
