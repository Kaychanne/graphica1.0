var express = require('express');
var router = express.Router();
var connection = require('../lib/db');

router.get('/', function(req, res, next) {
  connection.query('SELECT * FROM pesanan ORDER BY id DESC', function (err, rows) {
    if (err) {
      req.flash('error', err.message);
      res.render('index', {
        data: [],
        messages: req.flash()
      });
    } else {
      res.render('index', {
        data: rows,
        messages: req.flash()
      });
    }
  });
});

router.get('/create', function (req, res, next){
    res.render('/')
})
module.exports = router;
