import React from 'react';
import { Link } from 'react-router-dom';

const Footer = ({ t }) => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">

        {/* Colonne 1 : La Marque */}
        <div>
          <h3 className="text-xl font-bold mb-4">Babouche Marrakech</h3>
          <p className="text-gray-400 text-sm">
            {t.footerText || "L'élégance marocaine à vos pieds, livrée partout au Sénégal."}
          </p>
        </div>

        {/* Colonne 2 : Liens Utiles */}
        <div>
          <h4 className="font-bold mb-4 text-gray-200">Informations</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link to="/a-propos" className="hover:text-white transition-colors">Notre Histoire</Link></li>
            <li><Link to="/guide-des-tailles" className="hover:text-white transition-colors">Guide des tailles</Link></li>
            <li><Link to="/cgv" className="hover:text-white transition-colors">CGV & Livraison</Link></li>
          </ul>
        </div>

        {/* Colonne 3 : Contact */}
        <div>
          <h4 className="font-bold mb-4 text-gray-200">Besoin d'aide ?</h4>
          <p className="text-gray-400 text-sm mb-2">Service client WhatsApp :</p>
          <a
            href="https://wa.me/221768352101"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-green-400 hover:text-green-300 font-bold"
          >
            Discuter avec nous
          </a>
        </div>
      </div>

      <div className="border-t border-gray-800 pt-8 text-center text-xs text-gray-500">
        <p>© 2026 Babouche Marrakech. Tous droits réservés.</p>
      </div>
    </footer>
  );
};

export default Footer;