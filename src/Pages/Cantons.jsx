import React, { useState } from 'react';
import { MapPin, Users, Droplet, BookOpen, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';

const cantons = [
  {
    id: 'figuil',
    name: 'Canton de Figuil',
    chef_lieu: 'Figuil',
    population: '35 000',
    villages: 48,
    desc: "Chef-lieu de l'arrondissement, Figuil est le cœur économique et administratif de la commune. Centre commercial, éducatif et sanitaire principal.",
    priorities: ['Business Zone et marché moderne', 'Centre de santé de référence', 'Université Rurale et incubateur', 'Éclairage et routes bitumées'],
    projects: ['Business Zone Figuil', 'Centre de Santé Moderne', 'Université Rurale', 'Incubateur MOKINE'],
  },
  {
    id: 'lam',
    name: 'Canton de Lam',
    chef_lieu: 'Lam',
    population: '18 000',
    villages: 35,
    desc: "Canton agricole par excellence, Lam concentre une grande partie de la production céréalière et d'élevage de la commune. Zone à fort potentiel économique.",
    priorities: ['Marché couvert et chambre froide', 'Forages et eau potable', 'Pistes agricoles bitumées', 'Coopératives agricoles'],
    projects: ['Marché Moderne Lam', '30 Forages Solaires', 'Routes Structurantes Lam', 'Programme Femmes 500'],
  },
  {
    id: 'biou',
    name: 'Canton de Biou',
    chef_lieu: 'Biou',
    population: '12 000',
    villages: 28,
    desc: "Canton pastoral au nord de la commune, Biou accueille une grande communauté d'éleveurs. Ses ressources pastorales sont un atout majeur pour le développement.",
    priorities: ['Couloirs de transhumance sécurisés', 'Centres vétérinaires', 'Forages pastoraux', 'Électrification solaire'],
    projects: ['20 Forages Pastoraux', 'Centre Vétérinaire Biou', 'Éclairage Solaire Biou', 'MOKINE Élevage Biou'],
  },
  {
    id: 'bidzar_1',
    name: 'Canton Bidzar I',
    chef_lieu: 'Bidzar',
    population: '10 500',
    villages: 22,
    desc: "Bidzar I couvre la partie orientale du canton historique de Bidzar. Terres fertiles propices à la polyculture et à l'agropastoralisme.",
    priorities: ['Aménagements hydro-agricoles', 'École numérique', 'Centre multiservices', 'Route Bidzar-Figuil'],
    projects: ['Forages Bidzar I', 'École Numérique Bidzar', 'Centre Multiservices', 'Piste Bidzar-Figuil'],
  },
  {
    id: 'bidzar_2',
    name: 'Canton Bidzar II',
    chef_lieu: 'Bidzar',
    population: '8 000',
    villages: 18,
    desc: "Bidzar II couvre la partie occidentale, avec une population à dominante agropastorale. Zone enclavée qui bénéficiera en priorité des routes et forages.",
    priorities: ['Désenclavement prioritaire', 'Forages et eau potable', 'Formation agricole', 'Terrain de sport'],
    projects: ['Route Désenclavement', '15 Forages Bidzar II', 'Formation Agricole', 'Complexe Sportif Bidzar'],
  },
];

const icons = [MapPin, Users, Droplet, BookOpen, Briefcase];

export default function Cantons() {
  const [active, setActive] = useState(0);
  const canton = cantons[active];

  return (
    <div className="min-h-screen">
      <section className="bg-blue-950 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 bg-green-600/20 border border-green-500/40 text-green-400 text-sm font-medium px-4 py-2 rounded-full mb-6">
              <MapPin className="w-4 h-4" /> Territoire
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4">Nos 5 Cantons</h1>
            <p className="text-blue-200 text-xl max-w-2xl mx-auto">
              La commune de Figuil regroupe 5 cantons, chacun avec ses spécificités et ses besoins. Notre programme répond à chacun d'eux.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {cantons.map((c, i) => (
              <button key={c.id} onClick={() => setActive(i)}
                className={"flex items-center gap-2 px-5 py-3 rounded-xl font-semibold transition-all " + (active === i ? 'bg-blue-950 text-white shadow-lg' : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300 hover:shadow-sm')}>
                <MapPin className="w-4 h-4" />{c.name}
              </button>
            ))}
          </div>

          <motion.div key={canton.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="bg-blue-950 text-white p-8 md:p-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                  <div className="md:col-span-2">
                    <h2 className="text-3xl font-extrabold mb-2">{canton.name}</h2>
                    <div className="flex flex-wrap gap-4 text-blue-200 text-sm mb-4">
                      <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />Chef-lieu : {canton.chef_lieu}</span>
                      <span className="flex items-center gap-1"><Users className="w-4 h-4" />{canton.population} habitants</span>
                      <span>{canton.villages} villages</span>
                    </div>
                    <p className="text-blue-200 leading-relaxed">{canton.desc}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white/10 rounded-2xl p-4 text-center">
                      <div className="text-3xl font-black">{canton.population}</div>
                      <div className="text-blue-200 text-xs">habitants</div>
                    </div>
                    <div className="bg-white/10 rounded-2xl p-4 text-center">
                      <div className="text-3xl font-black">{canton.villages}</div>
                      <div className="text-blue-200 text-xs">villages</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                  <h3 className="text-xl font-extrabold text-blue-950 mb-5">Priorités pour ce canton</h3>
                  <ul className="space-y-3">
                    {canton.priorities.map((p, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-green-600 font-bold text-xs">{i + 1}</span>
                        </div>
                        <span className="text-slate-700">{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-blue-950 mb-5">Projets prévus</h3>
                  <div className="grid grid-cols-1 gap-3">
                    {canton.projects.map((p, i) => (
                      <div key={i} className="bg-slate-50 rounded-xl px-4 py-3 flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-600 rounded-full flex-shrink-0" />
                        <span className="text-slate-700 font-medium text-sm">{p}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
