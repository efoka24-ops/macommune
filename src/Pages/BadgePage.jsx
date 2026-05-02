import React, { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Download, ImageIcon, RefreshCw, Facebook, Twitter, Share2, Users, Send } from 'lucide-react';
import { toast } from 'sonner';
import html2canvas from 'html2canvas';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';

const CANDIDATE_IMG = '/images/foka-portrait.jpg';
const SHARE_TEXT = encodeURIComponent('Je soutiens Emmanuel FOKA pour les élections municipales de Figuil 2026 ! #FokaFiguil2026');
const SHARE_URL = encodeURIComponent('https://foka-figuil.cm');

export default function BadgePage() {
  const [userPhoto, setUserPhoto] = useState(null);
  const [generating, setGenerating] = useState(false);
  const [userName, setUserName] = useState('');
  const [addedToWall, setAddedToWall] = useState(false);
  const fileInputRef = useRef(null);
  const badgeRef = useRef(null);
  const qc = useQueryClient();

  const { data: badges = [] } = useQuery({
    queryKey: ['badges'],
    queryFn: () => base44.entities.Badge.list('-created_date'),
  });

  const submitBadge = useMutation({
    mutationFn: (data) => base44.entities.Badge.create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['badges'] });
      qc.invalidateQueries({ queryKey: ['badge-count'] });
      toast.success('Votre soutien a été ajouté au mur des soutiens !');
    },
    onError: () => toast.error("Erreur lors de l'envoi."),
  });

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => { setUserPhoto(ev.target.result); setAddedToWall(false); };
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = useCallback(async () => {
    if (!badgeRef.current) return;
    setGenerating(true);
    try {
      const canvas = await html2canvas(badgeRef.current, { useCORS: true, allowTaint: true, scale: 2, backgroundColor: null });
      const link = document.createElement('a');
      link.download = 'badge-foka-figuil.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
      toast.success('Badge téléchargé !');
      if (userName.trim() && userPhoto && !addedToWall) {
        submitBadge.mutate({ nom: userName.trim(), photo: userPhoto });
        setAddedToWall(true);
      }
    } catch {
      toast.error('Erreur lors du téléchargement.');
    } finally {
      setGenerating(false);
    }
  }, [userName, userPhoto, addedToWall, submitBadge]);

  const handleReset = () => {
    setUserPhoto(null);
    setUserName('');
    setAddedToWall(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const rays = [...Array(18)].map((_, i) => {
    const angle = (i * 360) / 18;
    const rad = (angle * Math.PI) / 180;
    const inner = 13, outer = i % 2 === 0 ? 28 : 20;
    return {
      x1: 28 + inner * Math.cos(rad), y1: 28 + inner * Math.sin(rad),
      x2: 28 + outer * Math.cos(rad), y2: 28 + outer * Math.sin(rad),
      w: i % 2 === 0 ? 2.5 : 1.5,
    };
  });

  return (
    <div className="min-h-screen">
      <section className="bg-blue-950 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 bg-green-600/20 border border-green-500/40 text-green-400 text-sm font-medium px-4 py-2 rounded-full mb-6">
              <ImageIcon className="w-4 h-4" /> Soutien Officiel
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4">Générer mon Badge</h1>
            <p className="text-blue-200 text-xl max-w-2xl mx-auto">
              Créez votre badge de soutien personnalisé et partagez-le sur les réseaux sociaux.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-slate-50 overflow-x-hidden">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
          <style>{`
            @media (max-width: 430px) {
              .badge-preview {
                transform: scale(calc((100vw - 32px) / 400));
                transform-origin: top center;
                margin-bottom: calc(((100vw - 32px) / 400 - 1) * 480px);
              }
            }
          `}</style>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }} className="flex flex-col items-center">

            {/* Badge preview */}
            <div ref={badgeRef} className="badge-preview" style={{ width: 400, height: 480, position: 'relative', overflow: 'hidden', borderRadius: 16, background: '#2d4a5a', fontFamily: 'sans-serif', flexShrink: 0 }}>
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #3a5a6e 0%, #2d4a5a 55%, #1a2f40 100%)' }} />
              {userPhoto ? (
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 120, overflow: 'hidden' }}>
                  <img src={userPhoto} alt="Votre photo" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }} crossOrigin="anonymous" />
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '45%', background: 'linear-gradient(to bottom, transparent, #1a2f40)' }} />
                </div>
              ) : (
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 120 }}>
                  <svg viewBox="0 0 400 360" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMax meet">
                    <ellipse cx="200" cy="100" rx="75" ry="88" fill="#1e3a4a" opacity="0.95" />
                    <path d="M30 360 Q30 220 200 200 Q370 220 370 360 Z" fill="#1e3a4a" opacity="0.95" />
                  </svg>
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%', background: 'linear-gradient(to bottom, transparent, #1a2f40)' }} />
                </div>
              )}
              <div style={{ position: 'absolute', top: 14, right: 18, zIndex: 20 }}>
                <svg width="56" height="56" viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg">
                  {rays.map((r, i) => <line key={i} x1={r.x1} y1={r.y1} x2={r.x2} y2={r.y2} stroke="#D4A017" strokeWidth={r.w} />)}
                  <circle cx="28" cy="28" r="11" fill="#D4A017" />
                </svg>
              </div>
              <div style={{ position: 'absolute', bottom: 148, left: 0, right: 0, textAlign: 'center', zIndex: 15 }}>
                <span style={{ fontFamily: "'Georgia', serif", fontSize: 58, fontWeight: 400, fontStyle: 'italic', color: '#D4A017', textShadow: '0 2px 12px rgba(0,0,0,0.7)', letterSpacing: 3 }}>
                  Je vote
                </span>
              </div>
              <div style={{ position: 'absolute', bottom: 122, left: 0, right: 0, height: 2, zIndex: 20, background: 'linear-gradient(90deg, transparent 0%, #D4A017 15%, #D4A017 85%, transparent 100%)' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 120, background: 'linear-gradient(135deg, #0f2030 0%, #132840 100%)', zIndex: 20, display: 'flex', alignItems: 'center', padding: '0 18px', gap: 12 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ color: '#fff', fontSize: 22, fontWeight: 900, letterSpacing: 1 }}>EMMANUEL</span>
                    <span style={{ color: '#D4A017', fontSize: 24, fontWeight: 900 }}>•</span>
                    <span style={{ color: '#D4A017', fontSize: 22, fontWeight: 900, letterSpacing: 1 }}>FOKA</span>
                  </div>
                  <div style={{ color: '#8ab0c8', fontSize: 12, marginTop: 5 }}>
                    Élections Municipales <span style={{ color: '#D4A017', fontWeight: 800 }}>2026</span> — Figuil
                  </div>
                  <div style={{ width: 50, height: 2, background: '#D4A017', marginTop: 8, borderRadius: 2 }} />
                </div>
                <div style={{ width: 90, height: 114, borderRadius: '10px 10px 0 0', overflow: 'hidden', border: '2px solid #D4A017', flexShrink: 0, alignSelf: 'flex-end' }}>
                  <img src={CANDIDATE_IMG} alt="Emmanuel FOKA" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }} crossOrigin="anonymous" />
                </div>
              </div>
            </div>

            {/* Action bar */}
            <div className="mt-6 w-full max-w-[400px] flex items-center justify-between bg-blue-950 rounded-2xl px-4 py-3 gap-2">
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
              <button onClick={() => fileInputRef.current?.click()} className="flex flex-col items-center gap-1 text-white/80 hover:text-white transition-colors">
                <ImageIcon className="w-5 h-5" /><span className="text-xs font-semibold">CHOISIR</span>
              </button>
              <span className="text-white/30 text-xl">›</span>
              <button onClick={handleReset} className="flex flex-col items-center gap-1 text-white/80 hover:text-white transition-colors">
                <RefreshCw className="w-5 h-5" /><span className="text-xs font-semibold">RÉINITIALISER</span>
              </button>
              <span className="text-white/30 text-xl">›</span>
              <button disabled={!userPhoto || generating} onClick={handleDownload}
                className="flex flex-col items-center gap-1 text-white/80 hover:text-white transition-colors disabled:opacity-40">
                <Download className="w-5 h-5" /><span className="text-xs font-semibold">TÉLÉCHARGER</span>
              </button>
            </div>

            {!userPhoto && (
              <p className="mt-4 text-sm text-slate-500 text-center">
                Cliquez sur <strong>CHOISIR</strong> pour ajouter votre photo et générer votre badge.
              </p>
            )}

            {/* Nom + partage (visibles dès qu'une photo est choisie) */}
            {userPhoto && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 w-full max-w-[400px] space-y-4">

                {/* Champ nom — auto-ajout au mur lors du téléchargement */}
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                    Votre nom <span className="text-green-600">(pour le Mur des soutiens)</span>
                  </label>
                  <input
                    type="text" value={userName} onChange={e => setUserName(e.target.value)}
                    placeholder="Prénom Nom" maxLength={60}
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-950 bg-white shadow-sm"
                  />
                  <p className="text-xs text-slate-400 mt-1">
                    {addedToWall
                      ? '✓ Votre soutien a bien été ajouté au mur !'
                      : 'En téléchargeant votre badge, vous serez automatiquement ajouté au Mur des soutiens.'}
                  </p>
                </div>

                {/* Partage réseaux */}
                <div>
                  <p className="text-center text-sm font-semibold text-slate-600 mb-3 flex items-center justify-center gap-2">
                    <Share2 className="w-4 h-4" /> Partager mon soutien
                  </p>
                  <div className="flex gap-2 justify-center flex-wrap">
                    <a href={"https://www.facebook.com/sharer/sharer.php?u=" + SHARE_URL + "&quote=" + SHARE_TEXT}
                      target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-[#1877F2] hover:bg-[#166fe5] text-white font-semibold px-4 py-3 rounded-xl text-sm transition-all">
                      <Facebook className="w-4 h-4" /> Facebook
                    </a>
                    <a href={"https://wa.me/?text=" + SHARE_TEXT + "%20" + SHARE_URL}
                      target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20b857] text-white font-semibold px-4 py-3 rounded-xl text-sm transition-all">
                      <Send className="w-4 h-4" /> WhatsApp
                    </a>
                    <a href={"https://twitter.com/intent/tweet?text=" + SHARE_TEXT + "&url=" + SHARE_URL}
                      target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold px-4 py-3 rounded-xl text-sm transition-all">
                      <Twitter className="w-4 h-4" /> Twitter
                    </a>
                  </div>
                </div>

              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Mur des soutiens */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-green-600 font-semibold text-sm uppercase tracking-wider">Communauté</span>
            <h2 className="text-4xl font-extrabold text-blue-950 mt-2 mb-3">Mur des Soutiens</h2>
            <p className="text-slate-500 text-lg">
              {badges.length > 0
                ? badges.length + ' personne' + (badges.length > 1 ? 's affichent' : ' affiche') + ' fièrement leur soutien'
                : 'Soyez le premier à afficher votre soutien !'}
            </p>
          </div>
          {badges.length === 0 ? (
            <div className="text-center py-16">
              <Users className="w-16 h-16 text-slate-200 mx-auto mb-4" />
              <p className="text-slate-400 text-lg">Le mur est vide pour l'instant.</p>
              <p className="text-slate-400 text-sm mt-1">Générez votre badge et rejoignez le mouvement !</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {badges.map((b, i) => (
                <motion.div key={b.id}
                  initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.03 }}
                  className="flex flex-col items-center gap-2">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-blue-950 shadow-md">
                    {b.photo
                      ? <img src={b.photo} alt={b.nom} className="w-full h-full object-cover object-top" />
                      : <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400 text-2xl font-bold">
                          {(b.nom || '?')[0].toUpperCase()}
                        </div>
                    }
                  </div>
                  <span className="text-xs font-semibold text-slate-700 text-center leading-tight">{b.nom}</span>
                  <span className="text-[10px] text-green-600 font-medium">✓ Je vote</span>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
