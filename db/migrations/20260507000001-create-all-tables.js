'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Create users table
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password_hash: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      full_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      role: {
        type: Sequelize.ENUM('admin', 'editor', 'viewer'),
        defaultValue: 'editor',
      },
      active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      created_date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      last_login: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });

    // Create news_articles table
    await queryInterface.createTable('news_articles', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      excerpt: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      image_url: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      category: {
        type: Sequelize.ENUM('terrain', 'reunion', 'projet', 'temoignage', 'communique'),
        defaultValue: 'terrain',
      },
      canton: {
        type: Sequelize.ENUM('figuil', 'lam', 'biou', 'bidzar_1', 'bidzar_2', 'tous'),
        defaultValue: 'tous',
      },
      published: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      created_date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updated_date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });

    // Create supporters table
    await queryInterface.createTable('supporters', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
      },
      full_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      canton: {
        type: Sequelize.ENUM('figuil', 'lam', 'biou', 'bidzar_1', 'bidzar_2'),
        allowNull: false,
      },
      sector: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      notes: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      created_date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });

    // Create testimonials table
    await queryInterface.createTable('testimonials', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
      },
      author_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      author_title: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      canton: {
        type: Sequelize.ENUM('figuil', 'lam', 'biou', 'bidzar_1', 'bidzar_2'),
        allowNull: false,
      },
      created_date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });

    // Create badges table
    await queryInterface.createTable('badges', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      activated: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      created_date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });

    // Create evenements table
    await queryInterface.createTable('evenements', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      event_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      location: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      canton: {
        type: Sequelize.ENUM('figuil', 'lam', 'biou', 'bidzar_1', 'bidzar_2', 'tous'),
        allowNull: false,
      },
      image_url: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      published: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      created_date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });

    // Create donations table
    await queryInterface.createTable('donations', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
      },
      transaction_id: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
      },
      external_reference: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      donor_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      phone_number: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      currency: {
        type: Sequelize.STRING,
        defaultValue: 'XAF',
      },
      message: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: 'PENDING',
      },
      network: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      notified_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      created_date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });

    // Create indexes
    await queryInterface.addIndex('users', ['email']);
    await queryInterface.addIndex('news_articles', ['created_date']);
    await queryInterface.addIndex('news_articles', ['canton']);
    await queryInterface.addIndex('supporters', ['canton']);
    await queryInterface.addIndex('donations', ['status']);
    await queryInterface.addIndex('donations', ['created_date']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('donations');
    await queryInterface.dropTable('evenements');
    await queryInterface.dropTable('badges');
    await queryInterface.dropTable('testimonials');
    await queryInterface.dropTable('supporters');
    await queryInterface.dropTable('news_articles');
    await queryInterface.dropTable('users');
  },
};
