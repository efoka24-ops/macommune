import { sequelize, USE_SQL } from './config.js';
import { NewsArticle, Supporter, Testimonial, Badge, Evenement, Donation } from './models/index.js';

async function initializeDatabase() {
  if (!USE_SQL) {
    console.log('Using JSON storage (local development mode)');
    return;
  }

  try {
    // Test connection
    await sequelize.authenticate();
    console.log('Database connection established.');

    // Sync models with database (create tables if not exist)
    await sequelize.sync({ alter: false });
    console.log('Database models synchronized.');
  } catch (error) {
    console.error('Database initialization error:', error.message);
    process.exit(1);
  }
}

export { initializeDatabase, sequelize };
