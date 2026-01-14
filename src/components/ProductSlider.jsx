import React from 'react';
import ProductCard from './ProductCard';
import './ProductSlider.css';

const ProductSlider = ({ products, lang, t, title, compact = false }) => {
  return (
    <div className="product-slider-section">
      {title && <h2 className="product-slider-title">{title}</h2>}
      
      <div className="product-slider-container">
        <div className="product-slider">
          {products.map(product => (
            <div key={product.id} className="product-slider-item">
              <ProductCard product={product} lang={lang} t={t} isSlider={true} compact={compact} />
            </div>
          ))}
        </div>
        
        {/* Indicateur visuel de swipe (gradient à droite) */}
        <div className="slider-gradient-indicator"></div>
      </div>
    </div>
  );
};

export default ProductSlider;
