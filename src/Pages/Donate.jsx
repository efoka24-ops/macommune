import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageSquare, CheckCircle, XCircle, Loader2, RefreshCw, ChevronRight, Shield, Smartphone } from 'lucide-react';

const AMOUNTS = [1000, 2500, 5000, 10000, 25000, 50000];

const STEPS = { FORM: 'form', PENDING: 'pending', SUCCESS: 'success', ERROR: 'error' };

function formatXAF(n) {
  return new Intl.NumberFormat('fr-FR').format(n) + ' XAF';
}

export default function Donate() {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState('');
  const [phone, setPhone] = useState('+237 ');
  const [donorMessage, setDonorMessage] = useState('');
  const [step, setStep] = useState(STEPS.FORM);
  const [transactionId, setTransactionId] = useState(null);
  const [network, setNetwork] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [verifiedStatus, setVerifiedStatus] = useState(null);

  const effectiveAmount = selectedAmount || (customAmount ? Number(customAmount) : null);

  const handleAmountSelect = (a) => {
    setSelectedAmount(a);
    setCustomAmount('');
  };

  const handleCustomAmount = (e) => {
    setCustomAmount(e.target.value);
    setSelectedAmount(null);
  };

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!effectiveAmount || effectiveAmount < 500) {
      setErrorMsg('Veuillez choisir ou saisir un montant (minimum 500 XAF).');
      return;
    }
    if (!phone.trim()) {
      setErrorMsg('Veuillez entrer votre numéro Mobile Money.');
      return;
    }

    setStep(STEPS.PENDING);

    try {
      const res = await fetch('/api/donations/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: effectiveAmount,
          phone_number: phone.trim(),
          message: donorMessage.trim() || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || 'Une erreur est survenue.');
        setStep(STEPS.ERROR);
        return;
      }
      setTransactionId(data.transaction_id);
      setNetwork(data.network);
      setStep(STEPS.SUCCESS);
    } catch {
      setErrorMsg('Impossible de joindre le serveur de paiement. Vérifiez votre connexion.');
      setStep(STEPS.ERROR);
    }
  }, [effectiveAmount, phone, donorMessage]);

  const handleVerify = useCallback(async () => {
    if (!transactionId) return;
    setVerifying(true);
    try {
      const res = await fetch(`/api/donations/verify?id=${encodeURIComponent(transactionId)}`);
      const data = await res.json();
      setVerifiedStatus(data.status?.toLowerCase() || 'unknown');
    } catch {
      setVerifiedStatus('error');
    } finally {
      setVerifying(false);
    }
  }, [transactionId]);

  const resetForm = () => {
    setSelectedAmount(null);
    setCustomAmount('');
    setPhone('+237 ');
    setDonorMessage('');
    setTransactionId(null);
    setNetwork(null);
    setErrorMsg('');
    setVerifiedStatus(null);
    setStep(STEPS.FORM);
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-blue-950 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 bg-green-600/20 border border-green-500/40 text-green-400 text-sm font-medium px-4 py-2 rounded-full mb-6">
              <Heart className="w-4 h-4" /> Soutien financier
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4">Faire un Don</h1>
            <p className="text-blue-200 text-xl max-w-2xl">
              Participez au financement de la campagne d'Emmanuel FOKA. Chaque don, petit ou grand, contribue à construire le Figuil de demain.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">

            {/* FORM */}
            {step === STEPS.FORM && (
              <motion.div key="form" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
                  <h2 className="text-2xl font-extrabold text-blue-950 mb-6">Votre contribution</h2>

                  {/* Amount selection */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-slate-700 mb-3">Choisir un montant (XAF)</label>
                    <div className="grid grid-cols-3 gap-3 mb-3">
                      {AMOUNTS.map(a => (
                        <button key={a} type="button" onClick={() => handleAmountSelect(a)}
                          className={`py-3 rounded-xl font-bold text-sm border-2 transition-all ${
                            selectedAmount === a
                              ? 'bg-blue-950 border-blue-950 text-white shadow-md'
                              : 'bg-white border-slate-200 text-slate-700 hover:border-blue-950 hover:text-blue-950'
                          }`}>
                          {formatXAF(a)}
                        </button>
                      ))}
                    </div>
                    <div className="relative">
                      <input
                        type="number" min="500" value={customAmount} onChange={handleCustomAmount}
                        placeholder="Autre montant (min. 500 XAF)"
                        className={`w-full border-2 rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors ${
                          customAmount ? 'border-blue-950' : 'border-slate-200 focus:border-blue-950'
                        }`}
                      />
                    </div>
                    {effectiveAmount && effectiveAmount >= 500 && (
                      <p className="text-green-600 text-sm font-semibold mt-2 flex items-center gap-1">
                        <CheckCircle className="w-4 h-4" /> Montant sélectionné : {formatXAF(effectiveAmount)}
                      </p>
                    )}
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1">
                        Numéro Mobile Money *
                      </label>
                      <div className="relative">
                        <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="tel" value={phone}
                          onChange={e => {
                            const val = e.target.value;
                            setPhone(val.startsWith('+237') ? val : '+237 ');
                          }}
                          placeholder="+237 6XX XXX XXX" required
                          className="w-full border-2 border-slate-200 focus:border-blue-950 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none transition-colors"
                        />
                      </div>
                      <p className="text-slate-400 text-xs mt-1">MTN Mobile Money ou Orange Money</p>
                    </div>

                    {/* Message (optional) */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1">
                        Message d'encouragement <span className="text-slate-400 font-normal">(optionnel)</span>
                      </label>
                      <div className="relative">
                        <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                        <textarea
                          value={donorMessage} onChange={e => setDonorMessage(e.target.value)}
                          placeholder="Votre message pour Emmanuel FOKA..." maxLength={300} rows={3}
                          className="w-full border-2 border-slate-200 focus:border-blue-950 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none transition-colors resize-none"
                        />
                      </div>
                    </div>

                    {errorMsg && (
                      <div className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
                        <XCircle className="w-4 h-4 mt-0.5 flex-shrink-0" /> {errorMsg}
                      </div>
                    )}

                    <button type="submit"
                      disabled={!effectiveAmount || effectiveAmount < 500 || !phone.trim()}
                      className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-extrabold py-4 rounded-xl text-lg transition-all shadow-lg shadow-green-900/20 flex items-center justify-center gap-2">
                      <Heart className="w-5 h-5" />
                      {effectiveAmount && effectiveAmount >= 500
                        ? `Contribuer ${formatXAF(effectiveAmount)}`
                        : 'Contribuer'}
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </form>

                  {/* Security note */}
                  <div className="mt-5 flex items-center gap-2 text-slate-400 text-xs border-t border-slate-100 pt-4">
                    <Shield className="w-4 h-4 flex-shrink-0" />
                    Paiement sécurisé via <strong className="text-slate-500">Camoo Pay</strong> — Mobile Money MTN & Orange
                  </div>
                </div>
              </motion.div>
            )}

            {/* PENDING */}
            {step === STEPS.PENDING && (
              <motion.div key="pending" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                className="bg-white rounded-2xl shadow-sm border border-slate-100 p-10 text-center">
                <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-5">
                  <Loader2 className="w-10 h-10 text-blue-950 animate-spin" />
                </div>
                <h2 className="text-2xl font-extrabold text-blue-950 mb-2">Traitement en cours…</h2>
                <p className="text-slate-500">Votre demande de paiement est envoyée. Veuillez valider la transaction sur votre téléphone.</p>
              </motion.div>
            )}

            {/* SUCCESS */}
            {step === STEPS.SUCCESS && (
              <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                className="bg-white rounded-2xl shadow-sm border border-slate-100 p-10 text-center">
                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-5">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="text-2xl font-extrabold text-blue-950 mb-2">Demande envoyée !</h2>
                <p className="text-slate-600 mb-1">
                  Un message de confirmation a été envoyé à votre numéro Mobile Money.
                  {network && <span className="font-semibold"> ({network.toUpperCase()})</span>}
                </p>
                <p className="text-slate-500 text-sm mb-6">Validez la demande sur votre téléphone pour finaliser votre don.</p>

                {transactionId && (
                  <div className="bg-slate-50 rounded-xl px-4 py-3 mb-6 text-left text-sm">
                    <p className="text-slate-500">Référence transaction</p>
                    <p className="font-mono text-slate-700 text-xs mt-0.5 break-all">{transactionId}</p>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  {transactionId && (
                    <button onClick={handleVerify} disabled={verifying}
                      className="flex items-center justify-center gap-2 border-2 border-blue-950 text-blue-950 hover:bg-blue-50 font-semibold px-6 py-3 rounded-xl text-sm transition-all disabled:opacity-50">
                      {verifying ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
                      Vérifier le statut
                    </button>
                  )}
                  <button onClick={resetForm}
                    className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-all">
                    <Heart className="w-4 h-4" /> Faire un autre don
                  </button>
                </div>

                {verifiedStatus && (
                  <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                    className={`mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${
                      verifiedStatus === 'success' ? 'bg-green-100 text-green-700' :
                      verifiedStatus === 'pending' ? 'bg-amber-100 text-amber-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                    {verifiedStatus === 'success' && <><CheckCircle className="w-4 h-4" /> Paiement confirmé</>}
                    {verifiedStatus === 'pending' && <><Loader2 className="w-4 h-4 animate-spin" /> En attente de confirmation</>}
                    {verifiedStatus !== 'success' && verifiedStatus !== 'pending' && <><XCircle className="w-4 h-4" /> Statut : {verifiedStatus}</>}
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* ERROR */}
            {step === STEPS.ERROR && (
              <motion.div key="error" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                className="bg-white rounded-2xl shadow-sm border border-slate-100 p-10 text-center">
                <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-5">
                  <XCircle className="w-10 h-10 text-red-500" />
                </div>
                <h2 className="text-2xl font-extrabold text-blue-950 mb-2">Paiement échoué</h2>
                <p className="text-red-600 mb-6">{errorMsg}</p>
                <button onClick={resetForm}
                  className="inline-flex items-center gap-2 bg-blue-950 hover:bg-blue-900 text-white font-bold px-8 py-3 rounded-xl transition-all">
                  <RefreshCw className="w-4 h-4" /> Réessayer
                </button>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </section>

      {/* Why donate */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-green-600 font-semibold text-sm uppercase tracking-wider">Impact</span>
            <h2 className="text-3xl font-extrabold text-blue-950 mt-2">Pourquoi soutenir la campagne ?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { amount: '1 000 XAF', label: 'Finance une affiche de campagne dans un village', icon: '📌' },
              { amount: '5 000 XAF', label: 'Couvre les frais de déplacement d\'un délégué de canton', icon: '🚗' },
              { amount: '25 000 XAF', label: 'Organise une réunion de quartier avec les habitants', icon: '🤝' },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-slate-50 rounded-2xl border border-slate-100 p-6 text-center">
                <div className="text-4xl mb-3">{item.icon}</div>
                <div className="text-xl font-black text-blue-950 mb-2">{item.amount}</div>
                <p className="text-slate-600 text-sm leading-relaxed">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
