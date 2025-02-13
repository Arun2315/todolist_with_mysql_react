const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all todos
router.get('/', (req, res) => {
  db.query('SELECT * FROM todos', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Add new todo
router.post('/', (req, res) => {
  const { title, description } = req.body;
  db.query('INSERT INTO todos (title, description) VALUES (?, ?)', [title, description], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ id: result.insertId, title, description, completed: 0 });
  });
});

// Update todo
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;
  db.query('UPDATE todos SET title = ?, description = ?, completed = ? WHERE id = ?', [title, description, completed, id], (err) => {
    if (err) return res.status(500).send(err);
    res.json({ id, title, description, completed });
  });
});

// Delete todo
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM todos WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).send(err);
    res.json({ message: 'Todo deleted' });
  });
});

module.exports = router;
