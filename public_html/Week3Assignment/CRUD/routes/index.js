var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Employee Entry', company: 'TJM Industries' });
});

/* GET view page. */
router.get('/view', function(req, res, next) {
  res.render('view', { title: 'View Employees', company: 'TJM Industries' });
});

/* GET delete page. */
router.get('/delete', function(req, res, next) {
  res.render('delete', { title: 'Delete Entry', company: 'TJM Industries' });
});

/* GET update page. */
router.get('/update', function(req, res, next) {
  res.render('update', { title: 'Update Entry', company: 'TJM Industries' });
});

module.exports = router;
