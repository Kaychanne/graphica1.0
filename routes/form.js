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

router.get('/handle/:id', function(req, res, next) {
    let id = req.params.id;
    connection.query('UPDATE pesanan SET status = ? WHERE id = ?', ['in-progress', id], function(err, result) {
        if (err) {
            req.flash('error', err.message);
        } else {
            req.flash('success', 'Pesanan Sedang Dihandle!');
        }
        res.redirect('/form');
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
        res.redirect('/form');
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
        res.redirect('/form');
    });
});

module.exports = router;
