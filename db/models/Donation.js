import { DataTypes } from 'sequelize';
import { sequelize, USE_SQL } from '../config.js';

let Donation = null;

if (USE_SQL && sequelize) {
  Donation = sequelize.define('Donation', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  transaction_id: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
  external_reference: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  donor_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone_number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  currency: {
    type: DataTypes.STRING,
    defaultValue: 'XAF',
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'PENDING',
  },
  network: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  notified_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  created_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: false,
  tableName: 'donations',
  });
}

export default Donation;
