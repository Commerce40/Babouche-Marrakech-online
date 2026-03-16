import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu } from 'lucide-react'; 
import { useCart } from '../contexts/CartContext';

const Header = ({ lang, setLang, t }) => {
  const { cart, setIsCartOpen } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const cartCount = cart.reduce((acc, item) => acc + item.qty, 0);
  const location = useLocation();

  // Helper pour styliser le lien actif
  const linkClass = (path) => 
    `text-sm font-medium transition-colors ${
      location.pathname === path 
      ? "text-indigo-600 font-bold" 
      : "text-gray-600 hover:text-indigo-600"
    }`;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2 group" onClick={() => setIsMobileMenuOpen(false)}>
          <img
            src="/images/logo-babouche-marrakech.png" 
            alt="Babouche Marrakech"
            className="h-10 w-auto object-contain group-hover:scale-105 transition-transform"
          />
          <span className="text-xl font-bold tracking-tight text-gray-900 hidden sm:block">
            Babouche<span className="text-indigo-600">Marrakech</span>
          </span>
        </Link>

        {/* --- NAVIGATION CENTRALE (Visible sur PC) --- */}
        <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className={linkClass('/')}>Accueil</Link>
            <Link to="/a-propos" className={linkClass('/a-propos')}>Notre Histoire</Link>
            <Link to="/guide-des-tailles" className={linkClass('/guide-des-tailles')}>Guide des Tailles</Link>
        </nav>

        {/* ACTIONS DROITE */}
        <div className="flex items-center gap-4">
            {/* Bouton Panier */}
            <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 hover:bg-gray-100 rounded-full transition-colors group"
            >
                <ShoppingBag size={24} className="text-gray-700 group-hover:text-indigo-600 transition-colors" />
                {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full animate-bounce">
                    {cartCount}
                </span>
                )}
            </button>
            
            {/* Menu Mobile */}
            <button 
              className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
               <Menu size={24} />
            </button>
        </div>
      </div>

      {/* --- NAVIGATION MOBILE (Menu déroulant) --- */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg border-b border-gray-100 py-4 px-6 flex flex-col gap-4 animate-in slide-in-from-top-2">
          <Link 
            to="/" 
            className={`block py-2 border-b border-gray-50 ${location.pathname === '/' ? 'text-indigo-600 font-bold' : 'text-gray-700'}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Accueil
          </Link>
          <Link 
            to="/a-propos" 
            className={`block py-2 border-b border-gray-50 ${location.pathname === '/a-propos' ? 'text-indigo-600 font-bold' : 'text-gray-700'}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Notre Histoire
          </Link>
          <Link 
            to="/guide-des-tailles" 
            className={`block py-2 border-b border-gray-50 ${location.pathname === '/guide-des-tailles' ? 'text-indigo-600 font-bold' : 'text-gray-700'}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Guide des Tailles
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;