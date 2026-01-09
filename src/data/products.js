export const IMAGES = {
  BABOUCHE_CLASSIQUE_BEIGE: '/images/babouche-marocaine-classique-beige.jpeg',
  BABOUCHE_CLASSIQUE_BLANC: '/images/babouche-marocaine-classique-blanc.jpeg',
  BABOUCHE_CLASSIQUE_BLEU_CIEL: '/images/babouche-marocaine-classique-bleu-ciel.png',
  BABOUCHE_CLASSIQUE_BLEU_NUIT: '/images/babouche-marocaine-classique-bleu-nuit.webp',
  BABOUCHE_CLASSIQUE_DETAILS: '/images/babouche-marocaine-classique-détails.jpeg',
  BABOUCHE_CLASSIQUE_GRIS_CLAIR: '/images/babouche-marocaine-classique-gris-clair.jpg',
  BABOUCHE_CLASSIQUE_JAUNE_PORTEE: '/images/babouche-marocaine-classique-jaune-portée.jpeg',
  BABOUCHE_CLASSIQUE_JAUNE: '/images/babouche-marocaine-classique-jaune.jpeg',
  BABOUCHE_CLASSIQUE_ROUGE_BORDEAUX: '/images/babouche-marocaine-classique-rouge-bordeaux.jpeg',
  BABOUCHE_DAIM_BLEU_PRIX: '/images/babouche-marocaine-en-daim-bleu-prix.jpeg',
  BABOUCHE_DAIM_BLEU_SIDE: '/images/babouche-marocaine-en-daim-bleu-side-view.jpeg',
  BABOUCHE_DAIM_BLEU: '/images/Babouche-marocaine-en-daim-bleu.jpeg',
  BABOUCHE_DAIM_NOIR_BRODE: '/images/babouche-marocaine-en-daim-noir-brodé.jpg',
  BABOUCHE_JAUNE_NATUREL_DETAILS: '/images/babouche-marocaine-jaune-naturel-details.jpeg',
  BABOUCHE_JAUNE_NATUREL_PORTEE: '/images/babouche-marocaine-jaune-naturel-portée.jpeg',
  BABOUCHE_JAUNE_NATUREL_TALON: '/images/Babouche-marocaine-jaune-naturel-talon.jpeg',
  BABOUCHE_JAUNE_NATUREL_VU_AUTRE: '/images/babouche-marocaine-jaune-naturel-vu-autre.jpeg',
  BABOUCHE_JAUNE_NATUREL_WEBP: '/images/babouche-marocaine-jaune-naturel-vu-produit.webp',
  BABOUCHE_MERCEDES_BEIGE_SIDE: '/images/babouche-marocaine-mercedes-beige-side.jpeg',
  BABOUCHE_MERCEDES_BEIGE_VU_AUTRE: '/images/babouche-marocaine-mercedes-beige-vu-autre.jpeg',
  BABOUCHE_MERCEDES_BEIGE: '/images/Babouche-marocaine-mercedes-beige.jpeg',
  BABOUCHE_MERCEDES_BLANC_SIDE: '/images/babouche-marocaine-mercedes-blanc-side.jpeg',
  BABOUCHE_MERCEDES_BLANC: '/images/babouche-marocaine-mercedes-blanc.jpeg',
  BABOUCHE_MERCEDES_BLEU_NUIT_PORTEE: '/images/babouche-marocaine-mercedes-bleu-nuit-portée.jpeg',
  BABOUCHE_MERCEDES_BLEU_NUIT_VU_AUTRE: '/images/babouche-marocaine-mercedes-bleu-nuit-vu-autre.jpeg',
  BABOUCHE_MERCEDES_BLEU_NUIT_VU_SIDE: '/images/babouche-marocaine-mercedes-bleu-nuit-vu-side.jpeg',
  BABOUCHE_MERCEDES_BLEU_NUIT_VU: '/images/babouche-marocaine-mercedes-bleu-nuit-vu.jpeg',
  BABOUCHE_MERCEDES_CROCO_ROUGE: '/images/babouche-marocaine-mercedes-croco-rouge-bordeaux.jpeg',
  BABOUCHE_MERCEDES_JAUNE: '/images/babouche-marocaine-mercedes-jaune.png',
  BABOUCHE_MERCEDES_MARRON: '/images/babouche-marocaine-mercedes-marron.jpeg',
  BABOUCHE_MERCEDES_ROUGE_LISSE_SIDE: '/images/babouche-marocaine-mercedes-rouge-bordeaux-lisse-side.webp',
  BABOUCHE_MERCEDES_ROUGE_LISSE_VU: '/images/babouche-marocaine-mercedes-rouge-bordeaux-lisse-vu.jpeg',
  BABOUCHE_MARRAKECH_DAIM_NOIR: '/images/babouche-marrakech-en-daim-noir-brodé.jpg',
  BANNIERE_BABOUCHE: '/images/banniere-babouche-marrakech.jpg',
  DJELLABA_BEIGE: '/images/Djellaba-marocain-beige-motif.jpg',
  DJELLABA_BLEU: '/images/Djellaba-marocain-bleu-motif.jpg',
  DJELLABA_CLAIR: '/images/Djellaba-marocain-clair-motif.jpg',
  DJELLABA_JAUNE: '/images/Djellaba-marocain-jaune-motif.jpg',
  DJELLABA_ROUGE: '/images/Djellaba-marocain-rouge-motif.jpg',
  LOGO_SANS_FOND: '/images/logo-babouche-marrakech-sans-fond.png',
};

// Définition des catégories pour la navigation
// Définition des catégories pour la navigation
export const CATEGORIES = [
  { id: 'babouches', fr: 'Babouches', icon: 'Shoe' },
  { id: 'jellabas', fr: 'Jellabas & Qamis', icon: 'TShirt' },
  { id: 'promos', fr: 'Promotions', icon: 'Sparkles' },
];

// Fonction utilitaire pour générer un slug
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[àâä]/g, 'a')
    .replace(/[éèêë]/g, 'e')
    .replace(/[ïî]/g, 'i')
    .replace(/[ôö]/g, 'o')
    .replace(/[ùûü]/g, 'u')
    .replace(/[ç]/g, 'c')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
};

export const PRODUCTS = [
  // 1. BABOUCHE MAROCAINE CLASSIQUE (Prix: 12 000 FCFA)
  {
    id: 101,
    slug: 'babouche-marocaine-classique',
    title: { 
      fr: "Babouche Marocaine Classique", 
      ar: "بابوش مراكشي كلاسيك", 
      wo: "Babouche Marocaine Classique" 
    },
    price: 12000,
    oldPrice: 15000, 
    category: 'babouches',
    type: 'shoes',
    shippingInfo: "Livraison gratuite sur Dakar",
    specialOffer: "3 paires = 30 000 FCFA",
    pointsForts: ["Cuir véritable", "Fabrication artisanale marocaine", "Confort optimal", "Design intemporel"],
    description: {
      fr: "La babouche classique marocaine authentique. Conçue pour les hommes qui recherchent une chaussure confortable, élégante et pratique au quotidien. Elle offre un excellent maintien du pied tout en restant légère et agréable à porter.",
      ar: "بابوش مراكشي كلاسيكي أصلي للرجال الذين يبحثون عن حذاء مريح وأنيق.",
      wo: "Babouche Marocaine Classique bu rafet ak bu neex, désiné pour l'homme.",
    },
    image: IMAGES.BABOUCHE_CLASSIQUE_BLANC,
    sku: "BM-CLASSIC",
    colors: [
      {
        id: 'beige',
        name: { fr: 'Beige', ar: 'بيج', wo: 'Beige' },
        images: [IMAGES.BABOUCHE_CLASSIQUE_BEIGE],
        sizes: [38, 39, 40, 41, 42, 43, 44, 45, 46],
        inStock: true,
      },
      {
        id: 'blanc',
        name: { fr: 'Blanc', ar: 'أبيض', wo: 'Blanc' },
        images: [IMAGES.BABOUCHE_CLASSIQUE_BLANC],
        sizes: [38, 39, 40, 41, 42, 43, 44, 45, 46],
        inStock: true,
      },
      {
        id: 'bleu-ciel',
        name: { fr: 'Bleu Ciel', ar: 'أزرق سماوي', wo: 'Bleu Ciel' },
        images: [IMAGES.BABOUCHE_CLASSIQUE_BLEU_CIEL],
        sizes: [38, 39, 40, 41, 42, 43, 44, 45, 46],
        inStock: true,
      },
      {
        id: 'bleu-nuit',
        name: { fr: 'Bleu Nuit', ar: 'أزرق داكن', wo: 'Bleu Nuit' },
        images: [IMAGES.BABOUCHE_CLASSIQUE_BLEU_NUIT],
        sizes: [38, 39, 40, 41, 42, 43, 44, 45, 46],
        inStock: true,
      },
      {
        id: 'gris-clair',
        name: { fr: 'Gris Clair', ar: 'رمادي فاتح', wo: 'Gris Clair' },
        images: [IMAGES.BABOUCHE_CLASSIQUE_GRIS_CLAIR],
        sizes: [38, 39, 40, 41, 42, 43, 44, 45, 46],
        inStock: true,
      },
      {
        id: 'jaune',
        name: { fr: 'Jaune', ar: 'أصفر', wo: 'Jaune' },
        images: [IMAGES.BABOUCHE_CLASSIQUE_JAUNE, IMAGES.BABOUCHE_CLASSIQUE_JAUNE_PORTEE],
        sizes: [38, 39, 40, 41, 42, 43, 44, 45, 46],
        inStock: true,
      },
      {
        id: 'rouge-bordeaux',
        name: { fr: 'Rouge Bordeaux', ar: 'أحمر عنابي', wo: 'Rouge Bordeaux' },
        images: [IMAGES.BABOUCHE_CLASSIQUE_ROUGE_BORDEAUX],
        sizes: [38, 39, 40, 41, 42, 43, 44, 45, 46],
        inStock: true,
      },
    ],
  },
  
  // 2. BABOUCHE MAROCAINE MERCEDES (Prix: 18 000 FCFA)
  {
    id: 102,
    slug: 'babouche-marocaine-mercedes',
    title: { 
      fr: "Babouche Marocaine Mercedes", 
      ar: "بابوش مراكشي مرسيدس", 
      wo: "Babouche Marocaine Mercedes" 
    },
    price: 18000,
    oldPrice: 22000,
    category: 'babouches',
    type: 'shoes',
    pointsForts: ["Design premium Mercedes", "Cuir de haute qualité", "Finition déluxe", "Confort exceptionnnel"],
    description: {
      fr: "La babouche marocaine Mercedes, modèle prestige avec ses variantes élégantes. Avec sa conception premium et ses finitions de luxe, elle combine tradition marocaine et sophistication moderne. Conçue pour les hommes exigeants qui recherchent l'excellence.",
      ar: "بابوش مراكشي مرسيدس، نموذج مرموق مع تصاميم أنيقة. بتصميم فاخر وتشطيبات فخمة تجمع بين التقاليد المراكشية والرقي الحديث.",
      wo: "Babouche Marocaine Mercedes bu rafet ak bu neex, désiné pour l'homme bu gëna mat.",
    },
    image: IMAGES.BABOUCHE_MERCEDES_BLANC,
    sku: "BM-MERCEDES",
    colors: [
      {
        id: 'blanc',
        name: { fr: 'Blanc', ar: 'أبيض', wo: 'Blanc' },
        images: [IMAGES.BABOUCHE_MERCEDES_BLANC, IMAGES.BABOUCHE_MERCEDES_BLANC_SIDE],
        sizes: [38, 39, 40, 41, 42, 43, 44, 45, 46],
        inStock: true,
      },
      {
        id: 'beige',
        name: { fr: 'Beige', ar: 'بيج', wo: 'Beige' },
        images: [IMAGES.BABOUCHE_MERCEDES_BEIGE, IMAGES.BABOUCHE_MERCEDES_BEIGE_SIDE, IMAGES.BABOUCHE_MERCEDES_BEIGE_VU_AUTRE],
        sizes: [38, 39, 40, 41, 42, 43, 44, 45, 46],
        inStock: true,
      },
      {
        id: 'bleu-nuit',
        name: { fr: 'Bleu Nuit', ar: 'أزرق داكن', wo: 'Bleu Nuit' },
        images: [IMAGES.BABOUCHE_MERCEDES_BLEU_NUIT_VU, IMAGES.BABOUCHE_MERCEDES_BLEU_NUIT_PORTEE, IMAGES.BABOUCHE_MERCEDES_BLEU_NUIT_VU_AUTRE],
        sizes: [38, 39, 40, 41, 42, 43, 44, 45, 46],
        inStock: true,
      },
      {
        id: 'jaune',
        name: { fr: 'Jaune', ar: 'أصفر', wo: 'Jaune' },
        images: [IMAGES.BABOUCHE_MERCEDES_JAUNE],
        sizes: [38, 39, 40, 41, 42, 43, 44, 45, 46],
        inStock: true,
      },
      {
        id: 'marron',
        name: { fr: 'Marron', ar: 'بني', wo: 'Marron' },
        images: [IMAGES.BABOUCHE_MERCEDES_MARRON],
        sizes: [38, 39, 40, 41, 42, 43, 44, 45, 46],
        inStock: true,
      },
      {
        id: 'rouge-bordeaux',
        name: { fr: 'Rouge Bordeaux', ar: 'أحمر عنابي', wo: 'Rouge Bordeaux' },
        images: [IMAGES.BABOUCHE_MERCEDES_CROCO_ROUGE],
        sizes: [38, 39, 40, 41, 42, 43, 44, 45, 46],
        inStock: true,
      },
    ],
  },
  
  // 3. BABOUCHE MAROCAINE JAUNE NATUREL (Prix: 20 000 FCFA)
  {
    id: 103,
    slug: 'babouche-marocaine-jaune-naturel',
    title: { 
      fr: "Babouche Marocaine Jaune Naturel", 
      ar: "بابوش مراكشي أصفر طبيعي", 
      wo: "Babouche Marocaine Jaune Naturel" 
    },
    price: 20000,
    oldPrice: 25000, 
    category: 'babouches',
    type: 'shoes',
    pointsForts: ["Cuir premium jaune", "Finition haut de gamme", "Fabrication artisanale", "Style élégant et unique"],
    description: {
      fr: "La babouche marocaine jaune naturel, modèle unique en son genre. Avec sa couleur jaune distincte et sa finition haut de gamme, elle apporte une touche d'élégance authentique. Entièrement travaillée à la main, elle offre confort supérieur et style intemporel.",
      ar: "بابوش مراكشي أصفر طبيعي فريد من نوعه بألوانه الجميلة والحرفية العالية.",
      wo: "Babouche bu rafet ak yalla yu melé. Finition yu baax, style bu neex.",
    },
    image: IMAGES.BABOUCHE_JAUNE_NATUREL_WEBP,
    sku: "BM-NATUREL",
    colors: [
      {
        id: 'jaune',
        name: { fr: 'Jaune Naturel', ar: 'أصفر طبيعي', wo: 'Jaune Naturel' },
        images: [IMAGES.BABOUCHE_JAUNE_NATUREL_WEBP, IMAGES.BABOUCHE_JAUNE_NATUREL_PORTEE, IMAGES.BABOUCHE_JAUNE_NATUREL_DETAILS],
        sizes: [38, 39, 40, 41, 42, 43, 44, 45, 46],
        inStock: true,
      },
    ],
  },
  
  // 4. BABOUCHE MAROCAINE EN DAIM (Prix: 15 000 FCFA)
  {
    id: 104,
    slug: 'babouche-marocaine-daim',
    title: { 
      fr: "Babouche Marocaine en Daim", 
      ar: "بابوش مراكشي من جلد الغزال", 
      wo: "Babouche Marocaine en Daim" 
    },
    price: 15000,
    category: 'babouches',
    type: 'shoes',
    pointsForts: ["Daim véritable", "Détails de couture artisanale", "Confort durable"],
    description: {
      fr: "La babouche marocaine en daim véritable, symbole de sophistication et de confort. Avec la douceur du daim authentique et ses détails de couture artisanale, elle offre un look distingué et raffiné pour les occasions spéciales.",
      ar: "بابوش مراكشي من جلد الغزال الأصلي الناعم مع تفاصيل خياطة يدوية راقية.",
      wo: "Babouche Marocaine en daim bu neex, bu rafet ak bu gëna mat.",
    },
    image: IMAGES.BABOUCHE_DAIM_BLEU,
    sku: "BM-DAIM",
    colors: [
      {
        id: 'bleu',
        name: { fr: 'Bleu', ar: 'أزرق', wo: 'Bleu' },
        images: [IMAGES.BABOUCHE_DAIM_BLEU, IMAGES.BABOUCHE_DAIM_BLEU_SIDE, IMAGES.BABOUCHE_DAIM_BLEU_PRIX],
        sizes: [38, 39, 40, 41, 42, 43, 44, 45, 46],
        inStock: true,
      },
      {
        id: 'noir-brode',
        name: { fr: 'Noir Brodé', ar: 'أسود مطرز', wo: 'Noir Brodé' },
        images: [IMAGES.BABOUCHE_DAIM_NOIR_BRODE],
        sizes: [38, 39, 40, 41, 42, 43, 44, 45, 46],
        inStock: true,
      },
    ],
  },
  
  // ======================================
  // PRODUITS BONUS - NOS CLIENTS ONT AUSSI ACHETÉ
  // ======================================
  
  // 5. DJELLABA MAROCAINE (Vêtement traditionnel - Produit Bonus)
  {
    id: 105,
    slug: 'djellaba-marocaine',
    title: { 
      fr: "Djellaba Marocaine", 
      ar: "جلابة مراكشية", 
      wo: "Djellaba Marocaine" 
    },
    price: 25000,
    oldPrice: 45000,
    category: 'jellabas',
    type: 'clothing',
    videoUrl: "/videos/jellaba-collection.mp4",
    pointsForts: ["Tissu Mlifa de luxe", "Broderie main traditionnelle", "Coupe authentique marocaine"],
    description: {
      fr: "La Djellaba Marocaine authentique, vêtement traditionnel d'excellence. Confectionnée en tissu Mlifa de haute qualité avec broderies fines réalisées à la main. Parfaite pour les mariages, la Tabaski et les occasions spéciales. Découvrez son charme dans notre vidéo.",
      ar: "الجلابة المراكشية الأصلية، ملابس تقليدية بتميز. مصنوعة من قماش مليفة فاخر مع تطريز يدوي دقيق. مثالية للمناسبات الخاصة والأعياد.",
      wo: "Djellaba Marocaine bu neex, vêtement bu gëna lool ak bu rafet. Mliifa bu baax ak tatiis bu melé.",
    },
    image: IMAGES.DJELLABA_BLEU,
    sku: "JEL-001",
    colors: [
      {
        id: 'bleu',
        name: { fr: 'Bleu', ar: 'أزرق', wo: 'Bleu' },
        images: [IMAGES.DJELLABA_BLEU],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        inStock: true,
      },
      {
        id: 'beige',
        name: { fr: 'Beige', ar: 'بيج', wo: 'Beige' },
        images: [IMAGES.DJELLABA_BEIGE],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        inStock: true,
      },
      {
        id: 'clair',
        name: { fr: 'Clair', ar: 'فاتح', wo: 'Clair' },
        images: [IMAGES.DJELLABA_CLAIR],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        inStock: true,
      },
      {
        id: 'jaune',
        name: { fr: 'Jaune', ar: 'أصفر', wo: 'Jaune' },
        images: [IMAGES.DJELLABA_JAUNE],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        inStock: true,
      },
      {
        id: 'rouge',
        name: { fr: 'Rouge', ar: 'أحمر', wo: 'Rouge' },
        images: [IMAGES.DJELLABA_ROUGE],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        inStock: true,
      },
    ],
  },
];

// Export des babouches uniquement (pour la collection "Nos babouches royales")
export const BABOUCHES = PRODUCTS.filter(p => p.category === 'babouches');

// Export des produits bonus (pour la section "Nos clients ont aussi acheté")
export const BONUS_PRODUCTS = PRODUCTS.filter(p => p.category === 'jellabas');
