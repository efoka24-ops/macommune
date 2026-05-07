import { DataTypes } from 'sequelize';
import { sequelize, USE_SQL } from '../config.js';
import bcrypt from 'bcryptjs';

let User = null;

if (USE_SQL && sequelize) {
  User = sequelize.define('User', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password_hash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('admin', 'editor', 'viewer'),
      defaultValue: 'editor',
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    created_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    last_login: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    timestamps: false,
    tableName: 'users',
    hooks: {
      beforeCreate: async (user) => {
        if (user.password_hash) {
          user.password_hash = await bcrypt.hash(user.password_hash, 10);
        }
      },
    },
  });

  // Instance method to compare passwords
  User.prototype.comparePassword = async function(password) {
    return bcrypt.compare(password, this.password_hash);
  };
}

export default User;
