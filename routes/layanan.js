var express = require('express');
var router = express.Router();
var connection = require('../lib/db');

router.get('/', function (req, res, next) {
    //query
    connection.query('SELECT * FROM layanan ORDER BY id desc', function (err, rows) {
        if (err) {
            req.flash('error', err);
            res.render('layanan', {
                data: ''
            });
        } else {
            //render ke view layanan index
            res.render('layanan/index', {
                data: rows // <-- data layanan
            });
        }
    });
  });
  
  /**
  * CREATE POST
  */
  router.get('/create', function (req, res, next) {
    res.render('layanan/create', {
        nama: '',
        image: '',
        image_link: '',
        detail:''
    })
  })
  
  router.post('/layanan', function (req, res, next) {
    
    let nama   = req.body.nama;
    let image = req.body.image;
    let image_link = req.body.image_link;
    let detail    = req.body.detail;
  
    if(nama.length === 0) {
        errors = true;
  
        // set flash message
        req.flash('error', "Silahkan Masukkan Title");
        // render to add.ejs with flash message
        res.render('layanan/create', {
            nama: nama,
            image: image,
            image_link: image_link
        })
    }
  
    if(image.length === 0) {
        errors = true;
  
        // set flash message
        req.flash('error', "Silahkan Masukkan Konten");
        // render to add.ejs with flash message
        res.render('layanan/create', {
            nama: nama,
            image: image,
            image_link: image_link
        })
    }
  
    if(image_link.length === 0) {
        errors = true;
  
        // set flash message
        req.flash('error', "Silahkan Masukkan Image Link");
        // render to add.ejs with flash message
        res.render('layanan/create', {
            nama: nama,
            image: image,
            image_link: image_link
        })
    }
  
    if(detail.length === 0) {
        errors = true;
  
        // set flash message
        req.flash('error', "Silahkan Masukkan Detail");
        // render to add.ejs with flash message
        res.render('layanan/create', {
            nama: nama,
            image: image,
            image_link: image_link
        })
    }
        
        // insert query
        connection.query('INSERT INTO layanan SET ?', formData, function(err, result) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                 
                // render to add.ejs
                res.render('layanan/create', {
                    nama: formData.nama,
                    image: formData.image,
                    image_link: formData.image_link
                })
            } else {                
                req.flash('success', 'Data Berhasil Disimpan!');
                res.redirect('/layanan');
            }
        })
    }
  
  )
  
  module.exports = router;
