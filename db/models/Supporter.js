import { DataTypes } from 'sequelize';
import { sequelize, USE_SQL } from '../config.js';

let Supporter = null;

if (USE_SQL && sequelize) {
  Supporter = sequelize.define('Supporter', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  full_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  canton: {
    type: DataTypes.ENUM('figuil', 'lam', 'biou', 'bidzar_1', 'bidzar_2'),
    allowNull: false,
  },
  sector: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  created_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: false,
  tableName: 'supporters',
  });
}

export default Supporter;
