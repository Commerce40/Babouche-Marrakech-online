jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { IMAGES } from '../data/products';

const CONTACT_WHATSAPP = "https://wa.me/221761421653?text="; // Assurez-vous que ce numéro est le bon

export const Hero = ({ t }) => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-16 pt-4">
      <motion.div 
        className="order-2 lg:order-1"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <span className="inline-block px-3 py-1 text-xs font-semibold text-indigo-600 bg-indigo-50 rounded-full mb-4">Nouvelle Collection</span>
        
        {/* H1 : Babouches Marocaines Artisanales pour Hommes */}
        <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">{t('heroTitle')}</h2>
        
        {/* Sous-titre : Proposition de Valeur */}
        <p className="mt-4 text-xl font-medium text-indigo-700">{t('heroSubtitle')}</p> 

        <div className="mt-8 flex flex-wrap gap-4 items-center">
          <Link 
            to="/collection"
            className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg rounded-lg shadow-xl hover:shadow-2xl transition-all transform hover:scale-[1.01]"
          >
            Commander Maintenant
          </Link>
          
          <Link 
            to="/collection"
            className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-all"
          >
            Voir la Collection
          </Link>
        </div>

        {/* Mise en évidence des promesses de valeur */}
        <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500 border-t pt-6">
          <li className="flex items-center gap-2 text-gray-800 font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span> 100% Cuir Véritable
          </li>
          <li className="flex items-center gap-2 text-gray-800 font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span> Support Client WhatsApp Dakar
          </li>
          <li className="flex items-center gap-2 text-gray-800 font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span> Paiement à la Livraison
          </li>
        </ul>
      </motion.div>

      <motion.div 
        className="order-1 lg:order-2 relative group"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
        
        <div className="relative rounded-xl overflow-hidden shadow-lg aspect-[4/3] bg-gray-100">
          <motion.img
  src={IMAGES.BANNIERE_BABOUCHE}
  alt="Babouches marocaines artisanales"
  className="object-contain w-full h-full"
  loading="eager"
/>
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          />
        </div>
      </motion.div>
    </section>
  );
};