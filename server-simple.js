import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const app = express();
const PORT = 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-key-change-in-production';

// Middleware
app.use(cors());
app.use(express.json({ limit: '20mb' }));

// ─── AUTHENTICATION ROUTES ───────────────────────────────────────────────

// POST /api/auth/login
app.post('/api/auth/login', (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    // Demo credentials (JSON mode for development)
    const validUsers = {
      'admin@macommune.cm': { password: 'ChangeMe123!', name: 'Administrator', role: 'admin' },
      'editor@macommune.cm': { password: 'Editor123!', name: 'Editor', role: 'editor' },
    };

    const user = validUsers[email];
    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate token
    const token = jwt.sign(
      { userId: email, email, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: email,
        email: email,
        full_name: user.name,
        role: user.role,
      },
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Login failed' });
  }
});

// POST /api/auth/register
app.post('/api/auth/register', (req, res) => {
  res.status(503).json({ error: 'Registration not available in demo mode' });
});

// GET /api/auth/verify
app.get('/api/auth/verify', (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: 'Authorization header missing' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Token missing' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ valid: true, user: decoded });
  } catch (err) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
});

// ─── HEALTH CHECK ───────────────────────────────────────────────────────

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ─── NEWS ARTICLES ──────────────────────────────────────────────────────

// Sample news data (in production, use database)
const newsData = [
  {
    id: 'news001',
    title: 'Grande mobilisation à Figuil',
    content: 'Plus de 500 habitants réunis pour un meeting',
    excerpt: 'Meeting historique',
    category: 'terrain',
    canton: 'figuil',
    published: true,
    created_date: '2026-03-10T10:00:00Z',
  },
];

// GET /api/NewsArticle
app.get('/api/NewsArticle', (req, res) => {
  res.json(newsData);
});

// POST /api/NewsArticle
app.post('/api/NewsArticle', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    jwt.verify(token, JWT_SECRET);
    const newArticle = { ...req.body, id: `news-${Date.now()}`, created_date: new Date().toISOString() };
    newsData.push(newArticle);
    res.status(201).json(newArticle);
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

// ─── DONATIONS ──────────────────────────────────────────────────────────

// GET /api/donations/verify
app.get('/api/donations/verify', (req, res) => {
  res.json({ status: 'PENDING', amount: 5000, network: 'MTN' });
});

// POST /api/donations/initiate
app.post('/api/donations/initiate', (req, res) => {
  const { amount, phone_number, donor_name } = req.body;

  if (!amount || !phone_number) {
    return res.status(400).json({ error: 'Amount and phone number required' });
  }

  res.json({
    transactionId: `txn-${Date.now()}`,
    status: 'PENDING',
    amount,
    phone_number,
  });
});

// ─── PAGES (CMS) ────────────────────────────────────────────────────────

const pagesData = {
  about: { hero: 'About Emmanuel Foka', content: 'Campaign details...' },
  home: { hero: 'Welcome to our campaign', content: 'Home page content...' },
};

// GET /api/pages/:key
app.get('/api/pages/:key', (req, res) => {
  const { key } = req.params;
  const page = pagesData[key];
  if (!page) {
    return res.status(404).json({ error: 'Page not found' });
  }
  res.json({ [key]: page });
});

// PUT /api/pages/:key
app.put('/api/pages/:key', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.role !== 'admin') {
      return res.status(403).json({ error: 'Admin only' });
    }

    const { key } = req.params;
    pagesData[key] = req.body;
    res.json({ [key]: pagesData[key] });
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

// ─── ERROR HANDLER ──────────────────────────────────────────────────────

app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// ─── START SERVER ───────────────────────────────────────────────────────

app.listen(PORT, () => {
  console.log(`✅ API server running at http://localhost:${PORT}`);
  console.log(`📚 Demo credentials:`);
  console.log(`   Admin: admin@macommune.cm / ChangeMe123!`);
  console.log(`   Editor: editor@macommune.cm / Editor123!`);
});
