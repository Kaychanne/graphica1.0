var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {
  res.send('LOGIN BERHASIL');
});

module.exports = router;
