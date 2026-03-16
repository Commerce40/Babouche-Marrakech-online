import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PRODUCTS } from '../data/products';
import { useCart } from '../contexts/CartContext';
import { usePixel } from '../hooks/usePixel';
import SimilarProducts from '../components/SimilarProducts';

const ProductDetailPage = ({ lang, t }) => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const product = PRODUCTS.find(p => p.slug === slug);
  
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [mainImage, setMainImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [showAddedMessage, setShowAddedMessage] = useState(false);
  
  const { addToCart } = useCart();
  const { trackEvent } = usePixel();

  useEffect(() => {
    if (product) {
      const initialColor = product.colors?.[0];
      setSelectedColor(initialColor);
      setSelectedSize(initialColor?.sizes?.[0]);
      setMainImage(initialColor?.images?.[0] || product.image);
      window.scrollTo(0, 0);

      trackEvent('ViewContent', {
        content_ids: [product.sku],
        content_name: product.title[lang],
        value: product.price,
        currency: 'XOF'
      });
    }
  }, [product, slug, lang]);

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Produit non trouvé</h1>
        <button
          onClick={() => navigate('/collection')}
          className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg"
        >
          Retour à la Collection
        </button>
      </div>
    );
  }

  const handleColorChange = (color) => {
    setSelectedColor(color);
    setMainImage(color.images[0]);
    setSelectedSize(color.sizes[0]);
  };

  const handleAddToCart = () => {
    const cartItem = {
      ...product,
      selectedColor: selectedColor.id,
      selectedSize: selectedSize,
      quantity: quantity,
    };
    
    addToCart(cartItem, quantity, selectedSize, selectedColor.id);
    trackEvent('AddToCart', {
      content_ids: [product.sku],
      value: product.price,
      currency: 'XOF'
    });

    setShowAddedMessage(true);
    setTimeout(() => setShowAddedMessage(false), 3000);
  };

  const handleWhatsAppContact = () => {
    const message = encodeURIComponent(
      `Bonjour! Je suis intéressé par le produit: ${product.title[lang]}. Je cherche une couleur ou modèle spécifique qui n'est pas disponible sur le site. Pouvez-vous m'aider?`
    );
    window.open(`https://wa.me/221761421653?text=${message}`, '_blank');
  };

  const isShoesProduct = product.type === 'shoes';
  const sizeLabel = isShoesProduct ? 'Pointure (EU)' : 'Taille';
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-sm text-gray-600">
          <button onClick={() => navigate('/')} className="hover:text-indigo-600">Accueil</button>
          <span>/</span>
          <button onClick={() => navigate('/collection')} className="hover:text-indigo-600">Collection</button>
          <span>/</span>
          <span className="text-gray-900 font-medium">{product.title[lang]}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Galerie d'images */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white rounded-xl overflow-hidden shadow-lg mb-6">
              <div className="aspect-square bg-gray-100 flex items-center justify-center">
                <motion.img
                  key={mainImage}
                  src={mainImage}
                  alt={product.title[lang]}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="w-full h-full object-contain p-4"
                />
              </div>
            </div>

            {/* Thumbnails */}
            {selectedColor?.images && selectedColor.images.length > 1 && (
              <div className="flex gap-4 mb-6 overflow-x-auto pb-2">
                {selectedColor.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setMainImage(img)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      mainImage === img ? 'border-indigo-600' : 'border-gray-300'
                    }`}
                  >
                    <img src={img} alt={`Vue ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Informations produit */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Titre et prix */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{product.title[lang]}</h1>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-3xl font-bold text-indigo-600">
                  {product.price.toLocaleString()} FCFA
                </span>
                {product.oldPrice && (
                  <span className="text-xl text-gray-400 line-through">
                    {product.oldPrice.toLocaleString()} FCFA
                  </span>
                )}
              </div>
              {product.specialOffer && (
                <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold">
                  {product.specialOffer}
                </span>
              )}
            </div>

            {/* Sélection couleur */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Couleur</h3>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.id}
                      onClick={() => handleColorChange(color)}
                      className={`px-4 py-2 rounded-lg border-2 transition-all font-medium ${
                        selectedColor?.id === color.id
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-900'
                          : 'border-gray-300 text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      {color.name[lang]}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sélection taille */}
            {selectedColor?.sizes && (
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{sizeLabel}</h3>
                  {isShoesProduct && (
                    <a href="/guide-des-tailles" className="text-sm text-indigo-600 font-semibold hover:underline">
                      Guide des tailles
                    </a>
                  )}
                </div>
                <div className={`grid gap-2 ${isShoesProduct ? 'grid-cols-4 sm:grid-cols-6' : 'grid-cols-3 sm:grid-cols-5'}`}>
                  {selectedColor.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2 rounded-lg border-2 transition-all font-medium text-center ${
                        selectedSize === size
                          ? 'border-indigo-600 bg-indigo-600 text-white'
                          : 'border-gray-300 text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantité */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quantité</h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100 font-bold text-xl"
                >
                  −
                </button>
                <span className="w-12 text-center text-lg font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100 font-bold text-xl"
                >
                  +
                </button>
              </div>
            </div>

            {/* Boutons d'action */}
            <div className="space-y-3 mb-8">
              <button
                onClick={handleAddToCart}
                className="w-full px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                Ajouter au panier
              </button>
              <button
                onClick={handleWhatsAppContact}
                className="w-full px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-bold text-lg rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371 0-.57 0-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.255.949c-1.238.503-2.335 1.236-3.22 2.121-.885.885-1.618 1.982-2.121 3.22a9.868 9.868 0 00-.949 4.255c0 1.594.287 3.131.849 4.594l-1.296 4.74 4.857-1.273c1.432.537 2.921.817 4.486.817h.005c5.424 0 9.835-4.41 9.835-9.835 0-2.632-.636-5.114-1.77-7.303a9.902 9.902 0 00-2.663-3.06 9.888 9.888 0 00-3.81-1.67 10.005 10.005 0 00-4.017-.819M8.5 0C3.813 0 0 3.813 0 8.5 0 13.187 3.813 17 8.5 17c1.136 0 2.211-.244 3.2-.682l3.72.973-.975-3.559A8.48 8.48 0 0117 8.5C17 3.813 13.187 0 8.5 0"/>
                </svg>
                Contacter sur WhatsApp
              </button>
            </div>

            {/* Message d'ajout */}
            {showAddedMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-4"
              >
                ✓ Produit ajouté au panier!
              </motion.div>
            )}

            {/* Points forts */}
            {product.pointsForts && (
              <div className="mb-8 bg-indigo-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Caractéristiques</h3>
                <ul className="space-y-2">
                  {product.pointsForts.map((point, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-gray-700">
                      <span className="text-indigo-600 text-xl">✓</span> {point}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Description */}
            <div className="mb-8 pb-8 border-b">
              <p className="text-gray-700 leading-relaxed">{product.description[lang]}</p>
            </div>

            {/* Infos supplémentaires */}
            {product.shippingInfo && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800 flex items-start gap-2">
                  <span className="text-xl">ℹ️</span>
                  <span>{product.shippingInfo}</span>
                </p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Section produits similaires */}
        <div className="mt-20 pt-12 border-t">
          <SimilarProducts currentProductId={product.id} lang={lang} t={t} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;