import express from 'express';
import cors from 'cors';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json({ limit: '20mb' }));

// Map entity names to JSON file paths
const dataFiles = {
  NewsArticle: path.join(__dirname, 'data', 'news.json'),
  Supporter: path.join(__dirname, 'data', 'supporters.json'),
  Testimonial: path.join(__dirname, 'data', 'testimonials.json'),
};

function readData(entity) {
  try {
    return JSON.parse(readFileSync(dataFiles[entity], 'utf-8'));
  } catch {
    return [];
  }
}

function writeData(entity, data) {
  writeFileSync(dataFiles[entity], JSON.stringify(data, null, 2), 'utf-8');
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

// GET /api/:entity  — list all records, optional ?sort=-field
app.get('/api/:entity', (req, res) => {
  const { entity } = req.params;
  if (!dataFiles[entity]) return res.status(404).json({ error: 'Unknown entity' });

  let records = readData(entity);
  const sort = req.query.sort;
  if (sort) {
    const desc = sort.startsWith('-');
    const field = desc ? sort.slice(1) : sort;
    records = [...records].sort((a, b) => {
      const av = a[field] ?? '';
      const bv = b[field] ?? '';
      if (av < bv) return desc ? 1 : -1;
      if (av > bv) return desc ? -1 : 1;
      return 0;
    });
  }
  res.json(records);
});

// POST /api/:entity  — create a record
app.post('/api/:entity', (req, res) => {
  const { entity } = req.params;
  if (!dataFiles[entity]) return res.status(404).json({ error: 'Unknown entity' });

  const records = readData(entity);
  const newRecord = { id: generateId(), created_date: new Date().toISOString(), ...req.body };
  records.push(newRecord);
  writeData(entity, records);
  res.status(201).json(newRecord);
});

// PUT /api/:entity/:id  — update a record
app.put('/api/:entity/:id', (req, res) => {
  const { entity, id } = req.params;
  if (!dataFiles[entity]) return res.status(404).json({ error: 'Unknown entity' });

  const records = readData(entity);
  const index = records.findIndex(r => r.id === id);
  if (index === -1) return res.status(404).json({ error: 'Record not found' });

  records[index] = { ...records[index], ...req.body, id };
  writeData(entity, records);
  res.json(records[index]);
});

// DELETE /api/:entity/:id  — delete a record
app.delete('/api/:entity/:id', (req, res) => {
  const { entity, id } = req.params;
  if (!dataFiles[entity]) return res.status(404).json({ error: 'Unknown entity' });

  let records = readData(entity);
  const index = records.findIndex(r => r.id === id);
  if (index === -1) return res.status(404).json({ error: 'Record not found' });

  records.splice(index, 1);
  writeData(entity, records);
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`API server running at http://localhost:${PORT}`);
});
