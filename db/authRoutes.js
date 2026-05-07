import express from 'express';
import { generateToken, verifyToken } from './auth.js';
import { validateData, loginSchema, registerSchema } from './validation.js';
import { USE_SQL } from './config.js';
import User from './models/User.js';
import { adapter, generateId } from './adapter.js';
import bcrypt from 'bcryptjs';

const router = express.Router();

// POST /auth/login — User login
router.post('/login', async (req, res) => {
  try {
    const validation = validateData(loginSchema, req.body);
    if (!validation.valid) {
      return res.status(400).json({ error: 'Validation failed', details: validation.errors });
    }

    const { email, password } = validation.data;

    // SQL mode - use database
    if (USE_SQL && User) {
      try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
          return res.status(401).json({ error: 'Invalid email or password' });
        }

        const isValid = await user.comparePassword(password);
        if (!isValid) {
          return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Update last login
        await user.update({ last_login: new Date() });

        const token = generateToken(user.id, user.email, user.role);
        return res.json({
          token,
          user: {
            id: user.id,
            email: user.email,
            full_name: user.full_name,
            role: user.role,
          },
        });
      } catch (dbErr) {
        console.error('Database error:', dbErr.message);
        return res.status(503).json({ error: 'Database error' });
      }
    }

    // JSON mode - Demo login (for development only)
    // In production, use SQL mode only
    if (email === 'admin@macommune.cm' && password === 'ChangeMe123!') {
      const token = generateToken('admin-id', email, 'admin');
      return res.json({
        token,
        user: {
          id: 'admin-id',
          email: email,
          full_name: 'Administrator',
          role: 'admin',
        },
      });
    }

    if (email === 'editor@macommune.cm' && password === 'Editor123!') {
      const token = generateToken('editor-id', email, 'editor');
      return res.json({
        token,
        user: {
          id: 'editor-id',
          email: email,
          full_name: 'Editor',
          role: 'editor',
        },
      });
    }

    return res.status(401).json({ error: 'Invalid email or password' });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Login failed' });
  }
});

// POST /auth/register — Create new user (admin only)
router.post('/register', async (req, res) => {
  try {
    if (!USE_SQL || !User) {
      return res.status(503).json({ error: 'User registration requires database' });
    }

    const validation = validateData(registerSchema, req.body);
    if (!validation.valid) {
      return res.status(400).json({ error: 'Validation failed', details: validation.errors });
    }

    const { email, password, full_name } = validation.data;

    // Check if user already exists
    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    const user = await User.create({
      id: generateId(),
      email,
      password_hash: password,
      full_name,
      role: 'editor',
    });

    const token = generateToken(user.id, user.email, user.role);
    res.status(201).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        role: user.role,
      },
    });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// GET /auth/verify — Verify token
router.get('/verify', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Authorization header missing' });
  }

  const token = authHeader.split(' ')[1];
  const decoded = verifyToken(token);
  
  if (!decoded) {
    return res.status(401).json({ error: 'Invalid token' });
  }

  res.json({ valid: true, user: decoded });
});

export default router;
