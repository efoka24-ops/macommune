import { DataTypes } from 'sequelize';
import { sequelize, USE_SQL } from '../config.js';

let Testimonial = null;

if (USE_SQL && sequelize) {
  Testimonial = sequelize.define('Testimonial', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  author_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  author_title: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  canton: {
    type: DataTypes.ENUM('figuil', 'lam', 'biou', 'bidzar_1', 'bidzar_2'),
    allowNull: false,
  },
  created_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: false,
  tableName: 'testimonials',
  });
}

export default Testimonial;
