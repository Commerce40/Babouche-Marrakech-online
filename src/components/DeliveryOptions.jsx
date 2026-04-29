import React from 'react';
import { Truck, Clock } from 'lucide-react';

/**
 * DeliveryOptions - Composant de sélection des options de livraison
 * Affiche 3 options avec prix et délai
 */
export const DeliveryOptions = ({ selectedDelivery, onSelect, t = {} }) => {
  const deliveryOptions = [
    {
      id: 'immediate',
      label: { fr: '🚀 Livraison Immédiate', en: '🚀 Immediate Delivery' },
      description: { fr: 'Livré dans les 2-4h', en: 'Delivered in 2-4h' },
      price: 2500,
      icon: '🚀',
    },
    {
      id: 'afternoon',
      label: { fr: '🕛 Livraison 12h-13h', en: '🕛 Delivery 12-1pm' },
      description: { fr: 'Midi à 13h précise', en: 'Noon to 1pm sharp' },
      price: 1500,
      icon: '🕛',
    },
    {
      id: 'evening',
      label: { fr: '🌙 Livraison 18h-20h', en: '🌙 Delivery 6-8pm' },
      description: { fr: 'Soirée (18h-20h)', en: 'Evening (6-8pm)' },
      price: 1500,
      icon: '🌙',
    },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <Truck className="w-5 h-5 text-indigo-600" />
        Choisir la Livraison
      </h3>
      
      <div className="space-y-3">
        {deliveryOptions.map(option => (
          <label
            key={option.id}
            className={`flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all ${
              selectedDelivery === option.id
                ? 'border-indigo-600 bg-indigo-50'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <input
              type="radio"
              name="delivery"
              value={option.id}
              checked={selectedDelivery === option.id}
              onChange={(e) => onSelect(e.target.value)}
              className="mt-1 cursor-pointer"
            />
            
            <div className="ml-4 flex-grow">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-gray-900">
                    {option.label.fr}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {option.description.fr}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg text-indigo-600">
                    +{option.price.toLocaleString('fr-FR')} FCFA
                  </p>
                </div>
              </div>
            </div>
          </label>
        ))}
      </div>

      <p className="text-xs text-gray-500 mt-4 pt-4 border-t">
        💡 Les frais de livraison sont ajoutés au montant total et payables à la réception.
      </p>
    </div>
  );
};

export default DeliveryOptions;
