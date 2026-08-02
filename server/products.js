// Source de vérité des prix côté serveur — doit rester synchronisée avec
// client/src/data/products.js (idéalement, les deux viendraient d'une vraie
// base de données à terme).
export const PRODUCTS = [
  { id: "canne-riviere-240", name: "Canne Rivière 2,40 m", price: 89.9 },
  { id: "canne-carnassier-300", name: "Canne Carnassier 3,00 m", price: 149.0 },
  { id: "moulinet-spinning-3000", name: "Moulinet Spinning 3000", price: 64.5 },
  { id: "moulinet-casting-pro", name: "Moulinet Casting Pro", price: 129.0 },
  { id: "leurres-souples-x12", name: "Boîte de 12 leurres souples", price: 18.9 },
  { id: "cuillere-tournante", name: "Cuillère tournante n°3", price: 6.5 },
  { id: "epuisette-pliable", name: "Épuisette pliable", price: 34.9 },
  { id: "boite-hamecons-assortis", name: "Boîte d'hameçons assortis", price: 9.9 },
  { id: "siege-pliant", name: "Siège pliant de bord d'eau", price: 44.0 },
  { id: "waders-respirants", name: "Waders respirants", price: 119.0 },
  { id: "veste-impermeable", name: "Veste imperméable multipoches", price: 79.9 },
  { id: "casquette-anti-uv", name: "Casquette anti-UV", price: 16.9 },
];
