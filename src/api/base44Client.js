// Mock base44 client — stockage en mémoire (réinitialisé au rechargement)

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}

// Store en mémoire — pas de localStorage
const store = {};

// --- MOCK DATA ---

const mockNewsArticles = [
  {
    id: generateId(),
    title: "Grande mobilisation à Figuil : 500 personnes au meeting",
    content: "Ce samedi, plus de 500 habitants de Figuil se sont rassemblés pour écouter Emmanuel Foka présenter sa vision pour la commune. L'événement a été marqué par un enthousiasme remarquable et une participation massive des jeunes et des femmes. Les thèmes abordés incluaient l'accès à l'eau potable, la construction de routes et le soutien à l'agriculture locale.",
    excerpt: "Plus de 500 personnes réunies pour un meeting historique à Figuil",
    image_url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
    category: "terrain",
    canton: "figuil",
    published: true,
    created_date: "2026-03-10T10:00:00Z"
  },
  {
    id: generateId(),
    title: "Projet d'adduction d'eau pour le canton de Lam",
    content: "Le projet phare d'adduction d'eau pour le canton de Lam a été officiellement présenté. Ce projet prévoit la construction de 15 forages et l'installation de pompes solaires pour desservir les villages les plus reculés. Le coût estimé est de 200 millions de FCFA, financé par des partenaires internationaux.",
    excerpt: "15 forages et des pompes solaires pour le canton de Lam",
    image_url: "https://images.unsplash.com/photo-1534330207526-8e81f10ec6fc?w=800",
    category: "projet",
    canton: "lam",
    published: true,
    created_date: "2026-03-08T14:30:00Z"
  },
  {
    id: generateId(),
    title: "Réunion stratégique avec les chefs traditionnels de Bidzar",
    content: "Une rencontre importante s'est tenue avec les chefs traditionnels de Bidzar I et Bidzar II. Les discussions ont porté sur les priorités de développement de ces cantons, notamment la réhabilitation des pistes rurales et la construction d'un centre de santé intégré.",
    excerpt: "Concertation avec les autorités traditionnelles de Bidzar",
    image_url: "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?w=800",
    category: "reunion",
    canton: "bidzar_1",
    published: true,
    created_date: "2026-03-05T09:00:00Z"
  },
  {
    id: generateId(),
    title: "Les jeunes de Biou s'engagent pour le changement",
    content: "Un collectif de jeunes du canton de Biou a organisé une journée citoyenne de nettoyage et de reboisement. Cette initiative, soutenue par notre mouvement, a mobilisé plus de 200 jeunes volontaires. C'est la preuve que la jeunesse de Figuil est prête à construire un avenir meilleur.",
    excerpt: "200 jeunes mobilisés pour une journée citoyenne à Biou",
    image_url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800",
    category: "terrain",
    canton: "biou",
    published: true,
    created_date: "2026-03-01T11:00:00Z"
  },
  {
    id: generateId(),
    title: "Communiqué : Calendrier des activités de mars 2026",
    content: "Chers concitoyens, voici le calendrier de nos activités pour le mois de mars 2026. Nous prévoyons des visites dans tous les 5 cantons, des réunions publiques et des actions de proximité. Restez connectés pour ne rien manquer !",
    excerpt: "Programme complet des activités du mois de mars",
    image_url: "",
    category: "communique",
    canton: "tous",
    published: true,
    created_date: "2026-02-28T08:00:00Z"
  },
  {
    id: generateId(),
    title: "Brouillon : Bilan du premier trimestre (à finaliser)",
    content: "Article en cours de rédaction sur le bilan des trois premiers mois de campagne...",
    excerpt: "",
    image_url: "",
    category: "communique",
    canton: "tous",
    published: false,
    created_date: "2026-03-12T16:00:00Z"
  }
];

const mockSupporters = [
  {
    id: generateId(),
    name: "Amadou Bello",
    phone: "+237 6 98 76 54 32",
    email: "amadou.bello@email.com",
    canton: "figuil",
    village: "Figuil Centre",
    profile: "commercant",
    help_type: ["mobilisation", "logistique"],
    contacted: true,
    created_date: "2026-01-15T10:00:00Z"
  },
  {
    id: generateId(),
    name: "Fatimata Djibril",
    phone: "+237 6 77 88 99 00",
    email: "fatimata.d@email.com",
    canton: "lam",
    village: "Lam Village",
    profile: "femme",
    help_type: ["communication", "mobilisation"],
    contacted: true,
    created_date: "2026-01-20T14:00:00Z"
  },
  {
    id: generateId(),
    name: "Ibrahim Oumarou",
    phone: "+237 6 55 44 33 22",
    email: "",
    canton: "biou",
    village: "Biou Centre",
    profile: "agriculteur",
    help_type: ["terrain"],
    contacted: false,
    created_date: "2026-02-01T09:00:00Z"
  },
  {
    id: generateId(),
    name: "Hawa Saidou",
    phone: "+237 6 11 22 33 44",
    email: "hawa.s@email.com",
    canton: "bidzar_1",
    village: "Bidzar Marché",
    profile: "enseignant",
    help_type: ["communication", "mobilisation"],
    contacted: true,
    created_date: "2026-02-10T11:00:00Z"
  },
  {
    id: generateId(),
    name: "Moussa Hamadou",
    phone: "+237 6 66 77 88 99",
    email: "",
    canton: "bidzar_2",
    village: "Bidzar II",
    profile: "eleveur",
    help_type: ["terrain", "logistique"],
    contacted: false,
    created_date: "2026-02-15T08:30:00Z"
  },
  {
    id: generateId(),
    name: "Aïcha Bouba",
    phone: "+237 6 99 88 77 66",
    email: "aicha.bouba@email.com",
    canton: "figuil",
    village: "Figuil Nord",
    profile: "jeune",
    help_type: ["communication", "terrain"],
    contacted: false,
    created_date: "2026-02-20T15:00:00Z"
  },
  {
    id: generateId(),
    name: "Abdoulaye Yaya",
    phone: "+237 6 33 22 11 00",
    email: "",
    canton: "lam",
    village: "Lam Plateau",
    profile: "agriculteur",
    help_type: ["mobilisation", "terrain"],
    contacted: true,
    created_date: "2026-02-25T10:30:00Z"
  },
  {
    id: generateId(),
    name: "Mariama Ousmane",
    phone: "+237 6 44 55 66 77",
    email: "mariama.o@email.com",
    canton: "biou",
    village: "Biou Sud",
    profile: "femme",
    help_type: ["logistique", "communication"],
    contacted: false,
    created_date: "2026-03-01T13:00:00Z"
  },
  {
    id: generateId(),
    name: "Saliou Djafarou",
    phone: "+237 6 22 33 44 55",
    email: "",
    canton: "figuil",
    village: "Figuil Est",
    profile: "jeune",
    help_type: ["mobilisation", "communication", "terrain"],
    contacted: true,
    created_date: "2026-03-05T09:00:00Z"
  },
  {
    id: generateId(),
    name: "Djamilatou Issa",
    phone: "+237 6 88 77 66 55",
    email: "djamila.issa@email.com",
    canton: "bidzar_1",
    village: "Bidzar Centre",
    profile: "commercant",
    help_type: ["logistique"],
    contacted: false,
    created_date: "2026-03-08T16:00:00Z"
  }
];

const mockTestimonials = [
  {
    id: generateId(),
    name: "Alhaji Bouba Djoda",
    role: "Chef traditionnel",
    canton: "figuil",
    category: "leader",
    message: "Emmanuel Foka est un fils du terroir qui connaît les réalités de notre commune. Sa vision pour Figuil est claire et réaliste. Je suis convaincu qu'il est l'homme de la situation pour conduire le développement de notre localité.",
    photo_url: "",
    video_url: "",
    featured: true,
    created_date: "2026-02-01T10:00:00Z"
  },
  {
    id: generateId(),
    name: "Salamatou Adamou",
    role: "Présidente association des femmes",
    canton: "lam",
    category: "femme",
    message: "Pour la première fois, un candidat prend en compte les préoccupations des femmes. L'accès à l'eau, les centres de santé maternelle, le soutien aux activités génératrices de revenus... Emmanuel Foka nous a écoutées et a intégré nos besoins dans son programme.",
    photo_url: "",
    video_url: "",
    featured: true,
    created_date: "2026-02-10T14:00:00Z"
  },
  {
    id: generateId(),
    name: "Ousmane Yadji",
    role: "Étudiant en informatique",
    canton: "figuil",
    category: "jeune",
    message: "En tant que jeune, je vois en Emmanuel Foka quelqu'un qui comprend nos aspirations. Son projet de centre numérique et de formation professionnelle peut changer la vie de centaines de jeunes de Figuil.",
    photo_url: "",
    video_url: "",
    featured: false,
    created_date: "2026-02-15T11:00:00Z"
  },
  {
    id: generateId(),
    name: "Hamidou Bakary",
    role: "Agriculteur",
    canton: "biou",
    category: "agriculteur",
    message: "Le projet de barrage et d'irrigation que propose Emmanuel Foka va transformer l'agriculture dans notre canton. Nous avons besoin de quelqu'un qui investit dans le monde rural, pas seulement dans les centres urbains.",
    photo_url: "",
    video_url: "",
    featured: true,
    created_date: "2026-02-20T09:00:00Z"
  },
  {
    id: generateId(),
    name: "Aissatou Djouldé",
    role: "Commerçante",
    canton: "bidzar_2",
    category: "commercant",
    message: "Le marché de Bidzar a besoin de modernisation. Emmanuel Foka a promis la construction d'un nouveau marché couvert avec des espaces adaptés. C'est exactement ce dont nous avons besoin pour développer nos activités commerciales.",
    photo_url: "",
    video_url: "",
    featured: false,
    created_date: "2026-03-01T15:00:00Z"
  },
  {
    id: generateId(),
    name: "Daouda Issa",
    role: "Éleveur",
    canton: "bidzar_1",
    category: "eleveur",
    message: "Les éleveurs de Bidzar ont longtemps été oubliés. Emmanuel Foka est le premier à proposer des abreuvoirs modernes et un véritable soutien vétérinaire pour nos troupeaux. Nous avons confiance en lui.",
    photo_url: "",
    video_url: "",
    featured: false,
    created_date: "2026-03-05T08:00:00Z"
  }
];

// Initialisation en mémoire
store['NewsArticle'] = [...mockNewsArticles];
store['Supporter'] = [...mockSupporters];
store['Testimonial'] = [...mockTestimonials];

// --- ENTITY CRUD FACTORY ---

function createEntityApi(entityName) {
  return {
    async list(sortField) {
      await new Promise(r => setTimeout(r, 100));
      let data = [...(store[entityName] || [])];
      
      if (sortField) {
        const desc = sortField.startsWith('-');
        const field = desc ? sortField.slice(1) : sortField;
        data.sort((a, b) => {
          const valA = a[field] || '';
          const valB = b[field] || '';
          if (valA < valB) return desc ? 1 : -1;
          if (valA > valB) return desc ? -1 : 1;
          return 0;
        });
      }
      
      return data;
    },

    async create(newItem) {
      await new Promise(r => setTimeout(r, 150));
      const item = {
        ...newItem,
        id: generateId(),
        created_date: new Date().toISOString()
      };
      store[entityName] = [item, ...(store[entityName] || [])];
      return item;
    },

    async update(id, updates) {
      await new Promise(r => setTimeout(r, 150));
      const data = store[entityName] || [];
      const index = data.findIndex(item => item.id === id);
      if (index === -1) throw new Error(`${entityName} #${id} non trouvé`);
      data[index] = { ...data[index], ...updates };
      return data[index];
    },

    async delete(id) {
      await new Promise(r => setTimeout(r, 100));
      store[entityName] = (store[entityName] || []).filter(item => item.id !== id);
      return { success: true };
    }
  };
}

export const base44 = {
  entities: {
    NewsArticle: createEntityApi('NewsArticle'),
    Supporter: createEntityApi('Supporter'),
    Testimonial: createEntityApi('Testimonial'),
  }
};
