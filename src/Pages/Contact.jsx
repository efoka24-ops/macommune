import React from 'react';
import { Phone, Mail, MapPin, Clock, Facebook, Youtube, Twitter } from 'lucide-react';
import { motion } from 'framer-motion';

const contacts = [
  { icon: Phone, title: 'Téléphone', lines: ['+237 6XX XXX XXX', '+237 6XX XXX XXX'], bg: 'bg-green-50', ic: 'text-green-600' },
  { icon: Mail, title: 'Email', lines: ['contact@foka-figuil.cm', 'campagne@foka-figuil.cm'], bg: 'bg-blue-50', ic: 'text-blue-600' },
  { icon: MapPin, title: 'Quartier général', lines: ['Figuil Centre', 'Département du Mayo-Louti, Cameroun'], bg: 'bg-green-50', ic: 'text-green-600' },
  { icon: Clock, title: "Heures d'ouverture", lines: ['Lun – Sam : 8h00 – 18h00', 'Dimanche : sur rendez-vous'], bg: 'bg-blue-50', ic: 'text-blue-600' },
];

const socials = [
  { icon: Facebook, label: 'Facebook', href: '#', hoverClass: 'hover:text-blue-600' },
  { icon: Youtube, label: 'YouTube', href: '#', hoverClass: 'hover:text-red-600' },
  { icon: Twitter, label: 'Twitter / X', href: '#', hoverClass: 'hover:text-slate-800' },
];

const cantons = [
  { name: 'Figuil', phone: '+237 6XX XXX XXX' },
  { name: 'Lam', phone: '+237 6XX XXX XXX' },
  { name: 'Biou', phone: '+237 6XX XXX XXX' },
  { name: 'Bidzar I', phone: '+237 6XX XXX XXX' },
  { name: 'Bidzar II', phone: '+237 6XX XXX XXX' },
];

export default function Contact() {
  return (
    <div className="min-h-screen">
      <section className="bg-blue-950 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 bg-green-600/20 border border-green-500/40 text-green-400 text-sm font-medium px-4 py-2 rounded-full mb-6">
              <MapPin className="w-4 h-4" /> Prenons contact
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4">Nous Contacter</h1>
            <p className="text-blue-200 text-xl max-w-2xl mx-auto">
              Une question, une suggestion, ou vous souhaitez nous rencontrer ? Nous sommes à votre écoute.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contacts.map(({ icon: Icon, title, lines, bg, ic }, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 hover:shadow-lg transition-all">
                <div className={"w-14 h-14 rounded-2xl flex items-center justify-center mb-5 " + bg + " " + ic}>
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="font-extrabold text-blue-950 text-lg mb-2">{title}</h3>
                {lines.map((l, j) => <p key={j} className="text-slate-500 text-sm">{l}</p>)}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <span className="text-green-600 font-semibold text-sm uppercase tracking-wider">Représentants cantonaux</span>
              <h2 className="text-3xl font-extrabold text-blue-950 mt-2 mb-8">Contacts par canton</h2>
              <div className="space-y-4">
                {cantons.map((c, i) => (
                  <div key={i} className="flex items-center justify-between bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-950 text-white rounded-full flex items-center justify-center font-bold text-sm">
                        {c.name.slice(0, 2).toUpperCase()}
                      </div>
                      <span className="font-semibold text-slate-800">Canton de {c.name}</span>
                    </div>
                    <a href={"tel:" + c.phone.replace(/\s/g, '')}
                      className="flex items-center gap-2 text-green-600 font-semibold text-sm hover:text-green-700">
                      <Phone className="w-4 h-4" />{c.phone}
                    </a>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <span className="text-green-600 font-semibold text-sm uppercase tracking-wider">Réseaux sociaux</span>
              <h2 className="text-3xl font-extrabold text-blue-950 mt-2 mb-8">Suivez la campagne</h2>
              <div className="space-y-4">
                {socials.map(({ icon: Icon, label, href, hoverClass }, i) => (
                  <a key={i} href={href} target="_blank" rel="noopener noreferrer"
                    className={"flex items-center gap-4 bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-lg transition-all group text-slate-600 " + hoverClass}>
                    <Icon className="w-8 h-8 flex-shrink-0 transition-colors" />
                    <div>
                      <div className="font-bold text-slate-900">{label}</div>
                      <div className="text-sm text-slate-500">@fokafiguil</div>
                    </div>
                  </a>
                ))}
              </div>
              <div className="mt-8 bg-blue-950 rounded-2xl p-8 text-white">
                <h3 className="font-extrabold text-xl mb-2">Rejoignez le mouvement !</h3>
                <p className="text-blue-200 text-sm mb-5">Inscrivez-vous comme sympathisant et recevez toutes nos actualités.</p>
                <a href="/join" className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3 rounded-xl transition-colors text-sm">
                  S'inscrire maintenant
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
