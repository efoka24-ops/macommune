'use strict';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

export const up = async (queryInterface, Sequelize) => {
  const hashedPassword = await bcrypt.hash('ChangeMe123!', 10);
  
  await queryInterface.bulkInsert('users', [
    {
      id: uuidv4(),
      email: 'admin@macommune.cm',
      password_hash: hashedPassword,
      full_name: 'Administrator',
      role: 'admin',
      active: true,
      created_date: new Date(),
    },
    {
      id: uuidv4(),
      email: 'editor@macommune.cm',
      password_hash: await bcrypt.hash('Editor123!', 10),
      full_name: 'Editor',
      role: 'editor',
      active: true,
      created_date: new Date(),
    },
  ], {});
};

export const down = async (queryInterface, Sequelize) => {
  await queryInterface.bulkDelete('users', {
    email: {
      [Sequelize.Op.in]: ['admin@macommune.cm', 'editor@macommune.cm'],
    },
  }, {});
};
