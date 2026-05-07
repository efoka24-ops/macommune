# Database Migrations & Seeding Guide

## Quick Start (SQL Mode)

```bash
# 1. Install PostgreSQL (if not already done)
# Ubuntu/Debian: sudo apt-get install postgresql
# macOS: brew install postgresql
# Windows: Download from https://www.postgresql.org/download/windows/

# 2. Create database
createdb macommune

# 3. Configure environment
echo "DB_TYPE=sql" >> .env
echo "DATABASE_URL=postgres://localhost/macommune" >> .env

# 4. Run migrations & seed
npm run db:setup

# 5. Start development server
npm run dev

# ✅ API ready at http://localhost:3001
# ✅ Login at http://localhost:5173/login
```

## Database Structure

### Tables Created by Migration

| Table | Purpose | Fields |
|-------|---------|--------|
| `users` | Admin accounts | id, email, password_hash, full_name, role, active, created_date, last_login |
| `news_articles` | Campaign articles | id, title, content, excerpt, image_url, category, canton, published, created_date, updated_date |
| `supporters` | Campaign supporters | id, full_name, phone, email, canton, sector, notes, created_date |
| `testimonials` | Voter testimonials | id, author_name, author_title, content, canton, created_date |
| `badges` | Supporter badges | id, email, name, activated, created_date |
| `evenements` | Campaign events | id, title, description, event_date, location, canton, image_url, published, created_date |
| `donations` | Campaign donations | id, transaction_id, external_reference, donor_name, phone_number, amount, currency, message, status, network, notified_at, created_date |

### Indexes

- `users.email` - Unique constraint for login
- `news_articles.created_date` - For sorting articles
- `news_articles.canton` - For filtering by location
- `supporters.canton` - For location-based queries
- `donations.status` - For payment tracking
- `donations.created_date` - For reporting

## Default Credentials

After running `npm run db:setup`, these users are created:

### Admin User
```
Email:    admin@macommune.cm
Password: ChangeMe123!
Role:     admin (full access)
```

### Editor User
```
Email:    editor@macommune.cm
Password: Editor123!
Role:     editor (can create/edit content)
```

**IMPORTANT:** Change these passwords immediately after first login!

## Migration Files

### 20260507000001-create-all-tables.js

Creates all database tables with proper data types and constraints.

**What it does:**
- Creates 7 tables with proper relationships
- Adds ENUM constraints for categories (canton, role, status)
- Creates indexes for performance
- Sets default values and constraints

**Run with:**
```bash
npm run db:migrate
```

**Undo with:**
```bash
npm run db:migrate:undo
```

## Seeder Files

### 20260507000001-seed-default-users.js

Creates admin and editor users with bcrypt-hashed passwords.

**Users created:**
- admin@macommune.cm (role: admin)
- editor@macommune.cm (role: editor)

**Run with:**
```bash
npm run db:seed:all
```

### 20260507000002-seed-sample-data.js

Inserts sample articles, supporters, testimonials, and events for testing.

**Sample data:**
- 2 news articles (in French)
- 2 supporters from different cantons
- 2 voter testimonials
- 2 upcoming events

**Purpose:** Provides realistic test data for frontend development

## JSON to PostgreSQL Migration

If you have existing data in `data/*.json` files:

```bash
# Make sure SQL database is ready
npm run db:setup

# Migrate JSON data
npm run migrate:json-to-sql
```

**What it does:**
1. Reads all files from `data/` directory:
   - news.json → news_articles table
   - supporters.json → supporters table
   - testimonials.json → testimonials table
   - badges.json → badges table
   - evenements.json → evenements table
   - donations.json → donations table
2. Preserves all existing data with original IDs
3. Logs progress and final counts
4. Handles missing files gracefully

**Note:** Uses `ignoreDuplicates: true` to prevent errors if IDs already exist

## Complete Setup Workflow

### For Development (Local Testing)

```bash
# 1. Use JSON mode (default, no setup needed)
npm run dev

# 2. To test with SQL, follow this:
# - Install PostgreSQL
# - Create database: createdb macommune
# - Set DB_TYPE=sql in .env
# - Run: npm run db:setup
# - Start: npm run dev
```

### For Production

```bash
# 1. Install PostgreSQL on production server
# 2. Create database: createdb macommune
# 3. Configure .env with production DATABASE_URL
# 4. Set strong JWT_SECRET (currently: your-super-secret-jwt-key-change-in-production)
# 5. Set DB_TYPE=sql in .env
# 6. Run migrations: npm run db:migrate
# 7. Seed initial data: npm run db:seed:all
# 8. Change admin password immediately after deploy
# 9. Set up SSL certificate
# 10. Start: npm start (or use PM2/systemd)
```

## Rollback Procedures

### Undo All Migrations

```bash
npm run db:migrate:undo
```

⚠️ **WARNING:** This drops all tables and deletes all data!

### Undo All Seeds

```bash
npm run db:seed:undo
```

This removes data but keeps tables intact.

### Complete Reset

```bash
# 1. Drop all tables
npm run db:migrate:undo

# 2. Recreate tables and seed again
npm run db:setup

# ✅ Database is now fresh
```

## Troubleshooting

### "database does not exist"
```bash
createdb macommune
```

### "role does not exist"
Create PostgreSQL role/user:
```bash
createuser macommune
psql -U macommune -d macommune
```

### "column does not exist" after migration
Migrations may have failed. Rollback and retry:
```bash
npm run db:migrate:undo
npm run db:migrate
```

### Check migration status
```bash
sequelize-cli db:migrate:status
```

### Check seeder status
```bash
sequelize-cli db:seed --seed 20260507000001-seed-default-users.js
```

## Environment Variables for Migrations

```bash
# Required for migrations
DB_TYPE=sql
DATABASE_URL=postgres://user:password@localhost:5432/macommune

# Optional
DEBUG_SQL=true                    # Log all SQL queries
NODE_ENV=production              # For production seeds
```

## API Testing After Migration

Once database is ready, test endpoints:

```bash
# Check health
curl http://localhost:3001/api/health

# Login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@macommune.cm","password":"ChangeMe123!"}'

# Get token from response, then use it:
curl http://localhost:3001/api/NewsArticle \
  -H "Authorization: Bearer <token>"
```

## Next Steps

- [ ] Update admin password to strong value
- [ ] Configure Camoo Pay payment credentials
- [ ] Set JWT_SECRET to production value
- [ ] Set up SSL certificate
- [ ] Configure email notifications (optional)
- [ ] Create additional users as needed
