var express = require('express');
var router = express.Router();
var connection = require('../lib/db');
var multer = require('multer');
var path = require('path');
var fs = require('fs');

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
 * INDEX PORTOFOLIO
 */
router.get('/', function (req, res, next) {
    //query
    connection.query('SELECT * FROM portofolio ORDER BY id desc', function (err, rows) {
        if (err) {
            req.flash('error', err);
            res.render('portofolio', {
                data: ''
            });
        } else {
            //render ke view portofolio index
            res.render('portofolio/index', {
                data: rows // <-- data posts
            });
        }
    });
});

/**
 * CREATE PORTOFOLIO
 */
router.get('/create', function (req, res, next) {
    res.render('portofolio/create', {
        nama: '',
        image: '',
        image_link: ''
    })
})

/**
 * STORE PORTOFOLIO
 */
router.post('/store', upload.single('image'), function (req, res, next) {
    let { nama, image_link } = req.body;
    let image = req.file ? req.file.filename : null;
    let errors = false;

    if (!nama || !image || !image_link) {
        errors = true;
        req.flash('error', 'Please fill all fields');
        res.render('portofolio/create', { nama, image: '', image_link });
    }

    if (!errors) {
        let formData = { nama, image, image_link };
        connection.query('INSERT INTO portofolio SET ?', formData, function (err, result) {
            if (err) {
                req.flash('error', err);
                res.render('portofolio/create', { nama, image: '', image_link });
            } else {
                req.flash('success', 'Data Saved Successfully!');
                res.redirect('/portofolio');
            }
        });
    }
});

/**
 * EDIT PORTOFOLIO
 */
router.get('/edit/:id', function (req, res, next) {
    let id = req.params.id;
    connection.query('SELECT * FROM portofolio WHERE id = ?', [id], function (err, rows) {
        if (err) throw err;
        if (rows.length <= 0) {
            req.flash('error', `Data with ID ${id} not found`);
            res.redirect('/portofolio');
        } else {
            res.render('portofolio/edit', { ...rows[0] });
        }
    });
});

/**
 * UPDATE PORTOFOLIO
 */
router.post('/update/:id', upload.single('image'), function (req, res, next) {
    let id = req.params.id;
    let { nama, image_link } = req.body;
    let image = req.file ? req.file.filename : null;
    let errors = false;

    if (!nama || !image_link) {
        errors = true;
        req.flash('error', 'Please fill all fields');
        res.render('portofolio/edit', { id, nama, image: '', image_link });
    }

    if (!errors) {
        let formData = { nama, image_link };
        if (image) {
            formData.image = image;
        }
        connection.query('UPDATE portofolio SET ? WHERE id = ?', [formData, id], function (err, result) {
            if (err) {
                req.flash('error', err);
                res.render('portofolio/edit', { id, nama, image: '', image_link });
            } else {
                req.flash('success', 'Data Updated Successfully!');
                res.redirect('/portofolio');
            }
        });
    }
});

/**
 * DELETE PORTOFOLIO
 */
router.get('/delete/(:id)', function(req, res, next) {

    let id = req.params.id;
     
    connection.query('DELETE FROM portofolio WHERE id = ' + id, function(err, result) {
        //if(err) throw err
        if (err) {
            // set flash message
            req.flash('error', err)
            // redirect to posts page
            res.redirect('/portofolio')
        } else {
            // set flash message
            req.flash('success', 'Data Berhasil Dihapus!')
            // redirect to posts page
            res.redirect('/portofolio')
        }
    })
})

module.exports = router;