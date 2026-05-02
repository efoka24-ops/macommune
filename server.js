import express from 'express';
import cors from 'cors';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import crypto from 'crypto';

// Camoo Pay configuration — set these in a .env file (never commit real keys)
const CAMOO_API_KEY = process.env.CAMOO_API_KEY || '';
const CAMOO_API_SECRET = process.env.CAMOO_API_SECRET || '';
const CAMOO_BASE_URL = 'https://api.camoo.cm/v1/payment';
const APP_URL = process.env.APP_URL || 'http://localhost:3001';

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
  Badge: path.join(__dirname, 'data', 'badges.json'),
  Evenement: path.join(__dirname, 'data', 'evenements.json'),
  Donation: path.join(__dirname, 'data', 'donations.json'),
};

const pagesFile = path.join(__dirname, 'data', 'pages.json');

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

function readPages() {
  try {
    return JSON.parse(readFileSync(pagesFile, 'utf-8'));
  } catch {
    return {};
  }
}

function writePages(data) {
  writeFileSync(pagesFile, JSON.stringify(data, null, 2), 'utf-8');
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

// Pages API routes (GET and PUT specific page sections)
app.get('/api/pages/:pageKey', (req, res) => {
  const { pageKey } = req.params;
  const allPages = readPages();
  if (!allPages[pageKey]) {
    return res.status(404).json({ error: 'Page not found' });
  }
  res.json({ [pageKey]: allPages[pageKey] });
});

app.put('/api/pages/:pageKey', (req, res) => {
  const { pageKey } = req.params;
  const allPages = readPages();
  allPages[pageKey] = req.body;
  writePages(allPages);
  res.json({ [pageKey]: allPages[pageKey] });
});

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

// ─── DONATIONS (Camoo Pay) ────────────────────────────────────────────────────

// POST /api/donations/initiate — create a payment request via Camoo Pay
app.post('/api/donations/initiate', async (req, res) => {
  const { amount, phone_number, donor_name, message } = req.body;

  // Input validation
  if (!amount || !phone_number) {
    return res.status(400).json({ error: 'Montant et numéro de téléphone requis.' });
  }
  const amountNum = Number(amount);
  if (isNaN(amountNum) || amountNum < 500) {
    return res.status(400).json({ error: 'Montant minimum : 500 XAF.' });
  }
  // Basic phone sanity check (Cameroon: +237 + 9 digits)
  const cleanPhone = String(phone_number).trim();
  const normalizedPhone = cleanPhone.replace(/[\s\-().]/g, '');
  // Accept: +2376XXXXXXXX, 2376XXXXXXXX, 06XXXXXXXX, 6XXXXXXXX (tous opérateurs CM)
  if (!/^(\+?237|0)?6\d{8}$/.test(normalizedPhone)) {
    return res.status(400).json({ error: 'Numéro invalide. Exemples : 699 123 456 ou +237 699 123 456.' });
  }
  // Normaliser en E.164
  let e164Phone;
  if (normalizedPhone.startsWith('+')) {
    e164Phone = normalizedPhone;
  } else if (normalizedPhone.startsWith('237')) {
    e164Phone = '+' + normalizedPhone;
  } else if (normalizedPhone.startsWith('0')) {
    e164Phone = '+237' + normalizedPhone.slice(1);
  } else {
    e164Phone = '+237' + normalizedPhone;
  }

  if (!CAMOO_API_KEY || !CAMOO_API_SECRET) {
    return res.status(503).json({ error: 'Paiement non configuré sur le serveur. Contactez l\'administrateur.' });
  }

  const external_reference = `don-foka-${Date.now()}`;
  const donorLabel = (donor_name || '').trim() || 'Anonyme';

  let camooResponse;
  try {
    const apiRes = await fetch(`${CAMOO_BASE_URL}/cashout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': CAMOO_API_KEY,
        'X-Api-Secret': CAMOO_API_SECRET,
      },
      body: JSON.stringify({
        amount: amountNum,
        phone_number: e164Phone,
        notification_url: `${APP_URL}/api/donations/webhook`,
        external_reference,
        shopping_cart_details: {
          description: `Don campagne Emmanuel FOKA — ${donorLabel}`,
          customerName: donorLabel,
          langKey: 'fr',
        },
      }),
    });
    camooResponse = await apiRes.json();
    if (!apiRes.ok) {
      return res.status(apiRes.status).json({ error: camooResponse?.message || 'Erreur Camoo Pay.' });
    }
  } catch (err) {
    console.error('Camoo Pay fetch error:', err);
    return res.status(502).json({ error: 'Impossible de joindre le service de paiement.' });
  }

  // Persist donation record
  const donations = readData('Donation');
  const record = {
    id: generateId(),
    created_date: new Date().toISOString(),
    transaction_id: camooResponse?.cashOut?.id || null,
    external_reference,
    donor_name: donorLabel,
    phone_number: e164Phone,
    amount: amountNum,
    currency: 'XAF',
    message: (message || '').trim() || null,
    status: camooResponse?.cashOut?.status || 'PENDING',
    network: camooResponse?.cashOut?.network || null,
    notified_at: null,
  };
  donations.push(record);
  writeData('Donation', donations);

  res.status(201).json({
    transaction_id: record.transaction_id,
    external_reference: record.external_reference,
    status: record.status,
    amount: record.amount,
    network: record.network,
  });
});

// GET /api/donations/verify?id=<transaction_id> — check status of a transaction
app.get('/api/donations/verify', async (req, res) => {
  const { id } = req.query;
  if (!id) return res.status(400).json({ error: 'Paramètre id manquant.' });

  if (!CAMOO_API_KEY || !CAMOO_API_SECRET) {
    return res.status(503).json({ error: 'Paiement non configuré.' });
  }

  try {
    const apiRes = await fetch(`${CAMOO_BASE_URL}/verify?id=${encodeURIComponent(id)}`, {
      headers: { 'X-Api-Key': CAMOO_API_KEY, 'X-Api-Secret': CAMOO_API_SECRET },
    });
    const data = await apiRes.json();

    if (!apiRes.ok) {
      return res.status(apiRes.status).json({ error: data?.message || 'Erreur vérification.' });
    }

    // Update local record status if changed
    const status = (data?.verify?.status || '').toLowerCase();
    if (status) {
      const donations = readData('Donation');
      const idx = donations.findIndex(d => d.transaction_id === id);
      if (idx !== -1 && donations[idx].status !== status) {
        donations[idx].status = status;
        donations[idx].notified_at = new Date().toISOString();
        writeData('Donation', donations);
      }
    }

    res.json({ status: data?.verify?.status, amount: data?.verify?.amount, network: data?.verify?.network });
  } catch (err) {
    console.error('Verify error:', err);
    res.status(502).json({ error: 'Impossible de vérifier le paiement.' });
  }
});

// GET /api/donations/webhook — Camoo Pay signed payment notification
app.get('/api/donations/webhook', (req, res) => {
  const { sig, id, status, amount, phone_number } = req.query;

  if (!sig || !id) return res.status(400).send('Bad request');

  // Verify HMAC-SHA256 signature (Camoo signs the query data with API Secret)
  // Build the canonical string: sorted query params except 'sig', joined as key=value&...
  const params = Object.fromEntries(
    Object.entries(req.query)
      .filter(([k]) => k !== 'sig')
      .sort(([a], [b]) => a.localeCompare(b))
  );
  const canonical = Object.entries(params).map(([k, v]) => `${k}=${v}`).join('&');
  const expected = crypto.createHmac('sha256', CAMOO_API_SECRET).update(canonical).digest('hex');

  if (!crypto.timingSafeEqual(Buffer.from(sig, 'hex'), Buffer.from(expected, 'hex'))) {
    console.warn('Webhook: invalid signature for transaction', id);
    return res.status(401).send('Invalid signature');
  }

  const donations = readData('Donation');
  const idx = donations.findIndex(d => d.transaction_id === id);
  if (idx !== -1) {
    donations[idx].status = (status || '').toLowerCase();
    donations[idx].notified_at = new Date().toISOString();
    writeData('Donation', donations);
  }

  res.status(200).send('OK');
});

// ─── END DONATIONS ─────────────────────────────────────────────────────────────

app.listen(PORT, () => {
  console.log(`API server running at http://localhost:${PORT}`);
});
