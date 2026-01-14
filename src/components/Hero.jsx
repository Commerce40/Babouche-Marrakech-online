import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const Hero = ({ t }) => {
  return (
    <section className="relative min-h-[85svh] flex items-center overflow-hidden pt-24">
      
      {/* IMAGE HERO (FIABLE SUR MOBILE & DESKTOP) */}
      <img
        src="/images/banniere-babouche-marrakech.jpg"
        alt="Babouche Marrakech – Babouches marocaines artisanales"
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
      />

      {/* OVERLAY POUR LISIBILITÉ */}
      <div className="absolute inset-0 bg-black/55" />

      {/* CONTENU */}
      <div className="relative z-10 w-full max-w-xl sm:max-w-2xl lg:max-w-3xl mx-auto px-6 text-center sm:text-left">
        
        {/* BADGE */}
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-block mb-4 px-4 py-1 text-xs font-semibold tracking-wide text-white bg-indigo-600 rounded-full"
        >
          Nouvelle collection
        </motion.span>

        {/* TITRE */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight drop-shadow-lg"
        >
          {t && (t.heroTitle || t('heroTitle'))}
        </motion.h1>

        {/* SOUS-TITRE */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-4 text-base sm:text-lg text-white/90"
        >
          {t && (t.heroSubtitle || t('heroSubtitle'))}
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 flex flex-col sm:flex-row gap-4"
        >
          <Link
            to="/collection"
            className="w-full sm:w-auto px-6 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow-lg transition"
          >
            Commander maintenant
          </Link>

          <Link
            to="/collection"
            className="w-full sm:w-auto px-6 py-4 bg-white/90 hover:bg-white text-gray-900 font-semibold rounded-lg shadow transition"
          >
            Voir la collection
          </Link>
        </motion.div>

        {/* PROMESSES */}
        <ul className="mt-8 flex flex-col sm:flex-row gap-2 sm:gap-6 text-sm text-white/90">
          <li>✔ 100 % cuir véritable</li>
          <li>✔ Paiement à la livraison</li>
          <li>✔ Livraison rapide à Dakar</li>
        </ul>
      </div>
    </section>
  );
};