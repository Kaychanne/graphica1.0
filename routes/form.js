var express = require('express');
var router = express.Router();
var connection = require('../lib/db');

function renderIndexPage(req, res, next) {
    connection.query('SELECT * FROM pesanan ORDER BY id DESC', function (err, rows) {
        if (err) {
            req.flash('error', err.message);
            res.render('form', {
                data: {
                    newOrders: [],
                    inProgressOrders: [],
                    completedOrders: []
                },
                messages: req.flash()
            });
        } else {
            const newOrders = rows.filter(order => order.status === 'new');
            const inProgressOrders = rows.filter(order => order.status === 'in-progress');
            const completedOrders = rows.filter(order => order.status === 'completed');
            res.render('form/index', {
                data: {
                    newOrders: newOrders,
                    inProgressOrders: inProgressOrders,
                    completedOrders: completedOrders
                },
                messages: req.flash()
            });
        }
    });
}

router.get('/', function(req, res, next) {
    renderIndexPage(req, res, next);
});
    // if (email.length === 0) {
    //     req.flash('error', "Silahkan Masukkan Email");
    //     errors = true; 
    // }
    // if (nama.length === 0) {
    //     req.flash('error', "Silahkan Masukkan Nama");
    //     errors = true; 
    // }
    // if (notelp.length === 0) {
    //     req.flash('error', "Silahkan Masukkan Nomor Telepon");
    //     errors = true; 
    // }
    // if (layanan.length === 0) {
    //     req.flash('error', "Silahkan Masukkan Layanan");
    //     errors = true; 
    // }
    // if (paket.length === 0) {
    //     req.flash('error', "Silahkan Masukkan Paket");
    //     errors = true; 
    // }
    // if (deskripsi.length === 0) {
    //     req.flash('error', "Silahkan Masukkan Deskripsi");
    //     errors = true; 
    // }

    // if (errors) {
    //     res.render('create', {
    //         email: email,
    //         nama: nama,
    //         notelp: notelp,
    //         layanan: layanan,
    //         paket: paket,
    //         deskripsi: deskripsi,
    //         messages: req.flash() 
    //     });
    // } else {
    //     let formData = {
    //         email: email,
    //         nama: nama,
    //         notelp: notelp,
    //         layanan: layanan,
    //         paket: paket,
    //         deskripsi: deskripsi,
    //         status: 'new'
    //     };

    //     connection.query('INSERT INTO pesanan SET ?', formData, function(err, result) {
    //         if (err) {
    //             req.flash('error', err.message);
    //             res.render('create', {
    //                 email: formData.email,
    //                 nama: formData.nama,
    //                 notelp: formData.notelp,
    //                 layanan: formData.layanan,
    //                 paket: formData.paket,
    //                 deskripsi: formData.deskripsi,
    //                 messages: req.flash() 
    //             });
    //         } else {
    //             req.flash('success', 'Data Berhasil Disimpan!');
    //             res.redirect('/'); 
    //         }
    //     });
    // }
// });

router.get('/handle/:id', function(req, res, next) {
    let id = req.params.id;
    connection.query('UPDATE pesanan SET status = ? WHERE id = ?', ['in-progress', id], function(err, result) {
        if (err) {
            req.flash('error', err.message);
        } else {
            req.flash('success', 'Pesanan Sedang Dihandle!');
        }
        res.redirect('/');
    });
});

router.get('/cancel/:id', function(req, res, next) {
    let id = req.params.id;
    connection.query('DELETE FROM pesanan WHERE id = ?', [id], function(err, result) {
        if (err) {
            req.flash('error', err.message);
        } else {
            req.flash('success', 'Pesanan Berhasil Dibatalkan!');
        }
        res.redirect('/');
    });
});

router.get('/complete/:id', function(req, res, next) {
    let id = req.params.id;
    connection.query('UPDATE pesanan SET status = ? WHERE id = ?', ['completed', id], function(err, result) {
        if (err) {
            req.flash('error', err.message);
        } else {
            req.flash('success', 'Pesanan Selesai!');
        }
        res.redirect('/');
    });
});

module.exports = router;
