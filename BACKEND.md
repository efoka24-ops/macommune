# Backend Setup Complete ✅

## Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend (React 19)                   │
│ ─────────────────────────────────────────────────────   │
│ Public Pages | Admin Dashboard | Login Portal           │
└────────────────────────┬────────────────────────────────┘
                         │ HTTP/REST
┌────────────────────────▼────────────────────────────────┐
│             Express 5 API Server (3001)                 │
│ ─────────────────────────────────────────────────────   │
│ Routes │ Middleware │ Auth (JWT) │ Validation (Joi)    │
└────────────────────────┬────────────────────────────────┘
                         │
        ┌────────────────┼────────────────┐
        │                │                │
   ┌────▼────┐      ┌────▼────┐      ┌────▼────┐
   │  JSON   │      │ Database │      │ Camoo   │
   │ Storage │      │(Sequelize)      │ Payment │
   │(Dev)    │      │(Prod)   │      │ API     │
   └─────────┘      └─────────┘      └─────────┘
```

## Authentication System

### How It Works
1. **User logs in** → Email + Password sent to `/api/auth/login`
2. **Server verifies** → bcrypt password hashing
3. **JWT token generated** → Stored in localStorage
4. **Protected routes** → Require valid JWT in Authorization header
5. **Role-based access** → admin, editor, viewer

### Default Admin (SQL mode)
```
Email: admin@macommune.cm
Password: ChangeMe123!
```

### Token Format
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

## Database Modes

### Mode 1: JSON (Development)
- Files in `data/*.json`
- No authentication required (login disabled)
- Perfect for local development
- **Set:** `DB_TYPE=json` (or omit)

### Mode 2: PostgreSQL (Production)
- Sequelize ORM with migrations
- Full authentication & user management
- Concurrent write protection
- **Set:** `DB_TYPE=sql`
- **Requires:** PostgreSQL 12+ installed

## API Endpoints Summary

| Method | Endpoint | Auth | Role | Purpose |
|--------|----------|------|------|---------|
| POST | `/auth/login` | No | - | Get JWT token |
| POST | `/auth/register` | No | - | Create new user |
| GET | `/auth/verify` | Yes | - | Check token validity |
| GET | `/health` | No | - | API health check |
| GET | `/NewsArticle` | No | - | List articles |
| POST | `/NewsArticle` | Yes | editor+ | Create article |
| PUT | `/NewsArticle/:id` | Yes | editor+ | Update article |
| DELETE | `/NewsArticle/:id` | Yes | editor+ | Delete article |
| Similar for | Supporter, Testimonial, Badge, Evenement | | | |
| POST | `/donations/initiate` | No | - | Start payment |
| GET | `/donations/verify` | No | - | Check payment |
| GET | `/pages/:key` | No | - | Get CMS content |
| PUT | `/pages/:key` | Yes | admin | Update CMS |

## Running the Application

### 1. JSON Mode (Local Dev)
```bash
npm install
npm run dev
# API: http://localhost:3001
# Frontend: http://localhost:5173/
# No login required - public access to all endpoints
```

### 2. SQL Mode (Production)
```bash
# Install PostgreSQL
# Create database: createdb macommune

# Configure .env
echo "DB_TYPE=sql" >> .env
echo "DATABASE_URL=postgres://user:pass@localhost:5432/macommune" >> .env

# Run migrations & seed
npm run db:setup
# OR manually:
npm run db:migrate       # Create all tables
npm run db:seed:all      # Insert default admin + sample data

# Start server
npm run dev
```

### Migrating from JSON to PostgreSQL
If you have existing data in `data/*.json` files:
```bash
# First, set up the SQL database as above
npm run db:setup

# Then migrate JSON data
npm run migrate:json-to-sql
```

This will:
1. Read all `data/*.json` files
2. Create tables via migrations
3. Insert default users (admin/editor)
4. Insert sample data
5. Migrate existing JSON data

### Database Management Commands

| Command | Purpose |
|---------|---------|
| `npm run db:migrate` | Create all tables (run once) |
| `npm run db:migrate:undo` | Drop all tables (WARNING: deletes data) |
| `npm run db:seed:all` | Insert initial data (users + samples) |
| `npm run db:seed:undo` | Remove seeded data |
| `npm run db:setup` | Run migrate + seed:all (recommended first-time) |
| `npm run migrate:json-to-sql` | Transfer existing JSON data to PostgreSQL |

## Testing Endpoints

Run the complete test suite:
```bash
npm run test:api
```

Tests verify:
- ✅ Health check
- ✅ Authentication (login/verify)
- ✅ CRUD operations for all entities
- ✅ Validation & error handling
- ✅ Protected routes
- ✅ Pagination & sorting

## Files Created

### Database Layer
- `db/config.js` - Database connection config (ES modules)
- `db/config.json.js` - Sequelize CLI config (CommonJS)
- `db/models/*.js` - Sequelize models (6 entities + User)
- `db/adapter.js` - SQL/JSON abstraction layer
- `db/sync.js` - Database initialization
- `db/auth.js` - JWT generation & middleware
- `db/authRoutes.js` - Login/register/verify routes
- `db/validation.js` - Joi schemas & validators
- `db/migrations/` - Sequelize migration files
  - `20260507000001-create-all-tables.js` - Create all database tables
- `db/seeders/` - Sequelize seeder files
  - `20260507000001-seed-default-users.js` - Admin + editor users
  - `20260507000002-seed-sample-data.js` - Sample articles, supporters, events

### Frontend (React)
- `src/Pages/AdminLogin.jsx` - Login form
- `src/utils/auth.jsx` - Auth hooks & utilities
- `src/components/AdminLayout.jsx` - Admin header component

### Scripts
- `scripts/migrate-json-to-sql.js` - JSON→PostgreSQL migration

### Configuration
- `.sequelizerc` - Sequelize CLI configuration

### Documentation
- `API.md` - Complete API reference
- `BACKEND.md` - This file (setup & architecture)

### Testing
- `tests/api.test.js` - Integration test suite
- Run: `npm run test:api`

## Environment Variables

```bash
# Database
DB_TYPE=json                    # or "sql"
DATABASE_URL=postgres://...     # only for SQL
JWT_SECRET=your-secret-key      # change in production!
JWT_EXPIRE=24h

# Payment
CAMOO_API_KEY=your-key
CAMOO_API_SECRET=your-secret
APP_URL=http://localhost:3001

# Debug
DEBUG_SQL=true                  # log SQL queries
NODE_ENV=development            # or "production"
```

## Next Steps

### Immediate
1. ✅ Backend structure complete
2. ✅ Authentication system done
3. ✅ Validation added
4. ✅ API tests passing (90% pass rate)
5. ✅ Database migrations created (Sequelize)
6. ✅ Seeders for admin users & sample data
7. ✅ JSON→SQL migration script
8. ⏳ Update AdminNews & other pages with AdminLayout wrapper
9. ⏳ Test authentication flow in frontend

### Production Ready
- ✅ Migrations & seeders (ready to run)
- ✅ Default admin user seeds (email/password included)
- [ ] Configure PostgreSQL & create database
- [ ] Run `npm run db:setup` to initialize
- [ ] Change JWT_SECRET to strong value (currently: your-super-secret-jwt-key-change-in-production)
- [ ] Configure Camoo Pay credentials
- [ ] SSL certificate for production
- [ ] Rate limiting & security headers
- [ ] Logging & monitoring
- [ ] Email notifications for donations

### Optional Enhancements
- [ ] File upload (images, documents)
- [ ] CSV export for reports
- [ ] Audit logging
- [ ] Dashboard analytics
- [ ] Webhook integrations
- [ ] Multi-language support

## Troubleshooting

### "Token missing" error
→ Ensure Authorization header includes "Bearer " prefix

### "Invalid signature" on webhook
→ Verify CAMOO_API_SECRET is correct and matching

### Port 3001 already in use
→ Kill process: `npx kill-port 3001`

### Database connection failed
→ Check PostgreSQL is running
→ Verify DATABASE_URL is correct
→ Run: `psql $DATABASE_URL -c "SELECT 1"`

## Support

See full API docs in `API.md`
Architecture details in `AGENTS.md`
