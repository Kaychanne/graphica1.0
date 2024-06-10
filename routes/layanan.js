var express = require('express');
var router = express.Router();
var connection = require('../lib/db');

/**
 * INDEX layanan
 */
router.get('/', function (req, res, next) {
    //query
    connection.query('SELECT * FROM layanan ORDER BY nama desc', function (err, rows) {
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
 * CREATE layanan
 */
router.get('/create', function (req, res, next) {
    res.render('layanan/create', {
        nama: '',
        image: '',
        image_link: '',
        detail: ''
    })
})

/**
 * STORE layanan
 */
router.post('/store', function (req, res, next) {
    
    let nama   = req.body.nama;
    let image = req.body.image;
    let image_link = req.body.image_link;
    let detail= req.body.detail;
    let errors  = false;

    if(nama.length === 0) {
        errors = true;

        // set flash message
        req.flash('error', "Silahkan Masukkan nama");
        // render to add.ejs with flash message
        res.render('layanan/create', {
            nama: nama,
            image: image,
            image_link: image_link,
            detail: detail
        })
    }

    if(image.length === 0) {
        errors = true;

        // set flash message
        req.flash('error', "Silahkan Masukkan image");
        // render to add.ejs with flash message
        res.render('layanan/create', {
            nama: nama,
            image: image,
            image_link: image_link,
            detail: detail
        })
    }
    if(image_link.length === 0) {
        errors = true;

        // set flash message
        req.flash('error', "Silahkan Masukkan image_link");
        // render to add.ejs with flash message
        res.render('layanan/create', {
            nama: nama,
            image: image,
            image_link: image_link,
            detail: detail
        })
    }
    if(detail.length === 0) {
        errors = true;

        // set flash message
        req.flash('error', "Silahkan Masukkan detail");
        // render to add.ejs with flash message
        res.render('layanan/create', {
            nama: nama,
            image: image,
            image_link: image_link,
            detail: detail
        })
    }

    // if no error
    if(!errors) {

        let formData = {
            nama: nama,
            image: image,
            image_link: image_link,
            detail: detail
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
                    image_link: formData.image_link,
                    detail: formData.detail          
                })
            } else {                
                req.flash('success', 'Data Berhasil Disimpan!');
                res.redirect('/layanan');
            }
        })
    }

})
/**
 * EDIT layanan
 */
router.get('/edit/(:nama)', function(req, res, next) {

    let nama = req.params.nama;
   
    connection.query('SELECT * FROM layanan WHERE nama = ' + nama, function(err, rows, fields) {
        if(err) throw err
         
        // if user not found
        if (rows.length <= 0) {
            req.flash('error', 'Data Layanan Dengan nama ' + nama + " Tidak Ditemukan")
            res.redirect('/layanan')
        }
        // if book found
        else {
            // render to edit.ejs
            res.render('layanan/edit', {
                nama:      rows[0].nama,
                image:   rows[0].image,
                image_link: rows[0].image_link,
                detail: rows[0].detail
            })
        }
    })
})

/**
 * UPDATE layanan
 */
router.post('/update/:nama', function(req, res, next) {

    let nama      = req.params.nama;
    let image   = req.body.image;
    let image_link = req.body.image_link;
    let detail = req.body.detail;
    let errors  = false;

    if(image.length === 0) {
        errors = true;

        // set flash message
        req.flash('error', "Silahkan Masukkan image");
        // render to edit.ejs with flash message
        res.render('layanan/edit', {
            nama:         req.params.nama,
            image:      image,
            image_link:    image_link,
            detail: detail
        })
    }

    if(image_link.length === 0) {
        errors = true;

        // set flash message
        req.flash('error', "Silahkan Masukkan Konten");
        // render to edit.ejs with flash message
        res.render('layanan/edit', {
            nama:         req.params.nama,
            image:      image,
            image_link:    image_link,
            detail: detail
        })
    }

    // if no error
    if( !errors ) {   
 
        let formData = {
            image: image,
            image_link: image_link,
            detail: detail
        }

        // update query
        connection.query('UPDATE layanan SET ? WHERE nama = ' + nama, formData, function(err, result) {
            //if(err) throw err
            if (err) {
                // set flash message
                req.flash('error', err)
                // render to edit.ejs
                res.render('layanan/edit', {
                    nama:     req.params.nama,
                    image:   formData.image,
                    image_link: formData.image_link,
                    detail: formData.detail
                })
            } else {
                req.flash('success', 'Data Berhasil Diupdate!');
                res.redirect('/layanan');
            }
        })
    }
})
/**
 * DELETE POST
 */
router.get('/delete/(:id)', function(req, res, next) {

    let id = req.params.id;
     
    connection.query('DELETE FROM layanan WHERE id = ' + id, function(err, result) {
        //if(err) throw err
        if (err) {
            // set flash message
            req.flash('error', err)
            // redirect to layanan page
            res.redirect('/layanan')
        } else {
            // set flash message
            req.flash('success', 'Data Berhasil Dihapus!')
            // redirect to layanan page
            res.redirect('/layanan')
        }
    })
})

module.exports = router;
