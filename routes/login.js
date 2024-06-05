var express = require('express');
var router = express.Router();
var connection = require('../lib/db');

router.get('/', function (req, res, next) {
    res.render("login/index", {
        email: email,
        username: username,
        password: password
    });

    //query
    /* connection.query('SELECT * FROM user ORDER BY id desc', function (err, rows) {
        if (err) {
            req.flash('error', err);
            res.render('login', {
                data: ''
            });
        } else {
            //render ke view layanan index
            res.render('login/index', {
                data: rows // <-- data layanan
            });
        }
    }); */
  });


  
module.exports = router;