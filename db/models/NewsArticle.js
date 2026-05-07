import { DataTypes } from 'sequelize';
import { sequelize, USE_SQL } from '../config.js';

let NewsArticle = null;

if (USE_SQL && sequelize) {
  NewsArticle = sequelize.define('NewsArticle', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    excerpt: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    category: {
      type: DataTypes.ENUM('terrain', 'reunion', 'projet', 'temoignage', 'communique'),
      allowNull: false,
      defaultValue: 'terrain',
    },
    canton: {
      type: DataTypes.ENUM('figuil', 'lam', 'biou', 'bidzar_1', 'bidzar_2', 'tous'),
      allowNull: false,
      defaultValue: 'tous',
    },
    published: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    created_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    timestamps: false,
    tableName: 'news_articles',
  });
}

export default NewsArticle;
