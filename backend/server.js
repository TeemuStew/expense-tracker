const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const db = new sqlite3.Database('./expenses.db');

app.use(cors());
app.use(bodyParser.json());

// Create expenses table with category column
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS expenses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            description TEXT,
            amount REAL,
            date TEXT,
            category TEXT
        )
    `);
});

// Fetch all expenses
app.get('/api/expenses', (req, res) => {
    db.all("SELECT * FROM expenses", [], (err, rows) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.json({ data: rows });
    });
});

// Add an expense
app.post('/api/expenses', (req, res) => {
    const { description, amount, date, category } = req.body;
    db.run(
        `INSERT INTO expenses (description, amount, date, category) VALUES (?, ?, ?, ?)`,
        [description, amount, date, category],
        function(err) {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            res.json({ id: this.lastID });
        }
    );
});

// Update an expense by ID
app.put('/api/expenses/:id', (req, res) => {
    const { description, amount, date, category } = req.body;
    db.run(
        `UPDATE expenses SET description = ?, amount = ?, date = ?, category = ? WHERE id = ?`,
        [description, amount, date, category, req.params.id],
        function(err) {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            res.json({ updatedID: req.params.id });
        }
    );
});

// Delete an expense by ID
app.delete('/api/expenses/:id', (req, res) => {
    db.run(
        `DELETE FROM expenses WHERE id = ?`,
        req.params.id,
        function(err) {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            res.json({ deletedID: req.params.id });
        }
    );
});

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
