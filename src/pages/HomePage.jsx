import React from 'react';
import { motion } from 'framer-motion';
import { BABOUCHES, BONUS_PRODUCTS } from '../data/products';
import ProductSlider from '../components/ProductSlider';
import { Hero } from '../components/Hero';

const HomePage = ({ lang, t }) => {
  return (
    <div>
      {/* Hero component */}
      <Hero t={t} />

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