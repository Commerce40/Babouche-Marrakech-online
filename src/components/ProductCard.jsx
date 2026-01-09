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

      <div className="p-3 sm:p-5 flex flex-col flex-grow gap-2 sm:gap-3">
        {/* Titre - visible sur mobile et desktop */}
        <h3 className="text-sm sm:text-lg font-bold text-gray-900 leading-tight line-clamp-2">
          {product.title[lang]}
        </h3>
        
        {/* Prix avec badge promo - visible sur mobile et desktop */}
        <div className="flex items-center gap-2">
          <span className="text-lg sm:text-2xl font-bold text-indigo-600">
            {product.price.toLocaleString('fr-FR')} FCFA
          </span>
          {product.oldPrice && (
            <span className="text-gray-400 line-through text-xs sm:text-sm">
              {product.oldPrice.toLocaleString('fr-FR')} FCFA
            </span>
          )}
        </div>

        {/* Points forts si disponibles - affichage responsif */}
        {product.pointsForts && product.pointsForts.length > 0 && (
          <div className={`${isSlider ? 'pt-1 sm:pt-2 border-t border-gray-200' : 'pt-2 border-t border-gray-200'}`}>
            <ul className="space-y-0.5 sm:space-y-1">
              {product.pointsForts.slice(0, isSlider ? 2 : 3).map((point, idx) => (
                <li key={idx} className={`${isSlider ? 'text-xs' : 'text-xs sm:text-sm'} text-green-700 flex items-center gap-1 line-clamp-1`}>
                  <span className="text-green-600 font-bold flex-shrink-0">✓</span>
                  <span className="line-clamp-1">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Couleurs disponibles - masquées sur mobile en mode slider */}
        {!isSlider && product.colors && product.colors.length > 0 && (
          <div className="pt-2 hidden sm:block">
            <p className="text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
              {product.colors.length} couleurs
            </p>
            <div className="flex flex-wrap gap-1.5">
              {product.colors.slice(0, 4).map((color) => (
                <span
                  key={color.id}
                  className="text-xs font-medium bg-indigo-50 text-indigo-700 px-2.5 py-1.5 rounded-md border border-indigo-200"
                >
                  {color.name[lang]}
                </span>
              ))}
              {product.colors.length > 4 && (
                <span className="text-xs font-medium bg-gray-100 text-gray-700 px-2.5 py-1.5 rounded-md">
                  +{product.colors.length - 4}
                </span>
              )}
            </div>
          </div>
        )}

        {/* CTA - Orientation conversion avec texte adapté au contexte */}
        <button 
          onClick={(e) => {
            if (isSlider) {
              e.preventDefault();
              window.location.href = linkPath;
            } else {
              handleQuickAdd(e);
            }
          }}
          className={`w-full font-semibold text-base transition-all duration-200 transform hover:scale-[1.02] shadow-md hover:shadow-lg rounded-lg mt-auto ${
            isSlider
              ? 'bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white py-2.5 px-3 sm:py-3 sm:px-4 text-sm sm:text-base'
              : 'bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white py-3 px-4'
          }`}
        >
          {isSlider ? 'Voir la babouche' : t.addToCart}
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;