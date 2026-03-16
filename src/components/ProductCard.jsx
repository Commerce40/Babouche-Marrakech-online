import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ProductCard = ({ product, lang, t, isSlider = false, compact = false }) => {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const images = product.gallery || [product.image];
  const slug = product.slug || `product-${product.id}`;
  const linkPath = `/produit/${slug}`;

  const nextImage = (e) => { e?.preventDefault(); setCurrentImgIndex((prev) => (prev + 1) % images.length); };
  const prevImage = (e) => { e?.preventDefault(); setCurrentImgIndex((prev) => (prev - 1 + images.length) % images.length); };

  // Déterminer combien de points afficher
  const featuresLimit = compact ? 1 : (isMobile ? 2 : 3);

  return (
    <Link to={linkPath} className="product-card group flex flex-col bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-md transition-all h-full min-w-[260px]">
      <div className="product-image relative w-full aspect-[4/3] bg-gray-100 overflow-hidden flex-shrink-0">
        <img src={images[currentImgIndex]} alt={product.title[lang]} loading="lazy" className="w-full h-full object-cover transition-transform duration-500" />

        {product.oldPrice && (
          <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full z-10">Promo</span>
        )}

        {product.freeShipping && (
          <span className="absolute top-2 right-2 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded-full z-10">Livraison gratuite Dakar</span>
        )}

        {images.length > 1 && !isSlider && (
          <>
            <button onClick={prevImage} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-1 rounded-full shadow hover:bg-white md:opacity-0 group-hover:opacity-100 opacity-100 transition-opacity">
              <ChevronLeft size={20} />
            </button>
            <button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-1 rounded-full shadow hover:bg-white md:opacity-0 group-hover:opacity-100 opacity-100 transition-opacity">
              <ChevronRight size={20} />
            </button>
            <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1 md:opacity-0 group-hover:opacity-100 opacity-100 transition-opacity">
              {images.map((_, idx) => (
                <div key={idx} className={`h-1.5 rounded-full transition-all bg-black bg-opacity-30 ${idx === currentImgIndex ? 'w-3 bg-white border border-black border-opacity-20' : 'w-1.5 bg-white/70'}`} />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="product-content p-3 sm:p-5 flex flex-col flex-grow gap-2 sm:gap-3">
        <h3 className="text-sm sm:text-lg font-bold text-gray-900 leading-tight line-clamp-2">{product.title[lang]}</h3>

        <div className="price flex items-center gap-2">
          <span className="current text-lg sm:text-2xl font-bold text-indigo-600">{product.price.toLocaleString('fr-FR')} FCFA</span>
          {product.oldPrice && <span className="old text-gray-400 line-through text-xs sm:text-sm">{product.oldPrice.toLocaleString('fr-FR')} FCFA</span>}
        </div>

        {product.pointsForts && product.pointsForts.length > 0 && (
          <div className={`${isMobile ? 'pt-1 sm:pt-2 border-t border-gray-200' : 'pt-2 border-t border-gray-200'}`}>
            <ul className="features space-y-0.5 sm:space-y-1">
              {product.pointsForts.slice(0, featuresLimit).map((point, idx) => (
                <li key={idx} className={`${isMobile ? 'text-xs' : 'text-xs sm:text-sm'} text-green-700 flex items-center gap-1 line-clamp-1`}>
                  <span className="text-green-600 font-bold flex-shrink-0">✓</span>
                  <span className="line-clamp-1">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {!isMobile && product.colors && product.colors.length > 0 && (
          <div className="pt-2 hidden sm:block">
            <p className="text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">{product.colors.length} couleurs</p>
            <div className="flex flex-wrap gap-1.5">
              {product.colors.slice(0, 4).map((color) => (
                <span key={color.id} className="text-xs font-medium bg-indigo-50 text-indigo-700 px-2.5 py-1.5 rounded-md border border-indigo-200">{color.name[lang]}</span>
              ))}
              {product.colors.length > 4 && <span className="text-xs font-medium bg-gray-100 text-gray-700 px-2.5 py-1.5 rounded-md">+{product.colors.length - 4}</span>}
            </div>
          </div>
        )}

        <button
          onClick={(e) => { e.preventDefault(); window.location.href = linkPath; }}
          className={`w-full font-bold text-base transition-all duration-200 shadow-md hover:shadow-lg rounded-lg mt-auto bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4`}
        >
          {product.category === 'jellabas' ? 'Voir les Djellabas' : 'Voir la babouche'}
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;