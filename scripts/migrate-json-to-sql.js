#!/usr/bin/env node

/**
 * JSON to SQL Migration Script
 * 
 * Migrates data from flat JSON files (data/*.json) to PostgreSQL database
 * Usage: npm run migrate:json-to-sql
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import NewsArticle from './models/NewsArticle.js';
import Supporter from './models/Supporter.js';
import Testimonial from './models/Testimonial.js';
import Badge from './models/Badge.js';
import Evenement from './models/Evenement.js';
import Donation from './models/Donation.js';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, '..', 'data');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: console.log,
});

async function loadJsonFile(filename) {
  const filepath = path.join(dataDir, `${filename}.json`);
  try {
    const data = fs.readFileSync(filepath, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.log(`⚠️  File not found or invalid: ${filename}.json`);
    return [];
  }
}

async function migrateData() {
  try {
    console.log('🔄 Starting JSON → SQL migration...\n');

    // Test connection
    await sequelize.authenticate();
    console.log('✅ Database connection successful\n');

    // Migrate News Articles
    console.log('📰 Migrating News Articles...');
    const newsData = loadJsonFile('news');
    if (Array.isArray(newsData) && newsData.length > 0) {
      await NewsArticle.bulkCreate(newsData, { ignoreDuplicates: true });
      console.log(`   ✓ ${newsData.length} articles migrated\n`);
    }

    // Migrate Supporters
    console.log('👥 Migrating Supporters...');
    const supportersData = loadJsonFile('supporters');
    if (Array.isArray(supportersData) && supportersData.length > 0) {
      await Supporter.bulkCreate(supportersData, { ignoreDuplicates: true });
      console.log(`   ✓ ${supportersData.length} supporters migrated\n`);
    }

    // Migrate Testimonials
    console.log('💬 Migrating Testimonials...');
    const testimonialsData = loadJsonFile('testimonials');
    if (Array.isArray(testimonialsData) && testimonialsData.length > 0) {
      await Testimonial.bulkCreate(testimonialsData, { ignoreDuplicates: true });
      console.log(`   ✓ ${testimonialsData.length} testimonials migrated\n`);
    }

    // Migrate Badges
    console.log('🏅 Migrating Badges...');
    const badgesData = loadJsonFile('badges');
    if (Array.isArray(badgesData) && badgesData.length > 0) {
      await Badge.bulkCreate(badgesData, { ignoreDuplicates: true });
      console.log(`   ✓ ${badgesData.length} badges migrated\n`);
    }

    // Migrate Events
    console.log('📅 Migrating Events...');
    const eventsData = loadJsonFile('evenements');
    if (Array.isArray(eventsData) && eventsData.length > 0) {
      await Evenement.bulkCreate(eventsData, { ignoreDuplicates: true });
      console.log(`   ✓ ${eventsData.length} events migrated\n`);
    }

    // Migrate Donations
    console.log('💰 Migrating Donations...');
    const donationsData = loadJsonFile('donations');
    if (Array.isArray(donationsData) && donationsData.length > 0) {
      await Donation.bulkCreate(donationsData, { ignoreDuplicates: true });
      console.log(`   ✓ ${donationsData.length} donations migrated\n`);
    }

    console.log('✅ Migration completed successfully!');
    console.log('\n📋 Summary:');
    console.log(`   News Articles: ${(await NewsArticle.count())} total`);
    console.log(`   Supporters: ${(await Supporter.count())} total`);
    console.log(`   Testimonials: ${(await Testimonial.count())} total`);
    console.log(`   Badges: ${(await Badge.count())} total`);
    console.log(`   Events: ${(await Evenement.count())} total`);
    console.log(`   Donations: ${(await Donation.count())} total\n`);

  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    process.exit(1);
  } finally {
    await sequelize.close();
  }
}

migrateData();
