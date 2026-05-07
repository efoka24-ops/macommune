import { DataTypes } from 'sequelize';
import { sequelize, USE_SQL } from '../config.js';

let Evenement = null;

if (USE_SQL && sequelize) {
  Evenement = sequelize.define('Evenement', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  event_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  canton: {
    type: DataTypes.ENUM('figuil', 'lam', 'biou', 'bidzar_1', 'bidzar_2', 'tous'),
    allowNull: false,
  },
  image_url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  published: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  created_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: false,
  tableName: 'evenements',
  });
}

export default Evenement;
