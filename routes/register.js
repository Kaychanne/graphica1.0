var express = require('express');
var router = express.Router();
var connection = require('../lib/db');

router.post('/user', function(req, res) {
    var { username, password } = req.body;
    var hashedPassword = bcrypt.hashSync(password, 10);
  
    var sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
    connection.query(sql, [username, hashedPassword], function(err, result) {
      if (err) {
        res.status(500).send('Error registering user');
      } else {
        res.status(200).send('User registered successfully');
      }
    });
  });
  
  module.exports = router;