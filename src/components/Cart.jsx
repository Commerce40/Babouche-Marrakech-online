import React, { useState } from 'react'; // Ajout de useState
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { usePixel } from '../hooks/usePixel';
import CheckoutModal from './CheckoutModal'; // Import du modal
import { DeliveryOptions } from './DeliveryOptions'; // Import nouveau composant

const Cart = ({ lang, t }) => {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    removeFromCart, 
    updateQty, 
    cartTotal,
    productTotal,
    deliveryPrice,
    selectedDelivery,
    setSelectedDelivery,
  } = useCart();
  const { trackEvent } = usePixel();
  
  // État pour gérer l'ouverture du Modal Formulaire
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  const handleInitiateCheckout = () => {
    // On track juste le clic, mais on n'ouvre pas encore WhatsApp
    trackEvent('InitiateCheckout', {
      value: cartTotal,
      currency: 'XOF',
      num_items: cart.length
    });
    
    // On ferme le panier et on ouvre le modal de formulaire
    setIsCartOpen(false); 
    setIsCheckoutModalOpen(true);
  };

  return (
    <>
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/50 z-[60]"
            />
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[70] flex flex-col overflow-hidden"
            >
              <div className="p-4 border-b flex items-center justify-between bg-gray-50">
                <h2 className="text-lg font-bold">{t.cartTitle}</h2>
                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-gray-200 rounded-full">
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {cart.length === 0 ? (
                  <div className="text-center text-gray-500 mt-20">{t.emptyCart}</div>
                ) : (
                  <>
                    {cart.map((item, index) => (
                      <div key={index} className="flex gap-4 border-b pb-4">
                        <img src={item.images?.[0] || item.image} alt="" className="w-20 h-20 object-cover rounded-md bg-gray-100" />
                        <div className="flex-1">
                          <h3 className="font-semibold text-sm">{item.title[lang] || item.title}</h3>
                          <p className="text-sm text-gray-500">Taille: {item.size} | {item.color}</p>
                          <p className="font-bold text-indigo-600 mt-1">{item.price.toLocaleString('fr-FR')} FCFA</p>
                          
                          <div className="flex items-center gap-3 mt-2">
                            <div className="flex items-center border rounded-lg">
                              <button onClick={() => updateQty(index, item.qty - 1)} className="p-1 hover:bg-gray-100"><Minus size={14} /></button>
                              <span className="px-2 text-sm">{item.qty}</span>
                              <button onClick={() => updateQty(index, item.qty + 1)} className="p-1 hover:bg-gray-100"><Plus size={14} /></button>
                            </div>
                            <button onClick={() => removeFromCart(index)} className="text-red-500 p-1">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Composant Sélection Livraison */}
                    <div className="pt-4">
                      <DeliveryOptions 
                        selectedDelivery={selectedDelivery}
                        onSelect={setSelectedDelivery}
                        t={t}
                      />
                    </div>
                  </>
                )}
              </div>

              <div className="p-4 border-t bg-gray-50 space-y-3">
                {cart.length > 0 && (
                  <>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Produits:</span>
                      <span>{productTotal.toLocaleString('fr-FR')} FCFA</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Livraison:</span>
                      <span className="font-semibold text-indigo-600">+{deliveryPrice.toLocaleString('fr-FR')} FCFA</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold py-3 border-t border-gray-300">
                      <span>Total:</span>
                      <span className="text-indigo-600">{cartTotal.toLocaleString('fr-FR')} FCFA</span>
                    </div>
                  </>
                )}
                
                <button 
                  onClick={handleInitiateCheckout}
                  disabled={cart.length === 0}
                  className="w-full bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {t.checkout}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Le Modal de Formulaire est ici, en dehors du slide-over */}
      <CheckoutModal 
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        cart={cart}
        total={cartTotal}
        lang={lang}
      />
    </>
  );
};

export default Cart;