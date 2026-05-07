import { DataTypes } from 'sequelize';
import { sequelize, USE_SQL } from '../config.js';

let Badge = null;

if (USE_SQL && sequelize) {
  Badge = sequelize.define('Badge', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  activated: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  created_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: false,
  tableName: 'badges',
  });
}

export default Badge;
