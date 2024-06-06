var express = require('express');
var router = express.Router();
var connection = require('../lib/db');

/**
 * INDEX POSTS
 */
router.get('/', function (req, res, next) {
    //query
    connection.query('SELECT * FROM user ORDER BY id desc', function (err, rows) {
        if (err) {
            req.flash('error', err);
            res.render('posts', {
                data: ''
            });
        } else {
            //render ke view posts index
            res.render('posts/index', {
                data: rows // <-- data posts
            });
        }
    });
});

/**
 * CREATE POST
 */
router.get('/create', function (req, res, next) {
    res.render('posts/create', {
        email: '',
        username: '',
        password: ''
    })
})

/**
 * STORE POST
 */
router.post('/store', function (req, res, next) {
    
    let email   = req.body.email;
    let username = req.body.username;
    let password = req.body.password;
    let errors  = false;    

    if(email.length === 0) {
        errors = true;

        // set flash message
        req.flash('error', "Silahkan Masukkan email");
        // render to add.ejs with flash message
        res.render('posts/create', {
            email: email,
            username: username,
            password: password
        })
    }

    if(username.length === 0) {
        errors = true;

        // set flash message
        req.flash('error', "Silahkan Masukkan username");
        // render to add.ejs with flash message
        res.render('posts/create', {
            email: email,
            username: username,
            password: password
        })
    }

    if(password.length === 0) {
        errors = true;

        // set flash message
        req.flash('error', "Silahkan Masukkan password");
        // render to add.ejs with flash message
        res.render('posts/create', {
            email: email,
            username: username,
            password: password
        })
    }

    // if no error
    if(!errors) {

        let formData = {
            email: email,
            username: username,
            password: password
        }

        // insert query
        connection.query('INSERT INTO user SET ?', formData, function(err, result) {
            //if(err) throw err
            if (err) {
                req.flash('error', err);
                 
                // render to add.ejs
                res.render('posts/create', {
                    email: formData.email,
                    username: formData.username,
                    password: formData.password                  
                });
            } else {             
                req.flash('success', 'Data Berhasil Disimpan!');
                res.redirect('/posts');
            }
        })
    }

})

/**
 * EDIT POST
 */
router.get('/edit/(:id)', function(req, res, next) {

    let id = req.params.id;
   
    connection.query('SELECT * FROM user WHERE id = ' + id, function(err, rows, fields) {
        if(err) throw err
         
        // if user not found
        if (rows.length <= 0) {
            req.flash('error', 'Data Post Dengan ID ' + id + " Tidak Ditemukan")
            res.redirect('/posts')
        }
        // if book found
        else {
            // render to edit.ejs
            res.render('posts/edit', {
                id:      rows[0].id,
                email:   rows[0].email,
                username: rows[0].username,
                password: rows[0].password
            })
        }
    })
})
/**
 * UPDATE POST
 */
router.post('/update/:id', function(req, res, next) {

    let id      = req.params.id;
    let email   = req.body.email;
    let username = req.body.username;
    let password = req.body.password;
    let errors  = false;

    if(email.length === 0) {
        errors = true;

        // set flash message
        req.flash('error', "Silahkan Masukkan Email");
        // render to edit.ejs with flash message
        res.render('posts/edit', {
            id:         req.params.id,
            email:      email,
            username:   username,
            password:   password
        })
    }

    if(username.length === 0) {
        errors = true;

        // set flash message
        req.flash('error', "Silahkan Masukkan Username");
        // render to edit.ejs with flash message
        res.render('posts/edit', {
            id:         req.params.id,
            email:      email,
            username:   username,
            password:   password
        })
    }

    if(password.length === 0) {
        errors = true;

        // set flash message
        req.flash('error', "Silahkan Masukkan Password");
        // render to edit.ejs with flash message
        res.render('posts/edit', {
            id:         req.params.id,
            email:      email,
            username:   username,
            password:   password
        })
    }

    // if no error
    if( !errors ) {   
 
        let formData = {
            email:      email,
            username:   username,
            password:   password
        }

        // update query
        connection.query('UPDATE user SET ? WHERE id = ' + id, formData, function(err, result) {
            //if(err) throw err
            if (err) {
                // set flash message
                req.flash('error', err)
                // render to edit.ejs
                res.render('posts/edit', {
                    id:     req.params.id,
                    email:   formData.email,
                    username: formData.username,
                    password: formData.password
                })
            } else {
                req.flash('success', 'Data Berhasil Diupdate!');
                res.redirect('/posts');
            }
        })
    }
})

/**
 * DELETE POST
 */
router.get('/delete/(:id)', function(req, res, next) {

    let id = req.params.id;
     
    connection.query('DELETE FROM user WHERE id = ' + id, function(err, result) {
        //if(err) throw err
        if (err) {
            // set flash message
            req.flash('error', err)
            // redirect to posts page
            res.redirect('/posts')
        } else {
            // set flash message
            req.flash('success', 'Data Berhasil Dihapus!')
            // redirect to posts page
            res.redirect('/posts')
        }
    })
})

module.exports = router;