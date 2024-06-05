var express = require('express');
var router = express.Router();
var connection = require('../lib/db');

// Read - List all artikel
router.get('/', (req, res, next) => {
  connection.query('SELECT * FROM artikel', (err, rows) => {
    if (err) {
      req.flash('error', err);
      res.render('artikel/index', { data: '' });
    } else {
      res.render('artikel/index', { data: rows });
    }
  });
});

// Create - Show create form
router.get('/create', (req, res, next) => {
  res.render('artikel/create', {
    title: '',
    content: ''
  });
});

// Create - Save new article
router.post('/create', (req, res, next) => {
  var { title, content } = req.body;
  var form_data = {
    title: title,
    content: content
  };

  connection.query('INSERT INTO artikel SET ?', form_data, (err, result) => {
    if (err) {
      req.flash('error', err);
      res.render('artikel/create', {
        title: form_data.title,
        content: form_data.content
      });
    } else {
      req.flash('success', 'Article added successfully!');
      res.redirect('/artikel');
    }
  });
});

// Update - Show edit form
router.get('/edit/:id', (req, res, next) => {
  var id = req.params.id;

  connection.query('SELECT * FROM artikel WHERE id = ' + id, (err, rows) => {
    if (err) throw err;

    if (rows.length <= 0) {
      req.flash('error', 'Article not found with id = ' + id);
      res.redirect('/artikel');
    } else {
      res.render('artikel/edit', {
        id: rows[0].id,
        title: rows[0].title,
        content: rows[0].content
      });
    }
  });
});

// Update - Save edited article
router.post('/update/:id', (req, res, next) => {
  var id = req.params.id;
  var { title, content } = req.body;
  var form_data = {
    title: title,
    content: content
  };

  connection.query('UPDATE artikel SET ? WHERE id = ' + id, form_data, (err, result) => {
    if (err) {
      req.flash('error', err);
      res.render('artikel/edit', {
        id: req.params.id,
        title: form_data.title,
        content: form_data.content
      });
    } else {
      req.flash('success', 'Article updated successfully!');
      res.redirect('/artikel');
    }
  });
});

// Delete - Delete article
router.get('/delete/:id', (req, res, next) => {
  var id = req.params.id;

  connection.query('DELETE FROM artikel WHERE id = ' + id, (err, result) => {
    if (err) {
      req.flash('error', err);
      res.redirect('/artikel');
    } else {
      req.flash('success', 'Article deleted successfully! id = ' + id);
      res.redirect('/artikel');
    }
  });
});

module.exports = router;