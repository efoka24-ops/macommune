import { Sequelize } from 'sequelize';

const USE_SQL = process.env.DB_TYPE === 'sql' || process.env.NODE_ENV === 'production';

let sequelize = null;

if (USE_SQL) {
  const dbUrl = process.env.DATABASE_URL || 
    `postgres://${process.env.DB_USER || 'postgres'}:${process.env.DB_PASSWORD || 'postgres'}@${process.env.DB_HOST || 'localhost'}:${process.env.DB_PORT || 5432}/${process.env.DB_NAME || 'macommune'}`;
  
  sequelize = new Sequelize(dbUrl, {
    dialect: 'postgres',
    logging: process.env.DEBUG_SQL === 'true' ? console.log : false,
  });
}

export { sequelize, USE_SQL };
