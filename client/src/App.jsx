import { useMemo, useState } from "react";
import { CATEGORIES, PRODUCTS } from "./data/products";
import { LogoMark, CategoryIcon, CategoryArt, HeroScene } from "./components/visuals";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

function formatPrice(value) {
  return value.toLocaleString("fr-FR", { style: "currency", currency: "EUR" });
}

function Header({ cartCount, onOpenCart }) {
  return (
    <header className="site-header">
      <div className="header-inner">
        <div className="brand">
          <LogoMark />
          Le Coin des Pêcheurs
        </div>
        <span className="brand-tagline">Tout pour la pêche, à portée de ligne</span>
        <div className="header-actions">
          <button className="cart-button" onClick={onOpenCart}>
            Panier <span className="cart-count">{cartCount}</span>
          </button>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero">
      <HeroScene />
      <div className="hero-inner">
        <div className="hero-eyebrow">Boutique en ligne — pêche généraliste</div>
        <h1>
          Chaque partie de pêche <em>commence</em> par le bon matériel.
        </h1>
        <p>
          Cannes, moulinets, leurres et accessoires sélectionnés pour les
          pêcheurs du dimanche comme pour les techniciens du carnassier.
          Livraison sous 48h.
        </p>
        <a href="#catalogue" className="hero-cta">
          Voir le catalogue →
        </a>
      </div>
    </section>
  );
}

function CategoryRail({ active, onSelect }) {
  return (
    <div className="category-rail">
      <button
        className={`category-pill ${active === "all" ? "active" : ""}`}
        onClick={() => onSelect("all")}
      >
        Tout
      </button>
      {CATEGORIES.map((c) => (
        <button
          key={c.id}
          className={`category-pill ${active === c.id ? "active" : ""}`}
          onClick={() => onSelect(c.id)}
        >
          <CategoryIcon id={c.id} />
          {c.label}
        </button>
      ))}
    </div>
  );
}

function ProductCard({ product, onAdd }) {
  return (
    <div className="product-card">
      <span className="product-tag">{product.tag}</span>
      {product.photo ? (
        <img className="product-photo" src={product.photo} alt={product.name} />
      ) : (
        <CategoryArt id={product.category} />
      )}
      <h3 className="product-name">{product.name}</h3>
      <p className="product-desc">{product.description}</p>
      <div className="product-footer">
        <span className="product-price">{formatPrice(product.price)}</span>
        <button className="add-button" onClick={() => onAdd(product)}>
          Ajouter
        </button>
      </div>
    </div>
  );
}

function CartDrawer({ items, onClose, onQtyChange, onRemove }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  async function handleCheckout() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/api/create-checkout-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({ id: i.id, qty: i.qty })),
        }),
      });
      if (!res.ok) throw new Error("Erreur serveur");
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url; // redirect to Stripe Checkout
      } else {
        throw new Error("Pas d'URL de paiement retournée");
      }
    } catch (e) {
      setError(
        "Impossible de lancer le paiement. Vérifie que le serveur (API_URL) est démarré et configuré avec tes clés Stripe."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="cart-overlay" onClick={onClose} />
      <aside className="cart-drawer">
        <div className="cart-header">
          <h3>Votre panier</h3>
          <button className="cart-close" onClick={onClose} aria-label="Fermer le panier">
            ×
          </button>
        </div>
        <div className="cart-items">
          {items.length === 0 && <div className="cart-empty">Ton panier est vide.</div>}
          {items.map((item) => (
            <div className="cart-item" key={item.id}>
              {item.photo ? (
                <img className="cart-item-photo" src={item.photo} alt={item.name} />
              ) : (
                <div className="cart-item-icon">
                  <CategoryIcon id={item.category} size={20} />
                </div>
              )}
              <div className="cart-item-info">
                <p className="cart-item-name">{item.name}</p>
                <div className="cart-item-price">{formatPrice(item.price)}</div>
                <div className="qty-controls">
                  <button onClick={() => onQtyChange(item.id, item.qty - 1)}>−</button>
                  <span>{item.qty}</span>
                  <button onClick={() => onQtyChange(item.id, item.qty + 1)}>+</button>
                </div>
                <button className="remove-item" onClick={() => onRemove(item.id)}>
                  Retirer
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="cart-footer">
          <div className="cart-total">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
          <button
            className="checkout-button"
            disabled={items.length === 0 || loading}
            onClick={handleCheckout}
          >
            {loading ? "Redirection…" : "Passer au paiement"}
          </button>
          {error && <div className="checkout-error">{error}</div>}
        </div>
      </aside>
    </>
  );
}

function StatusPage({ kind }) {
  const isSuccess = kind === "success";
  return (
    <div className="status-page">
      <h1>{isSuccess ? "Merci pour votre commande 🎣" : "Paiement annulé"}</h1>
      <p>
        {isSuccess
          ? "Votre paiement a été confirmé. Un e-mail de confirmation vous a été envoyé (à connecter à ton service d'e-mailing)."
          : "Le paiement a été annulé, aucun montant n'a été prélevé."}
      </p>
      <a href="/">← Retour à la boutique</a>
    </div>
  );
}

export default function App() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");

  const path = window.location.pathname;
  if (path === "/success") return <StatusPage kind="success" />;
  if (path === "/cancel") return <StatusPage kind="cancel" />;

  const filtered = useMemo(
    () =>
      activeCategory === "all"
        ? PRODUCTS
        : PRODUCTS.filter((p) => p.category === activeCategory),
    [activeCategory]
  );

  function addToCart(product) {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setCartOpen(true);
  }

  function changeQty(id, qty) {
    if (qty <= 0) {
      setCart((prev) => prev.filter((i) => i.id !== id));
      return;
    }
    setCart((prev) => prev.map((i) => (i.id === id ? { ...i, qty } : i)));
  }

  function removeItem(id) {
    setCart((prev) => prev.filter((i) => i.id !== id));
  }

  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  return (
    <>
      <Header cartCount={cartCount} onOpenCart={() => setCartOpen(true)} />
      <Hero />
      <div id="catalogue">
        <CategoryRail active={activeCategory} onSelect={setActiveCategory} />
        <section className="catalog">
          <div className="catalog-heading">
            <h2>Catalogue</h2>
            <span>{filtered.length} article(s)</span>
          </div>
          <div className="product-grid">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} onAdd={addToCart} />
            ))}
          </div>
        </section>
      </div>
      <footer className="site-footer">
        Le Coin des Pêcheurs — boutique de démonstration · paiement sécurisé via Stripe
      </footer>
      {cartOpen && (
        <CartDrawer
          items={cart}
          onClose={() => setCartOpen(false)}
          onQtyChange={changeQty}
          onRemove={removeItem}
        />
      )}
    </>
  );
}
