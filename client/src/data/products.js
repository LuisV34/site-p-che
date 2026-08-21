// Catalogue générique — à remplacer par tes vrais produits / une base de données
export const CATEGORIES = [
  { id: "leurres", label: "Leurres & appâts" },
  { id: "vetements", label: "Vêtements & bottes" },
];

export const PRODUCTS = [
  {
    id: "leurres-souples-x12",
    name: "Boîte de 12 leurres souples",
    category: "leurres",
    price: 18.9,
    tag: "Assortiment",
    description: "Coloris variés, formes shad et finesse, pour carnassiers en eau douce.",
  },
  {
    id: "cuillere-tournante",
    name: "Cuillère tournante n°3",
    category: "leurres",
    price: 6.5,
    tag: "Classique",
    description: "Le leurre increvable pour la truite et la perche.",
  },
  {
    id: "waders-respirants",
    name: "Waders respirants",
    category: "vetements",
    price: 119.0,
    tag: "Technique",
    description: "Membrane respirante 3 couches, bretelles réglables, chaussons néoprène.",
  },
  {
    id: "veste-impermeable",
    name: "Veste imperméable multipoches",
    category: "vetements",
    price: 79.9,
    tag: "Toutes saisons",
    description: "Coupe-vent et imperméable, nombreuses poches pour boîtes et accessoires.",
  },
  {
    id: "casquette-anti-uv",
    name: "Casquette anti-UV",
    category: "vetements",
    price: 16.9,
    tag: "Été",
    description: "Protection solaire, séchage rapide, visière longue.",
  },
  {
    id: "gilet-peche-bassdash",
    name: "Gilet de pêche Bassdash",
    category: "vetements",
    price: 39.9,
    compareAtPrice: 54.9,
    rating: 4.8,
    reviewCount: 132,
    tag: "Multi-poches",
    description:
      "Gilet respirant et réglable, nombreuses poches intérieures et extérieures, dos en maille pour rester au frais.",
    photos: [
      "https://ae-pic-a1.aliexpress-media.com/kf/S471a6ad55a03460c9523959d2134d6e1f.jpg_960x960q75.jpg_.avif",
      "https://ae-pic-a1.aliexpress-media.com/kf/S028fb4030d8649129d2c7bc613393c0d2.jpg_960x960q75.jpg_.avif",
      "https://ae-pic-a1.aliexpress-media.com/kf/S5c99196dcc0c4b97a5751f8fefa0f621l.jpg_960x960q75.jpg_.avif",
      "https://ae-pic-a1.aliexpress-media.com/kf/S1959907d08ce4dc8ae5507112e75b207F.jpg_960x960q75.jpg_.avif",
      "https://ae-pic-a1.aliexpress-media.com/kf/S649e874f8bd646e682161b8e362f4aeeT.jpg_960x960q75.jpg_.avif",
    ],
    specs: {
      "Matière": "Polyester respirant",
      "Coloris disponibles": "Vert armée, bleu, gris, rouge",
      "Réglages": "Bretelles épaules et taille ajustables",
      "Dos": "Maille aérée anti-transpiration",
      "Origine": "Fabricant Bassdash",
    },
    reviews: [
      {
        author: "Marc L.",
        rating: 5,
        text: "Très bonne surprise, les poches sont bien pensées et le dos en maille respire vraiment bien en été.",
      },
      {
        author: "Julie D.",
        rating: 4.5,
        text: "Bon rapport qualité/prix, réglable facilement. Un coloris un peu plus clair aurait été bien pour l'été.",
      },
    ],
  },
];
