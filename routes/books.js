const express = require('express');
const router = express.Router();
const db = require('../models/db');

router.get('/', (req, res) => {
  db.query('SELECT * FROM books', (err, results) => {
    if (err) {
      res.status(500).json({ error: 'An error occurred while fetching books.' });
    } else {
      res.json(results);
    }
  });
});

router.get('/:book_id', (req, res) => {
  const bookId = req.params.book_id;
  db.query('SELECT * FROM books WHERE id = ?', [bookId], (err, results) => {
    if (err) {
      res.status(500).json({ error: 'An error occurred while fetching the book.' });
    } else if (results.length === 0) {
      res.status(404).json({ error: 'Book not found.' });
    } else {
      res.json(results[0]);
    }
  });
});

router.post('/', (req, res) => {
  const newBook = req.body;
  db.query('INSERT INTO books SET ?', newBook, (err, results) => {
    if (err) {
      res.status(500).json({ error: 'An error occurred while creating the book.' });
    } else {
      res.status(201).json({ message: 'Book created successfully' });
    }
  });
});

router.put('/:book_id', (req, res) => {
  const bookId = req.params.book_id;
  const updatedBook = req.body;
  db.query('UPDATE books SET ? WHERE id = ?', [updatedBook, bookId], (err, results) => {
    if (err) {
      res.status(500).json({ error: 'An error occurred while updating the book.' });
    } else {
      res.json({ message: 'Book updated successfully' });
    }
  });
});

router.delete('/:book_id', (req, res) => {
  const bookId = req.params.book_id;
  db.query('DELETE FROM books WHERE id = ?', [bookId], (err, results) => {
    if (err) {
      res.status(500).json({ error: 'An error occurred while deleting the book.' });
    } else {
      res.json({ message: 'Book deleted successfully' });
    }
  });
});

module.exports = router;
