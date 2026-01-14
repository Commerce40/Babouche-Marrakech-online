import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import { translations } from './utils/translations';
import { usePixel } from './hooks/usePixel';

// --- IMPORT DES COMPOSANTS ---
import Header from './components/Header';
import Footer from './components/Footer'; // On utilise le nouveau Footer
import Cart from './components/Cart';

// --- IMPORT DES PAGES ---
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import AboutPage from './pages/AboutPage';
import SizeGuidePage from './pages/SizeGuidePage';
import TermsPage from './pages/TermsPage';
import CollectionPage from './pages/CollectionPage';

// Wrapper pour déclencher le pixel Facebook à chaque changement de page
const PageTracker = () => {
  usePixel(); 
  return null;
};

function App() {
  const [lang, setLang] = useState('fr');
  const t = translations[lang];
  const { initPixel } = usePixel();
  
  // Permet de remonter en haut de la page quand on change de route
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    // Initialisation du Pixel Facebook
    // Remplacez par votre ID réel
    initPixel('869346538681877'); 
  }, []);

  return (
    <CartProvider>
      <PageTracker />
      
      <div className="min-h-screen flex flex-col font-sans bg-gray-50">
        {/* Header (Navigation + Logo) */}
        <Header lang={lang} setLang={setLang} t={t} />
        
        {/* Panier (Slide-over caché par défaut) */}
        <Cart lang={lang} t={t} />
        
        {/* Contenu Principal */}
        <main className="flex-grow">
          <Routes>
            {/* Route Accueil */}
            <Route path="/" element={<HomePage lang={lang} t={t} />} />
            
            {/* Route Détail Produit (par slug) */}
            <Route path="/produit/:slug" element={<ProductDetailPage lang={lang} t={t} />} />
            
            {/* Pages Statiques */}
            <Route path="/a-propos" element={<AboutPage t={t} />} />
            <Route path="/collection" element={<CollectionPage lang={lang} t={t} />} />
            <Route path="/guide-des-tailles" element={<SizeGuidePage t={t} />} />
            <Route path="/cgv" element={<TermsPage t={t} />} />
          </Routes>
        </main>
        
        {/* Pied de page */}
        <Footer t={t} />
      </div>
    </CartProvider>
  );
}

export default App;