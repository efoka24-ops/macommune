'use strict';
import { v4 as uuidv4 } from 'uuid';

export const up = async (queryInterface, Sequelize) => {
  const now = new Date();

  // Sample news articles
  const articles = [
    {
      id: uuidv4(),
      title: 'Campagne lancée avec succès',
      content: 'Notre campagne a officiellement commencé avec un grand rassemblement à Figuil. Des milliers de citoyens se sont réunis pour exprimer leur soutien à notre vision pour le développement du canton.',
      excerpt: 'Lancement officiel de la campagne électorale',
      image_url: 'https://via.placeholder.com/600x400',
      category: 'reunion',
      canton: 'figuil',
      published: true,
      created_date: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000),
      updated_date: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000),
    },
    {
      id: uuidv4(),
      title: 'Visite terrain aux villages du canton',
      content: 'Nous avons parcouru les villages de Lam et Biou pour écouter les préoccupations des citoyens. Accès à l\'eau potable, électricité, éducation - voici nos priorités.',
      excerpt: 'Écoute et engagement auprès des communautés locales',
      image_url: 'https://via.placeholder.com/600x400',
      category: 'terrain',
      canton: 'lam',
      published: true,
      created_date: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
      updated_date: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
    },
  ];

  await queryInterface.bulkInsert('news_articles', articles, {});

  // Sample supporters
  const supporters = [
    {
      id: uuidv4(),
      full_name: 'Jean Dupont',
      phone: '237690123456',
      email: 'jean@example.com',
      canton: 'figuil',
      sector: 'Commerce',
      notes: 'Chef de quartier, très impliqué dans la communauté',
      created_date: now,
    },
    {
      id: uuidv4(),
      full_name: 'Marie Nkomo',
      phone: '237691234567',
      email: 'marie@example.com',
      canton: 'lam',
      sector: 'Santé',
      notes: 'Infirmière locale, leader d\'opinion',
      created_date: now,
    },
  ];

  await queryInterface.bulkInsert('supporters', supporters, {});

  // Sample testimonials
  const testimonials = [
    {
      id: uuidv4(),
      author_name: 'Paul Kamga',
      author_title: 'Agriculteur, Figuil',
      content: 'Depuis 20 ans, j\'attends que quelqu\'un s\'intéresse véritablement au développement agricole de notre canton. Cette candidature apporte enfin l\'espoir dont nous avions besoin.',
      canton: 'figuil',
      created_date: now,
    },
    {
      id: uuidv4(),
      author_name: 'Amina Hassan',
      author_title: 'Enseignante, Biou',
      content: 'L\'éducation de nos enfants ne peut pas attendre. Nous avons besoin d\'infrastructures, de ressources et d\'un leader qui comprend l\'importance de l\'école.',
      canton: 'biou',
      created_date: now,
    },
  ];

  await queryInterface.bulkInsert('testimonials', testimonials, {});

  // Sample events
  const events = [
    {
      id: uuidv4(),
      title: 'Débat public - Économie locale',
      description: 'Jeudi prochain, nous débattrons des stratégies de développement économique pour le canton. Tous les citoyens sont invités à partager leurs idées.',
      event_date: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000),
      location: 'Salle communautaire, Figuil',
      canton: 'figuil',
      image_url: 'https://via.placeholder.com/600x400',
      published: true,
      created_date: now,
    },
    {
      id: uuidv4(),
      title: 'Marche citoyenne pour le changement',
      description: 'Dimanche 15, joignez-nous pour une marche pacifique célébrant l\'engagement civique et démocratique.',
      event_date: new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000),
      location: 'Point de départ: Stade municipal, Lam',
      canton: 'lam',
      image_url: 'https://via.placeholder.com/600x400',
      published: true,
      created_date: now,
    },
  ];

  await queryInterface.bulkInsert('evenements', events, {});
};

export const down = async (queryInterface, Sequelize) => {
  await queryInterface.bulkDelete('news_articles', null, {});
  await queryInterface.bulkDelete('supporters', null, {});
  await queryInterface.bulkDelete('testimonials', null, {});
  await queryInterface.bulkDelete('evenements', null, {});
};
