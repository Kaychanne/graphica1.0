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

router.get('/create', function(req, res, next) {
    res.render('create', { email: '', nama: '', notelp: '', layanan:'', paket:'', deskripsi:'', messages: {} }); 
  });

router.post('/pesanan', function (req, res, next) {
    let email = req.body.email;
    let nama = req.body.username;
    let notelp = req.body.notelp;
    let layanan = req.body.layanan; 
    let paket = req.body.paket;
    let deskripsi = req.body.deskripsi;  
    let errors = false;

    if (email.length === 0) {
        req.flash('error', "Silahkan Masukkan Email");
        errors = true; 
    }
    if (nama.length === 0) {
        req.flash('error', "Silahkan Masukkan Nama");
        errors = true; 
    }
    if (notelp.length === 0) {
        req.flash('error', "Silahkan Masukkan Nomor Telepon");
        errors = true; 
    }
    if (layanan.length === 0) {
        req.flash('error', "Silahkan Masukkan Layanan");
        errors = true; 
    }
    if (paket.length === 0) {
        req.flash('error', "Silahkan Masukkan Paket");
        errors = true; 
    }
    if (deskripsi.length === 0) {
        req.flash('error', "Silahkan Masukkan Deskripsi");
        errors = true; 
    }
    

    if (errors) {
        res.render('create', {
            email: email,
            nama: nama,
            notelp: notelp,
            layanan: layanan,
            paket: paket,
            deskripsi: deskripsi,
            messages: req.flash() 
        });
    } else {
        let formData = {
            email: email,
            nama: nama,
            notelp: notelp,
            layanan: layanan,
            paket: paket,
            deskripsi: deskripsi
        };

        connection.query('INSERT INTO pesanan SET ?', formData, function(err, result) {
            if (err) {
                req.flash('error', err.message);
                res.render('create', {
                    email: formData.email,
                    nama: formData.nama,
                    notelp: formData.notelp,
                    layanan: formData.layanan,
                    paket: formData.paket,
                    deskripsi: formData.deskripsi,
                    messages: req.flash() 
                });
            } else {
                req.flash('success', 'Data Berhasil Disimpan!');
                res.redirect('/'); 
            }
        });
    }
});

router.get('/update/(:id)', function(req, res, next) {
    let id = req.params.id;
    connection.query('SELECT * FROM pesanan WHERE id = ' + id, function(err, rows, fields) {
        if(err) throw err
        if (rows.length <= 0) {
            req.flash('error', 'Data Post Dengan ID ' + id + " Tidak Ditemukan")
            res.redirect('/')
        }
        else {
            res.render('update', {
                email:   rows[0].email,
                nama: rows[0].nama,
                notelp: rows[0].notelp,
                layanan: rows[0].layanan,
                paket: rows[0].paket,
                deskripsi: rows[0].deskripsi,
            })
        }
    })
})

router.post('/update/:id', function(req, res, next) {
    let id      = req.params.id;
    let email = req.body.email;
    let nama = req.body.username;
    let notelp = req.body.notelp;
    let layanan = req.body.layanan; 
    let paket = req.body.paket;
    let deskripsi = req.body.deskripsi; 
    let errors  = false;

    if(email.length === 0) {
        errors = true;
        req.flash('error', "Silahkan Masukkan email");
        res.render('update', {
            id:req.params.id,
            email: email,
            nama: nama,
            notelp: notelp,
            layanan: layanan,
            paket: paket,
            deskripsi: deskripsi
        })
    }

    if(nama.length === 0) {
        errors = true;
        req.flash('error', "Silahkan Masukkan Nama");
        res.render('update', {
            id:         req.params.id,
            email:      email,
            nama: nama,
            notelp: notelp,
            layanan: layanan,
            paket: paket,
            deskripsi: deskripsi
        })
    }

    if(notelp.length === 0) {
        errors = true;
        req.flash('error', "Silahkan Masukkan Nomor Telepon");
        res.render('update', {
            id:         req.params.id,
            email:      email,
            nama: nama,
            notelp: notelp,
            layanan: layanan,
            paket: paket,
            deskripsi: deskripsi
        })
    }

    if(layanan.length === 0) {
        errors = true;
        req.flash('error', "Silahkan Masukkan Layanan");
        res.render('update', {
            id:         req.params.id,
            email:      email,
            nama: nama,
            notelp: notelp,
            layanan: layanan,
            paket: paket,
            deskripsi: deskripsi
        })
    }

    if(paket.length === 0) {
        errors = true;
        req.flash('error', "Silahkan Masukkan Paket");
        res.render('update', {
            id:         req.params.id,
            email:      email,
            nama: nama,
            notelp: notelp,
            layanan: layanan,
            paket: paket,
            deskripsi: deskripsi
        })
    }

    if(deskripsi.length === 0) {
        errors = true;
        req.flash('error', "Silahkan Masukkan Deskripsi");
        res.render('update', {
            id:         req.params.id,
            email:      email,
            nama: nama,
            notelp: notelp,
            layanan: layanan,
            paket: paket,
            deskripsi: deskripsi
        })
    }
    if( !errors ) {   
 
        let formData = {
            email: email,
            nama: nama,
            notelp: notelp,
            layanan: layanan,
            paket: paket,
            deskripsi: deskripsi
        }

        connection.query('UPDATE pesanan SET ? WHERE id = ' + id, formData, function(err, result) {
            if (err) {
                req.flash('error', err)
                res.render('update', {
                    id:     req.params.id,
                    email: formData.email,
                    nama: formData.nama,
                    notelp: formData.notelp,
                    layanan: formData.layanan,
                    paket: formData.paket,
                    deskripsi: formData.deskripsi,
                })
            } else {
                req.flash('success', 'Data Berhasil Diupdate!');
                res.redirect('/');
            }
        })
    }
})


router.get('/delete/(:id)', function(req, res, next) {
    let id = req.params.id;
    connection.query('DELETE FROM pesanan WHERE id = ' + id, function(err, result) {
        if (err) {
            req.flash('error', err)
            res.redirect('/')
        } else {
            req.flash('success', 'Data Berhasil Dihapus!')
            res.redirect('/')
        }
    })
})
module.exports = router;
