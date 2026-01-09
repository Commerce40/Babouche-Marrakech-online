import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { usePixel } from '../hooks/usePixel';

const ProductCard = ({ product, lang, t, isSlider = false }) => {
  const { addToCart } = useCart();
  const { trackEvent } = usePixel();
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  
  // Utiliser l'image principale ou gallery
  const images = product.gallery || [product.image];

  const handleQuickAdd = (e) => {
    e.preventDefault();
    trackEvent('AddToCart', {
      content_ids: [product.sku],
      content_name: product.title[lang],
      value: product.price,
      currency: 'XOF'
    });
    addToCart(product, 1, '42', 'Standard'); 
  };

  const nextImage = (e) => {
    e.preventDefault();
    setCurrentImgIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.preventDefault();
    setCurrentImgIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Générer le slug pour la navigation
  const slug = product.slug || `product-${product.id}`;
  const linkPath = `/produit/${slug}`;

  return (
    <Link to={linkPath} className="group flex flex-col bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-md transition-all h-full">
      <div className="relative w-full aspect-square bg-gray-100 overflow-hidden flex-shrink-0">
        {/* Image avec lazy loading */}
        <img 
          src={images[currentImgIndex]} 
          alt={product.title[lang]} 
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500"
        />
        
        {/* Badge Promo */}
        {product.specialOffer && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
            Promo
          </span>
        )}

        {/* Flèches de navigation (Masquées sur mobile en mode slider) */}
        {images.length > 1 && !isSlider && (
          <>
            <button 
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-1 rounded-full shadow hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-1 rounded-full shadow hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronRight size={20} />
            </button>
            
            {/* Indicateurs (petits points en bas) */}
            <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              {images.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`h-1.5 rounded-full transition-all ${idx === currentImgIndex ? 'w-3 bg-white' : 'w-1.5 bg-white/50'}`} 
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="p-3 sm:p-4 flex flex-col flex-grow">
        <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-2 line-clamp-2">{product.title[lang]}</h3>
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span className="text-indigo-600 font-bold text-sm sm:text-base">{product.price.toLocaleString()} FCFA</span>
          {product.oldPrice && (
            <span className="text-gray-400 line-through text-xs sm:text-sm">{product.oldPrice.toLocaleString()} FCFA</span>
          )}
        </div>

        {/* Couleurs disponibles */}
        {product.colors && product.colors.length > 0 && (
          <div className="mb-3">
            <p className="text-xs text-gray-600 mb-2">Couleurs disponibles:</p>
            <div className="flex flex-wrap gap-2">
              {product.colors.slice(0, 3).map((color) => (
                <span
                  key={color.id}
                  className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-md"
                >
                  {color.name[lang]}
                </span>
              ))}
              {product.colors.length > 3 && (
                <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-md">
                  +{product.colors.length - 3}
                </span>
              )}
            </div>
          </div>
        )}

        <button 
          onClick={handleQuickAdd}
          className="w-full bg-gray-900 text-white py-2 sm:py-2.5 px-3 rounded-lg font-medium text-sm sm:text-base hover:bg-gray-800 transition-colors mt-auto"
        >
          {t.addToCart}
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;