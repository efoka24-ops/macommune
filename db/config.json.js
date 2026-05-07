// Sequelize CLI Configuration (CommonJS format)
require('dotenv').config();

const dbUrl = process.env.DATABASE_URL || 
  `postgres://${process.env.DB_USER || 'postgres'}:${process.env.DB_PASSWORD || 'postgres'}@${process.env.DB_HOST || 'localhost'}:${process.env.DB_PORT || 5432}/${process.env.DB_NAME || 'macommune'}`;

module.exports = {
  development: {
    url: dbUrl,
    dialect: 'postgres',
    logging: process.env.DEBUG_SQL === 'true' ? console.log : false,
  },
  test: {
    url: dbUrl + '_test',
    dialect: 'postgres',
    logging: false,
  },
  production: {
    url: dbUrl,
    dialect: 'postgres',
    logging: false,
    pool: {
      max: 5,
      min: 2,
      acquire: 30000,
      idle: 10000,
    },
  },
};
