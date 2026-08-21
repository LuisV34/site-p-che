// Source de vérité des prix côté serveur — doit rester synchronisée avec
// client/src/data/products.js (idéalement, les deux viendraient d'une vraie
// base de données à terme).
export const PRODUCTS = [
  { id: "leurres-souples-x12", name: "Boîte de 12 leurres souples", price: 18.9 },
  { id: "cuillere-tournante", name: "Cuillère tournante n°3", price: 6.5 },
  { id: "waders-respirants", name: "Waders respirants", price: 119.0 },
  { id: "veste-impermeable", name: "Veste imperméable multipoches", price: 79.9 },
  { id: "casquette-anti-uv", name: "Casquette anti-UV", price: 16.9 },
  { id: "gilet-peche-bassdash", name: "Gilet de pêche Bassdash", price: 39.9 },
];
