import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('bm_cart_static');
    return saved ? JSON.parse(saved) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState('immediate'); // Par défaut: livraison immédiate

  useEffect(() => {
    localStorage.setItem('bm_cart_static', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, qty, size, color) => {
    setCart(prev => {
      const existing = prev.find(item => 
        item.id === product.id && item.size === size && item.color === color
      );
      if (existing) {
        return prev.map(item => 
          (item.id === product.id && item.size === size && item.color === color)
            ? { ...item, qty: item.qty + qty }
            : item
        );
      }
      return [...prev, { ...product, qty, size, color }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (index) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  const updateQty = (index, newQty) => {
    if (newQty < 1) return;
    setCart(prev => prev.map((item, i) => i === index ? { ...item, qty: newQty } : item));
  };

  // Calcul prix produits
  const productTotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);

  // Calcul frais livraison
  const getDeliveryPrice = (deliveryId) => {
    const prices = {
      'immediate': 2500,
      'afternoon': 1500,
      'evening': 1500,
    };
    return prices[deliveryId] || 0;
  };

  const deliveryPrice = getDeliveryPrice(selectedDelivery);

  // Total final (produits + livraison)
  const cartTotal = productTotal + (cart.length > 0 ? deliveryPrice : 0);

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      updateQty, 
      isCartOpen, 
      setIsCartOpen, 
      cartTotal,
      productTotal,
      deliveryPrice,
      selectedDelivery,
      setSelectedDelivery,
      getDeliveryPrice,
    }}>
      {children}
    </CartContext.Provider>
  );
};