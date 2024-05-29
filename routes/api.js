var express = require("express");
var router = express.Router();

//import database
var connection = require("../lib/db");
var com = require("../lib/com");
router.post('/1234567890', async function(req, res, next){
    const{email, nama, notelp, layanan, paket, deskripsi} =req.body;
    console.log(req.body);
    const bodyData = {
        email: email,
        nama: nama,
        notelp: notelp,
        layanan: layanan,
        paket: paket,
        deskripsi: deskripsi
    };

    await com.talk("http://localhost:3000/api/pesanan", "json", bodyData, (response) => {
        response.json().then((data) => {
            res.json(data);
        });
    });
})  

router.post('/pesanan', function (req, res, next) {
    let email = req.body.email;
    let nama = req.body.nama;
    let notelp = req.body.notelp;
    let layanan = req.body.layanan; 
    let paket = req.body.paket;
    let deskripsi = req.body.deskripsi;  
    let errors = false;

    try {
        if (email.length === 0) {
            req.flash('error', "Silahkan Masukkan Email");
            errors = true;
            throw new Error("Missing required fields: email");
        }
        if (nama.length === 0) {
            req.flash('error', "Silahkan Masukkan Nama");
            errors = true; 
            throw new Error("Missing required fields: nama");
        }
        if (notelp.length === 0) {
            req.flash('error', "Silahkan Masukkan Nomor Telepon");
            errors = true; 
            throw new Error("Missing required fields: notelp");
        }
        if (layanan.length === 0) {
            req.flash('error', "Silahkan Masukkan Layanan");
            errors = true; 
            throw new Error("Missing required fields: layanan");
        }
        if (paket.length === 0) {
            req.flash('error', "Silahkan Masukkan Paket");
            errors = true; 
            throw new Error("Missing required fields: paket");
        }
        if (deskripsi.length === 0) {
            req.flash('error', "Silahkan Masukkan Deskripsi");
            errors = true; 
            throw new Error("Missing required fields: deskripsi");
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
                deskripsi: deskripsi,
                status: 'new'
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
                    res.json({messages:'Berhasil Disimpan!'})
                }
            });
        }
    } catch (error) {
        console.error("Error in /api/pesanan route:", error.message);
		res.status(400).json({ error: error.message});
    }
});

module.exports = router;