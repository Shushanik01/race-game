const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const DB_PATH = path.join(__dirname, 'db.json');

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Expose-Headers', 'X-Total-Count');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

const loadDB = () => JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
const saveDB = (data) => fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));

const nextId = (items) =>
  items.length > 0 ? Math.max(...items.map((x) => x.id)) + 1 : 1;


app.get('/garage', (req, res) => {
  const db = loadDB();
  const page = parseInt(req.query._page) || 1;
  const limit = parseInt(req.query._limit) || 7;
  const start = (page - 1) * limit;
  res.setHeader('X-Total-Count', db.garage.length);
  res.json(db.garage.slice(start, start + limit));
});

app.get('/garage/:id', (req, res) => {
  const car = loadDB().garage.find((c) => c.id === parseInt(req.params.id));
  car ? res.json(car) : res.status(404).json({ error: 'Car not found' });
});

app.post('/garage', (req, res) => {
  const db = loadDB();
  const car = { id: nextId(db.garage), ...req.body };
  db.garage.push(car);
  saveDB(db);
  res.status(201).json(car);
});

app.put('/garage/:id', (req, res) => {
  const db = loadDB();
  const idx = db.garage.findIndex((c) => c.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Car not found' });
  db.garage[idx] = { id: parseInt(req.params.id), ...req.body };
  saveDB(db);
  res.json(db.garage[idx]);
});

app.delete('/garage/:id', (req, res) => {
  const db = loadDB();
  const idx = db.garage.findIndex((c) => c.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Car not found' });
  db.garage.splice(idx, 1);
  saveDB(db);
  res.json({ success: true });
});


app.patch('/engine', (req, res) => {
  const { id, status } = req.query;
  if (!id || !status) return res.status(400).json({ error: 'id and status are required' });

  if (status === 'started') {
    const velocity = Math.floor(Math.random() * 150) + 50;
    const distance = 500000;
    return res.json({ velocity, distance });
  }

  if (status === 'drive') {
    const success = Math.random() > 0.1;
    return success ? res.json({ success: true }) : res.status(500).json({ success: false });
  }

  if (status === 'stopped') {
    return res.json({ success: true });
  }

  res.status(400).json({ error: 'Invalid status' });
});


app.get('/winners', (req, res) => {
  const db = loadDB();
  let winners = [...db.winners];

  const sort = req.query._sort || 'id';
  const order = (req.query._order || 'ASC').toUpperCase();
  winners.sort((a, b) => (order === 'ASC' ? a[sort] - b[sort] : b[sort] - a[sort]));

  const page = parseInt(req.query._page) || 1;
  const limit = parseInt(req.query._limit) || 10;
  const start = (page - 1) * limit;
  res.setHeader('X-Total-Count', db.winners.length);
  res.json(winners.slice(start, start + limit));
});

app.get('/winners/:id', (req, res) => {
  const winner = loadDB().winners.find((w) => w.id === parseInt(req.params.id));
  winner ? res.json(winner) : res.status(404).json({ error: 'Winner not found' });
});

app.post('/winners', (req, res) => {
  const db = loadDB();
  const winner = req.body;
  db.winners.push(winner);
  saveDB(db);
  res.status(201).json(winner);
});

app.put('/winners/:id', (req, res) => {
  const db = loadDB();
  const idx = db.winners.findIndex((w) => w.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Winner not found' });
  db.winners[idx] = { id: parseInt(req.params.id), ...req.body };
  saveDB(db);
  res.json(db.winners[idx]);
});

app.delete('/winners/:id', (req, res) => {
  const db = loadDB();
  const idx = db.winners.findIndex((w) => w.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Winner not found' });
  db.winners.splice(idx, 1);
  saveDB(db);
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Race API server running at http://localhost:${PORT}`);
});
