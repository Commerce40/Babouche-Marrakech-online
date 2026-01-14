import React from 'react';
import ProductSlider from '../components/ProductSlider';
import { BABOUCHES } from '../data/products';

const CollectionPage = ({ lang, t }) => {
  return (
    <div className="w-full px-4 py-16">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">{t.collectionTitle || 'Collection'}</h1>
        <ProductSlider products={BABOUCHES} lang={lang} t={t} title={null} />
      </div>
    </div>
  );
};

export default CollectionPage;
