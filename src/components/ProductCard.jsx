import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, MoveHorizontal } from 'lucide-react';

const ProductCard = ({ product, lang, t, isSlider = false, compact = false }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const displayItems = product.colors && product.colors.length > 0
    ? product.colors.map(c => ({ id: c.id, name: c.name[lang], image: c.images[0] }))
    : [{ id: 'default', name: '', image: (product.gallery && product.gallery[0]) || product.image }];

  const slug = product.slug || `product-${product.id}`;
  const linkPath = `/produit/${slug}`;

  const nextImage = (e) => { e?.preventDefault(); e?.stopPropagation(); setCurrentIndex((prev) => (prev + 1) % displayItems.length); };
  const prevImage = (e) => { e?.preventDefault(); e?.stopPropagation(); setCurrentIndex((prev) => (prev - 1 + displayItems.length) % displayItems.length); };
  const goToImage = (e, idx) => { e?.preventDefault(); e?.stopPropagation(); setCurrentIndex(idx); };

  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) nextImage();
    if (isRightSwipe) prevImage();
  };

  // Déterminer combien de points afficher
  const featuresLimit = compact ? 1 : (isMobile ? 2 : 3);
  const hasMultiple = displayItems.length > 1 && !isSlider;

  return (
    <Link to={linkPath} className="product-card group flex flex-col bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-md transition-all h-full min-w-[260px]">
      <div 
        className="product-image relative w-full aspect-[4/3] bg-gray-100 overflow-hidden flex-shrink-0"
        onTouchStart={hasMultiple ? onTouchStart : undefined}
        onTouchMove={hasMultiple ? onTouchMove : undefined}
        onTouchEnd={hasMultiple ? onTouchEnd : undefined}
      >
        <img src={displayItems[currentIndex].image} alt={product.title[lang]} loading="lazy" className="w-full h-full object-cover transition-transform duration-500" />

        {product.oldPrice && (
          <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full z-10">Promo</span>
        )}

        {product.freeShipping && (
          <span className="absolute top-2 right-2 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded-full z-10">Livraison dans tout le Sénégal</span>
        )}

        {hasMultiple && (
          <div className="absolute top-2 left-2 right-2 flex justify-between items-start z-10 pointer-events-none">
            <div className={`bg-black/50 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1.5 ${product.oldPrice ? 'ml-auto' : 'mx-auto'}`}>
              <MoveHorizontal size={14} />
              <span>Plusieurs couleurs</span>
            </div>
          </div>
        )}

        {hasMultiple && (
          <>
            <button onClick={prevImage} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 p-1.5 rounded-full shadow-md hover:bg-white md:opacity-0 group-hover:opacity-100 opacity-100 transition-all z-20">
              <ChevronLeft size={24} className="text-gray-800" />
            </button>
            <button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 p-1.5 rounded-full shadow-md hover:bg-white md:opacity-0 group-hover:opacity-100 opacity-100 transition-all z-20">
              <ChevronRight size={24} className="text-gray-800" />
            </button>
            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2 md:opacity-0 group-hover:opacity-100 opacity-100 transition-opacity z-20">
              {displayItems.map((_, idx) => (
                <button 
                  key={idx} 
                  onClick={(e) => goToImage(e, idx)}
                  className={`h-2 rounded-full transition-all shadow-sm ${idx === currentIndex ? 'w-6 bg-white' : 'w-2 bg-white/60 hover:bg-white/90'}`} 
                  aria-label={`Aller à l'image ${idx + 1}`}
                />
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

        {hasMultiple && (
          <div className="pt-2">
            {!isMobile && <p className="text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">Couleurs disponibles</p>}
            <div className={`flex flex-wrap gap-1.5 ${isMobile ? 'justify-start' : ''}`}>
              {displayItems.slice(0, 5).map((item, idx) => (
                <button 
                  key={item.id} 
                  onClick={(e) => goToImage(e, idx)}
                  className={`text-xs font-medium px-2.5 py-1.5 rounded-md border transition-all ${
                    currentIndex === idx 
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm' 
                      : 'bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100'
                  }`}
                >
                  {item.name}
                </button>
              ))}
              {displayItems.length > 5 && (
                <button 
                  onClick={(e) => { e.preventDefault(); window.location.href = linkPath; }}
                  className="text-xs font-medium bg-gray-100 text-gray-700 px-2.5 py-1.5 rounded-md hover:bg-gray-200 transition-colors"
                >
                  +{displayItems.length - 5}
                </button>
              )}
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