var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Color Finder' });
});

router.get('/colors.hbs', function(req, res, next) {
  res.render('colors', { title: 'Color Finder' });
});

module.exports = router;
