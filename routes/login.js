var express = require('express');
var router = express.Router();
var connection = require('../lib/db');

router.get('/', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

router.post('/', function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;

  // Query the database for the user
  connection.query('SELECT * FROM user WHERE email = ?', [username], function(err, results) {
    if (err) {
      console.error('Database query error: ' + err.stack);
      return res.redirect('/login');
    }

    if (results.length > 0 && results[0].password === password) {
      var user = results[0];
      if (user.email === 'admin@gmail.com') {
        req.session.user = { username: user.email, role: 'admin' };
        res.redirect('/form');
      } else {
        req.session.user = { username: user.email, role: 'user' };
        res.redirect('/frontend');
      }
    } else {
      res.redirect('/login');
    }
  });
});

module.exports = router;
