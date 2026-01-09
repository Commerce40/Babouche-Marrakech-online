import React, { useState } from 'react';
import { X, Send, MapPin, User, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../contexts/CartContext';

const CheckoutModal = ({ isOpen, onClose, cart, total, lang }) => {
  const { selectedDelivery, deliveryPrice, productTotal } = useCart();
  
  const [formData, setFormData] = useState({
    nom: '',
    telephone: '',
    adresse: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Texte livraison
  const getDeliveryLabel = () => {
    const labels = {
      'immediate': '🚀 Livraison Immédiate (2-4h)',
      'afternoon': '🕛 Livraison 12h-13h',
      'evening': '🌙 Livraison 18h-20h',
    };
    return labels[selectedDelivery] || 'Livraison';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validation basique
      if (!formData.nom.trim() || !formData.telephone.trim() || !formData.adresse.trim()) {
        alert('Veuillez remplir tous les champs.');
        setIsSubmitting(false);
        return;
      }

      // --- FACTURE PROFESSIONNEL ---
      const phoneNumber = "221761421653";
      let message = `*════════════════════════*\n`;
      message += `*COMMANDE BABOUCHE MARRAKECH* 🛍️\n`;
      message += `*════════════════════════*\n\n`;
      
      // === INFOS CLIENT ===
      message += `👤 *CLIENT*\n`;
      message += `Nom: ${formData.nom}\n`;
      message += `Tel: ${formData.telephone}\n`;
      message += `Adresse: ${formData.adresse}\n\n`;
      
      // === DÉTAIL COMMANDE ===
      message += `📝 *DÉTAIL DE LA COMMANDE*\n`;
      message += `────────────────────────\n`;
      
      cart.forEach(item => {
        const title = (typeof item.title === 'object' ? item.title[lang] : item.title) || 'Produit';
        const itemTotal = item.price * item.qty;
        message += `\n• ${title}\n`;
        message += `  Couleur: ${item.color} | Taille: ${item.size}\n`;
        message += `  Quantité: ${item.qty} × ${item.price.toLocaleString('fr-FR')} FCFA\n`;
        message += `  = ${itemTotal.toLocaleString('fr-FR')} FCFA\n`;
      });

      message += `\n────────────────────────\n`;
      
      // === TOTAUX ===
      message += `\n💰 *RÉSUMÉ FINANCIER*\n`;
      message += `Montant Produits: ${productTotal.toLocaleString('fr-FR')} FCFA\n`;
      message += `${getDeliveryLabel()}: +${deliveryPrice.toLocaleString('fr-FR')} FCFA\n`;
      message += `────────────────────────\n`;
      message += `*TOTAL À PAYER: ${total.toLocaleString('fr-FR')} FCFA*\n`;
      message += `════════════════════════\n\n`;
      
      // === CONDITIONS ===
      message += `✅ *CONDITIONS*\n`;
      message += `• Paiement à la réception\n`;
      message += `• ${getDeliveryLabel()}\n`;
      message += `• Support WhatsApp 24/7\n\n`;
      
      message += `Merci pour votre confiance! 🙏`;

      // --- OUVERTURE WHATSAPP ---
      const encodedMessage = encodeURIComponent(message);
      window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
      
      // Reset et fermeture
      setFormData({ nom: '', telephone: '', adresse: '' });
      onClose();
      
    } catch (error) {
      console.error('Erreur:', error);
      alert('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
          {/* Fond sombre */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }} 
            animate={{ scale: 1, opacity: 1, y: 0 }} 
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-indigo-600 to-indigo-700 p-5 flex justify-between items-center text-white z-10">
              <div>
                <h3 className="font-bold text-lg">Passer votre commande</h3>
                <p className="text-xs text-indigo-100 mt-1">Finalisez en 2 minutes</p>
              </div>
              <button 
                onClick={onClose} 
                className="hover:bg-indigo-800 p-2 rounded-full transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* Contenu */}
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* Info Box */}
              <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg">
                <p className="text-sm font-medium text-green-900">
                  ✅ Paiement à la réception - Aucune surcharge
                </p>
                <p className="text-xs text-green-700 mt-1">
                  Vous ne payez que lors de la livraison
                </p>
              </div>

              {/* Récap Commande */}
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3 text-sm">Récapitulatif</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-700">
                    <span>{cart.length} article(s)</span>
                    <span className="font-medium">{productTotal.toLocaleString('fr-FR')} FCFA</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>{getDeliveryLabel()}</span>
                    <span className="font-medium text-indigo-600">+{deliveryPrice.toLocaleString('fr-FR')} FCFA</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-bold text-gray-900">
                    <span>Total:</span>
                    <span className="text-indigo-600 text-lg">{total.toLocaleString('fr-FR')} FCFA</span>
                  </div>
                </div>
              </div>

              {/* Champ Nom */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Nom complet *
                </label>
                <div className="relative">
                  <User size={18} className="absolute left-3 top-3 text-gray-400" />
                  <input 
                    required 
                    type="text" 
                    name="nom" 
                    value={formData.nom} 
                    onChange={handleChange}
                    placeholder="Ex: Moussa Diop"
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                  />
                </div>
              </div>

              {/* Champ Téléphone */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Numéro WhatsApp *
                </label>
                <div className="relative">
                  <Phone size={18} className="absolute left-3 top-3 text-gray-400" />
                  <input 
                    required 
                    type="tel" 
                    name="telephone" 
                    value={formData.telephone} 
                    onChange={handleChange}
                    placeholder="Ex: 77 123 45 67"
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Nous vous confirmerons la livraison par SMS</p>
              </div>

              {/* Champ Adresse */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Adresse de livraison *
                </label>
                <div className="relative">
                  <MapPin size={18} className="absolute left-3 top-3 text-gray-400" />
                  <textarea 
                    required 
                    name="adresse" 
                    value={formData.adresse} 
                    onChange={handleChange}
                    placeholder="Quartier, rue, point de repère précis..."
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition h-24 resize-none"
                  />
                </div>
              </div>

              {/* Bouton Submit */}
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3.5 rounded-lg font-bold text-base shadow-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-6"
              >
                <Send size={18} />
                <span>
                  {isSubmitting ? 'Envoi en cours...' : 'Envoyer ma commande'}
                </span>
              </button>

              {/* Disclaimer */}
              <p className="text-xs text-gray-500 text-center pt-2">
                ✅ Vous serez redirigé vers WhatsApp pour valider votre commande
              </p>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CheckoutModal;