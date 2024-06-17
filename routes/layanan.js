var express = require('express');
var router = express.Router();
var connection = require('../lib/db'); // Adjust the path if necessary
var multer = require('multer');
var path = require('path');
var fs = require('fs'); // Add this line to require the fs module

// Ensure uploads directory exists
var uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

// Setup Multer for file uploads
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
var upload = multer({ storage: storage });
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
router.post('/store', upload.single('image'), function (req, res, next) {
    let { nama, image_link, detail } = req.body;
    let image = req.file ? req.file.filename : null;
    let errors = false;

    if (!nama || !image || !image_link || !detail) {
        errors = true;
        req.flash('error', 'Please fill all fields');
        res.render('layanan/create', { nama, image: '', image_link, detail });
    }

    if (!errors) {
        let formData = { nama, image, image_link, detail };
        connection.query('INSERT INTO layanan SET ?', formData, function (err, result) {
            if (err) {
                req.flash('error', err);
                res.render('layanan/create', { nama, image: '', image_link, detail });
            } else {
                req.flash('success', 'Data Saved Successfully!');
                res.redirect('/layanan');
            }
        });
    }
});
/**
 * EDIT layanan
 */
router.get('/edit/(:id)', function(req, res, next) {

    let id = req.params.id;
   
    connection.query('SELECT * FROM layanan WHERE id = ' + id, function(err, rows, fields) {
        if(err) throw err
         
        // if user not found
        if (rows.length <= 0) {
            req.flash('error', 'Data Layanan Dengan ID ' + id + " Tidak Ditemukan")
            res.redirect('/layanan')
        }
        // if book found
        else {
            // render to edit.ejs
            res.render('layanan/edit', {
                id:      rows[0].id,
                nama:    rows[0].nama,
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
router.post('/update/:id', function(req, res, next) {

    let id     = req.params.id;
    let nama      = req.body.nama;
    let image   = req.body.image;
    let image_link = req.body.image_link;
    let detail = req.body.detail;
    let errors  = false;

    if(nama.length === 0) {
        errors = true;

        // set flash message
        req.flash('error', "Silahkan Masukkan nama");
        // render to edit.ejs with flash message
        res.render('layanan/edit', {
            id:         req.params.id,
            nama:       nama,
            image:      image,
            image_link: image_link,
            detail: detail
        })
    }


    if(image.length === 0) {
        errors = true;

        // set flash message
        req.flash('error', "Silahkan Masukkan image");
        // render to edit.ejs with flash message
        res.render('layanan/edit', {
            id:         req.params.id,
            nama:       nama,
            image:      image,
            image_link: image_link,
            detail: detail
        })
    }

    if(image_link.length === 0) {
        errors = true;

        // set flash message
        req.flash('error', "Silahkan Masukkan Image Link");
        // render to edit.ejs with flash message
        res.render('layanan/edit', {
            id:         req.params.id,
            nama:       nama,
            image:      image,
            image_link: image_link,
            detail: detail
        })
    }

    if(detail.length === 0) {
        errors = true;

        // set flash message
        req.flash('error', "Silahkan Masukkan Detail");
        // render to edit.ejs with flash message
        res.render('layanan/edit', {
            id:         req.params.id,
            nama:       nama,
            image:      image,
            image_link: image_link,
            detail: detail
        })
    }

    // if no error
    if( !errors ) {   
 
        let formData = {
            nama: nama,
            image: image,
            image_link: image_link,
            detail: detail
        }

        // update query
        connection.query('UPDATE layanan SET ? WHERE id = ' + id, formData, function(err, result) {
            //if(err) throw err
            if (err) {
                // set flash message
                req.flash('error', err)
                // render to edit.ejs
                res.render('layanan/edit', {
                    id:     req.params.id,
                    nama:   formData.nama,
                    image:  formData.image,
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
