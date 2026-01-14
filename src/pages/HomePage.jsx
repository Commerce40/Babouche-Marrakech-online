import React from 'react';
import { motion } from 'framer-motion';
import { BABOUCHES, BONUS_PRODUCTS } from '../data/products';
import ProductSlider from '../components/ProductSlider';

const HomePage = ({ lang, t }) => {
  return (
    <div>
      {/* Hero Banner */}
      <div className="relative h-[60vh] bg-gray-900 overflow-hidden">
        <img 
          src="/images/balghati1.jpg"
          alt="Banner" 
          loading="lazy"
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-6xl font-extrabold text-white mb-4"
          >
            {t.siteTitle}
          </motion.h1>
          <p className="text-gray-200 text-lg md:text-xl max-w-2xl mx-auto">
            {t.footerText}
          </p>
        </div>
      </div>

      {/* Collection Babouches */}
      <div className="w-full px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <ProductSlider 
            products={BABOUCHES} 
            lang={lang} 
            t={t}
            title={t.collectionTitle || "Nos Babouches Royales"}
          />
        </div>
      </div>

      {/* Produits Bonus - Nos Clients Ont Aussi Acheté */}
      {BONUS_PRODUCTS.length > 0 && (
        <div className="w-full px-4 py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <ProductSlider 
              products={BONUS_PRODUCTS} 
              lang={lang} 
              t={t}
              title="Nos clients ont aussi acheté"
              compact={true}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;