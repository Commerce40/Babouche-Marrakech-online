# 🚚 GUIDE LIVRAISON - Configuration et Utilisation

## 📦 Qu'est-ce qui a Changé?

Avant, le site avait une seule option de livraison fixe.  
Maintenant, **le client choisit son créneau de livraison** et le prix s'ajoute automatiquement!

---

## 🎯 3 OPTIONS DE LIVRAISON

### 🚀 Livraison Immédiate
- **Créneau**: 2-4 heures après commande
- **Tarif**: 2 500 FCFA
- **Idéal pour**: Clients qui veulent recevoir rapidement

### 🕛 Livraison 12h-13h  
- **Créneau**: 12h à 13h midi
- **Tarif**: 1 500 FCFA
- **Idéal pour**: Clients sur Dakar centre

### 🌙 Livraison 18h-20h
- **Créneau**: 18h à 20h en fin d'après-midi
- **Tarif**: 1 500 FCFA
- **Idéal pour**: Clients disponibles soir

---

## 🔧 ARCHITECTURE TECHNIQUE

### Composants Impliqués

```
DeliveryOptions.jsx (✨ NOUVEAU)
        ↓
    [Radio Buttons]
        ↓
    CartContext.jsx
        ↓
    [selectedDelivery + deliveryPrice]
        ↓
    Cart.jsx
        ↓
    [Affichage total]
        ↓
    CheckoutModal.jsx
        ↓
    [Inclus dans facture WhatsApp]
```

### State Flow

```jsx
// 1. Utilisateur sélectionne livraison dans Cart
<DeliveryOptions 
  selectedDelivery="immediate"  // 'immediate' | 'afternoon' | 'evening'
  onSelect={(id) => setSelectedDelivery(id)}
/>

// 2. CartContext calcule le prix
const deliveryPrice = getDeliveryPrice(selectedDelivery);
// → 2500 | 1500 | 1500

// 3. Total = produits + livraison
const cartTotal = productTotal + deliveryPrice;

// 4. CheckoutModal inclut dans facture
Montant Produits: 12 000 FCFA
+ Livraison: 2 500 FCFA
= TOTAL: 14 500 FCFA
```

---

## 💰 COMMENT CONFIGURER LES TARIFS?

### Étape 1: Ouvrir DeliveryOptions.jsx

**Chemin**: `src/components/DeliveryOptions.jsx`

```jsx
const deliveryOptions = [
  {
    id: 'immediate',
    label: { fr: '🚀 Livraison Immédiate', en: '🚀 Immediate Delivery' },
    description: { fr: 'Livré dans les 2-4h', en: 'Delivered in 2-4h' },
    price: 2500,  // ← ÉTape 2: CHANGER ICI
    icon: '🚀',
  },
  {
    id: 'afternoon',
    label: { fr: '🕛 Livraison 12h-13h', en: '🕛 Delivery 12-1pm' },
    description: { fr: 'Midi à 13h précise', en: 'Noon to 1pm sharp' },
    price: 1500,  // ← CHANGER ICI
    icon: '🕛',
  },
  {
    id: 'evening',
    label: { fr: '🌙 Livraison 18h-20h', en: '🌙 Delivery 6-8pm' },
    description: { fr: 'Soirée (18h-20h)', en: 'Evening (6-8pm)' },
    price: 1500,  // ← CHANGER ICI
    icon: '🌙',
  },
];
```

### Étape 2: Vérifier CartContext.jsx

**Chemin**: `src/contexts/CartContext.jsx`

Cette fonction calcule automatiquement le prix:

```jsx
const getDeliveryPrice = (deliveryId) => {
  const prices = {
    'immediate': 2500,  // ← Doit correspondre à DeliveryOptions
    'afternoon': 1500,
    'evening': 1500,
  };
  return prices[deliveryId] || 0;
};
```

⚠️ **IMPORTANT**: Les prix ici DOIVENT CORRESPONDRE à ceux dans `DeliveryOptions.jsx`

---

## 🌍 SUPPORT MULTILINGUE

Les labels s'affichent en FR ou EN selon la langue du site:

```jsx
label: { 
  fr: '🚀 Livraison Immédiate',  // Français
  en: '🚀 Immediate Delivery'     // Anglais
},
description: {
  fr: 'Livré dans les 2-4h',
  en: 'Delivered in 2-4h'
}
```

Le composant utilise la props `t` pour la traduction.

---

## 🧪 TESTER LOCALEMENT

### Terminal 1: Lancer le serveur
```bash
cd c:\Users\...\Babouche-Marrakech-online
npm run dev
# → http://localhost:5173
```

### Browser: Tester le flow
1. Ouvrir http://localhost:5173
2. Ajouter produit au panier
3. Ouvrir panier (icône shopping bag)
4. **Voir section "Choisir la Livraison"** ← NOUVEAU!
5. Cliquer une option livraison
6. Voir le prix s'ajouter au total
7. Cliquer "Envoyer ma commande"
8. Voir dans facture: "Livraison: +XXXX FCFA"

---

## 📱 UX UTILISATEUR

### Vue Panier (Avant)
```
Produits: 12 000 FCFA
─────────────────────
TOTAL: 12 000 FCFA
[Envoyer]
```

### Vue Panier (Après - NOUVEAU!)
```
Produits: 12 000 FCFA
Livraison: +2 500 FCFA (avec sélecteur!)
─────────────────────
TOTAL: 14 500 FCFA
[Envoyer]
```

---

## 📝 FACTURE WHATSAPP

Quand le client envoie sa commande, il reçoit:

```
════════════════════════
COMMANDE BABOUCHE MARRAKECH
════════════════════════

👤 CLIENT
Nom: Moussa Diop
Tel: 77 123 45 67
Adresse: Sacré-Cœur, Dakar

📝 DÉTAIL DE LA COMMANDE
────────────────────────
• Babouche Marocaine Classique
  Couleur: Beige | Taille: 42
  Quantité: 1 × 12 000 FCFA = 12 000 FCFA

────────────────────────

💰 RÉSUMÉ FINANCIER
Montant Produits: 12 000 FCFA
🚀 Livraison Immédiate: +2 500 FCFA  ← LE CHOIX DU CLIENT
────────────────────────
TOTAL À PAYER: 14 500 FCFA
════════════════════════

✅ CONDITIONS
• Paiement à la réception
• 🚀 Livraison Immédiate (2-4h)  ← AUSSI ICI!
• Support WhatsApp 24/7
```

---

## 🔄 LOGIQUE DE PERSISTANCE

### Où est sauvegardé le choix?

```
Utilisateur sélectionne livraison
        ↓
CartContext.setSelectedDelivery(id)
        ↓
Stocké dans state React
        ↓
Utilisateur clique "Envoyer"
        ↓
CheckoutModal lit selectedDelivery
        ↓
Inclus dans message WhatsApp
        ↓
Client reçoit facture correcte
```

⚠️ Le choix **NE** est pas sauvegardé dans localStorage  
→ Si page rafraîchit, revient à "immediate" (par défaut)

### (Optionnel) Sauvegarder dans localStorage?

Si vous voulez que le choix persiste après rafraîchissement:

```jsx
// Dans CartContext.jsx
useEffect(() => {
  localStorage.setItem('selectedDelivery', selectedDelivery);
}, [selectedDelivery]);

// Au init
const [selectedDelivery, setSelectedDelivery] = useState(
  () => localStorage.getItem('selectedDelivery') || 'immediate'
);
```

---

## 🚨 ERREURS COURANTES

### Erreur 1: Prix ne s'ajoute pas
```
❌ Montant Produits: 12 000
❌ Livraison: 0 FCFA
❌ TOTAL: 12 000 (mauvais!)
```

**Solution**:
1. Vérifier `CartContext.jsx` getDeliveryPrice()
2. Vérifier `DeliveryOptions.jsx` prices
3. Vérifier `Cart.jsx` affiche `deliveryPrice`

### Erreur 2: Radio buttons ne changent pas
```
❌ Cliquer option → rien ne change
```

**Solution**:
1. Vérifier `onSelect={setSelectedDelivery}` dans `Cart.jsx`
2. Vérifier `selectedDelivery` passed depuis CartContext
3. Check browser console (F12) pour erreurs

### Erreur 3: Facture n'inclut pas livraison
```
❌ WhatsApp message oublié "+ Livraison: 2500 FCFA"
```

**Solution**:
1. Vérifier `CheckoutModal.jsx` ligne ~70-80
2. Vérifier `getDeliveryLabel()` function
3. Vérifier `deliveryPrice` props passée

---

## 🎯 BONNES PRATIQUES

### ✅ À FAIRE

1. **Testez après chaque changement de tarif**
   ```bash
   npm run build
   npm run dev
   ```

2. **Vérifiez la facture WhatsApp** avant et après

3. **Gardez les prix en sync**
   - DeliveryOptions.jsx
   - CartContext.jsx
   - Même tarifs partout!

4. **Documentez les changements**
   ```bash
   git commit -m "chore: update delivery prices (immediate: 2500 → 3000)"
   ```

### ❌ À ÉVITER

1. ❌ Changer uniquement dans DeliveryOptions.jsx
   → Puis oublier CartContext.jsx
   → Résultat: bug 🐛

2. ❌ Laisser des prix hardcodés dans d'autres fichiers
   → Toujours centraliser!

3. ❌ Pas tester avant de push
   → Toujours `npm run build` localement

---

## 📊 VARIABLES & CONSTANTES

### État CartContext
```jsx
selectedDelivery: 'immediate' | 'afternoon' | 'evening'
deliveryPrice: number (2500 | 1500 | 1500)
productTotal: number (somme produits)
cartTotal: number (productTotal + deliveryPrice)
```

### Props DeliveryOptions
```jsx
<DeliveryOptions
  selectedDelivery={string}      // ID option sélectionnée
  onSelect={function}             // Callback changement
  t={object}                       // Translations
/>
```

---

## 🚀 DÉPLOYER LES CHANGEMENTS

### Après modification tarifs
```bash
# 1. Test local
npm run dev
# → Tester dans panier

# 2. Build production
npm run build
# → Vérifier pas d'erreurs

# 3. Push vers GitHub
git add .
git commit -m "chore: update delivery prices"
git push origin main

# 4. Vercel déploie automatiquement ✅
# → Accès en ~2 minutes
```

---

## 📞 SUPPORT

### Questions Courantes

**Q: Puis-je ajouter une 4ème option?**  
A: Oui! Ajouter dans `DeliveryOptions.jsx` ET `CartContext.jsx`

**Q: Comment changer les labels (ex: "Samedi matin")?**  
A: Modifier `label` et `description` dans `DeliveryOptions.jsx`

**Q: Puis-je avoir des prix différents par zone?**  
A: Pas pour l'instant. À ajouter: `selectedZone` + tarifs zone-spécifiques

**Q: Comment tracker les choix de livraison?**  
A: Ajouter dans `usePixel()`: `trackEvent('SelectDelivery', {option: selectedDelivery})`

---

## ✅ CHECKLIST

Avant de montée en production:

- [ ] Tarifs corrects dans DeliveryOptions.jsx
- [ ] Tarifs IDENTIQUES dans CartContext.jsx
- [ ] `npm run build` sans erreurs
- [ ] Testé panier + livraison localement
- [ ] Vérifiez facture WhatsApp complète
- [ ] Pushed vers GitHub
- [ ] Vercel déployé (check https://...)

---

**Version**: 1.0  
**Dernière mise à jour**: 9 janvier 2026  
**Status**: ✅ Production Ready

🚀 **Happy shipping!**
