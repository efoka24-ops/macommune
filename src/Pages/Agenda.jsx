import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, Users } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';

const TYPE_CONFIG = {
  meeting: { label: 'Meeting', color: 'bg-green-100 text-green-700' },
  rencontre: { label: 'Rencontre', color: 'bg-blue-100 text-blue-700' },
  forum: { label: 'Forum', color: 'bg-amber-100 text-amber-700' },
  autre: { label: 'Événement', color: 'bg-slate-100 text-slate-600' },
};

const CANTON_LABELS = {
  figuil: 'Figuil',
  lam: 'Lam',
  biou: 'Biou',
  bidzar_1: 'Bidzar 1',
  bidzar_2: 'Bidzar 2',
};

function formatDateFr(isoDate) {
  if (!isoDate) return '';
  const d = new Date(isoDate);
  const jours = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
  const mois = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
  return `${jours[d.getDay()]} ${d.getDate()} ${mois[d.getMonth()]} ${d.getFullYear()}`;
}

function formatDay(isoDate) {
  if (!isoDate) return '';
  return new Date(isoDate).getDate().toString().padStart(2, '0');
}

function formatMonth(isoDate) {
  if (!isoDate) return '';
  const mois = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];
  return mois[new Date(isoDate).getMonth()];
}

function formatTime(isoDate) {
  if (!isoDate) return null;
  const d = new Date(isoDate);
  const h = d.getHours(), m = d.getMinutes();
  if (h === 0 && m === 0) return null;
  return `${h.toString().padStart(2, '0')}h${m.toString().padStart(2, '0')}`;
}

export default function Agenda() {
  const { data: evenements = [], isLoading } = useQuery({
    queryKey: ['evenements'],
    queryFn: () => base44.entities.Evenement.list('date'),
  });

  const now = new Date();
  const upcoming = evenements.filter(e => !e.date || new Date(e.date) >= now);
  const past = evenements.filter(e => e.date && new Date(e.date) < now);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-blue-950 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 bg-green-600/20 border border-green-500/40 text-green-400 text-sm font-medium px-4 py-2 rounded-full mb-6">
              <Calendar className="w-4 h-4" /> Campagne 2026
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4">Agenda & Événements</h1>
            <p className="text-blue-200 text-xl max-w-2xl">
              Rejoignez-nous sur le terrain — meetings, rencontres et forums dans les 5 cantons de la commune de Figuil.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Upcoming events */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <span className="text-green-600 font-semibold text-sm uppercase tracking-wider">À venir</span>
            <h2 className="text-3xl font-extrabold text-blue-950 mt-1">Prochains événements</h2>
          </div>

          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-32 bg-white rounded-2xl border border-slate-100 animate-pulse" />
              ))}
            </div>
          ) : upcoming.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-100">
              <Calendar className="w-14 h-14 text-slate-200 mx-auto mb-4" />
              <p className="text-slate-400 text-lg">Aucun événement planifié pour le moment.</p>
              <p className="text-slate-400 text-sm mt-1">Revenez bientôt — la campagne démarre fort !</p>
            </div>
          ) : (
            <div className="space-y-5">
              {upcoming.map((ev, i) => {
                const typeConf = TYPE_CONFIG[ev.type] || TYPE_CONFIG.autre;
                const time = formatTime(ev.date);
                return (
                  <motion.div key={ev.id}
                    initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all p-6 flex gap-5">
                    {/* Date badge */}
                    <div className="flex-shrink-0 w-16 h-16 bg-blue-950 text-white rounded-xl flex flex-col items-center justify-center">
                      <span className="text-2xl font-black leading-none">{formatDay(ev.date)}</span>
                      <span className="text-blue-300 text-xs font-semibold uppercase">{formatMonth(ev.date)}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${typeConf.color}`}>{typeConf.label}</span>
                        {ev.canton && (
                          <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                            {CANTON_LABELS[ev.canton] || ev.canton}
                          </span>
                        )}
                      </div>
                      <h3 className="font-extrabold text-blue-950 text-lg leading-snug mb-2">{ev.titre}</h3>
                      <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                        {ev.lieu && (
                          <span className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-green-600" /> {ev.lieu}
                          </span>
                        )}
                        {time && (
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-blue-600" /> {time}
                          </span>
                        )}
                      </div>
                      {ev.description && <p className="text-slate-600 text-sm mt-2 leading-relaxed">{ev.description}</p>}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Past events */}
      {past.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <span className="text-slate-400 font-semibold text-sm uppercase tracking-wider">Archives</span>
              <h2 className="text-2xl font-extrabold text-slate-500 mt-1">Événements passés</h2>
            </div>
            <div className="space-y-4">
              {past.slice().reverse().map((ev, i) => {
                const typeConf = TYPE_CONFIG[ev.type] || TYPE_CONFIG.autre;
                return (
                  <motion.div key={ev.id}
                    initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.04 }}
                    className="bg-slate-50 rounded-xl border border-slate-100 p-5 flex gap-4 opacity-70">
                    <div className="flex-shrink-0 w-14 h-14 bg-slate-200 text-slate-500 rounded-xl flex flex-col items-center justify-center">
                      <span className="text-xl font-black leading-none">{formatDay(ev.date)}</span>
                      <span className="text-slate-400 text-xs font-semibold uppercase">{formatMonth(ev.date)}</span>
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="text-xs font-semibold text-slate-500 bg-slate-200 px-2 py-0.5 rounded-full">{typeConf.label}</span>
                      </div>
                      <h4 className="font-bold text-slate-600">{ev.titre}</h4>
                      {ev.lieu && <p className="text-sm text-slate-400 flex items-center gap-1 mt-1"><MapPin className="w-3 h-3" /> {ev.lieu}</p>}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA join */}
      <section className="py-16 bg-blue-950 text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <Users className="w-12 h-12 text-green-400 mx-auto mb-4" />
          <h2 className="text-3xl font-extrabold mb-3">Participez à la campagne</h2>
          <p className="text-blue-200 mb-6">Rejoignez l'équipe d'Emmanuel FOKA et contribuez à construire le Figuil de demain.</p>
          <a href="/join"
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-4 rounded-xl text-lg transition-all">
            Nous rejoindre
          </a>
        </div>
      </section>
    </div>
  );
}
