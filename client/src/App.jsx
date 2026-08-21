import { useEffect, useMemo, useState } from "react";
import { CATEGORIES, PRODUCTS } from "./data/products";
import {
  LogoMark,
  CategoryIcon,
  CategoryArt,
  HeroScene,
  RatingStars,
  HeartIcon,
  IconTruck,
  IconShield,
  IconRotate,
  IconHeadset,
} from "./components/visuals";

const WISHLIST_KEY = "hamecon-wishlist";

function useWishlist() {
  const [ids, setIds] = useState(() => {
    try {
      return new Set(JSON.parse(localStorage.getItem(WISHLIST_KEY) || "[]"));
    } catch {
      return new Set();
    }
  });

  function toggle(id) {
    setIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      localStorage.setItem(WISHLIST_KEY, JSON.stringify([...next]));
      return next;
    });
  }

  return { isWishlisted: (id) => ids.has(id), toggle };
}

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

function formatPrice(value) {
  return value.toLocaleString("fr-FR", { style: "currency", currency: "EUR" });
}

function productImages(product) {
  if (product.photos?.length) return product.photos;
  if (product.photo) return [product.photo];
  return [];
}

function discountPercent(product) {
  if (!product.compareAtPrice || product.compareAtPrice <= product.price) return null;
  return Math.round((1 - product.price / product.compareAtPrice) * 100);
}

function PriceBlock({ product, className = "" }) {
  const discount = discountPercent(product);
  return (
    <span className={`price-block ${className}`}>
      <span className="product-price">{formatPrice(product.price)}</span>
      {discount && (
        <>
          <span className="price-compare">{formatPrice(product.compareAtPrice)}</span>
          <span className="price-discount">-{discount}%</span>
        </>
      )}
    </span>
  );
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
          Leurres et vêtements techniques sélectionnés pour les pêcheurs du
          dimanche comme pour les techniciens du carnassier. Livraison sous 48h.
        </p>
        <a href="#catalogue" className="hero-cta">
          Voir le catalogue →
        </a>
      </div>
    </section>
  );
}

function TrustBar() {
  return (
    <div className="trust-bar">
      <div>
        <IconTruck />
        <div>
          <strong>Livraison rapide</strong>
          <span>Expédié sous 48h</span>
        </div>
      </div>
      <div>
        <IconShield />
        <div>
          <strong>Paiement sécurisé</strong>
          <span>100% sécurisé via Stripe</span>
        </div>
      </div>
      <div>
        <IconHeadset />
        <div>
          <strong>Service client</strong>
          <span>Réponse sous 24h</span>
        </div>
      </div>
    </div>
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

function ProductCard({ product, onAdd, onOpen, wishlist }) {
  const images = productImages(product);
  return (
    <div
      className="product-card"
      onClick={() => onOpen(product)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onOpen(product)}
    >
      <span className="product-tag">{product.tag}</span>
      <button
        className="wishlist-button"
        aria-label="Ajouter aux favoris"
        onClick={(e) => {
          e.stopPropagation();
          wishlist.toggle(product.id);
        }}
      >
        <HeartIcon filled={wishlist.isWishlisted(product.id)} />
      </button>
      {images[0] ? (
        <img className="product-photo" src={images[0]} alt={product.name} />
      ) : (
        <CategoryArt id={product.category} />
      )}
      <h3 className="product-name">{product.name}</h3>
      <RatingStars rating={product.rating} count={product.reviewCount} />
      <p className="product-desc">{product.description}</p>
      <div className="product-footer">
        <PriceBlock product={product} />
        <button
          className="add-button"
          onClick={(e) => {
            e.stopPropagation();
            onAdd(product);
          }}
        >
          Ajouter
        </button>
      </div>
    </div>
  );
}

function ProductModal({ product, onClose, onAdd, wishlist }) {
  const images = productImages(product);
  const [activeImage, setActiveImage] = useState(0);
  const [tab, setTab] = useState("description");

  useEffect(() => {
    setActiveImage(0);
    setTab("description");
  }, [product]);

  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  if (!product) return null;

  const tabs = [
    { id: "description", label: "Description" },
    ...(product.specs ? [{ id: "specs", label: "Caractéristiques" }] : []),
    { id: "avis", label: `Avis${product.reviews?.length ? ` (${product.reviews.length})` : ""}` },
  ];

  return (
    <>
      <div className="modal-overlay" onClick={onClose} />
      <div className="product-modal" role="dialog" aria-modal="true">
        <button className="modal-close" onClick={onClose} aria-label="Fermer">
          ×
        </button>
        <div className="product-modal-body">
          <div className="product-modal-gallery">
            <div className="product-modal-main-image">
              <button
                className="wishlist-button wishlist-button-modal"
                aria-label="Ajouter aux favoris"
                onClick={() => wishlist.toggle(product.id)}
              >
                <HeartIcon filled={wishlist.isWishlisted(product.id)} />
              </button>
              {images.length ? (
                <img src={images[activeImage]} alt={product.name} />
              ) : (
                <CategoryArt id={product.category} />
              )}
            </div>
            {images.length > 1 && (
              <div className="product-modal-thumbs">
                {images.map((src, i) => (
                  <button
                    key={src}
                    className={`product-modal-thumb ${i === activeImage ? "active" : ""}`}
                    onClick={() => setActiveImage(i)}
                  >
                    <img src={src} alt={`${product.name} — vue ${i + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="product-modal-info">
            <span className="product-tag">{product.tag}</span>
            <h2>{product.name}</h2>
            <RatingStars rating={product.rating} count={product.reviewCount} />
            <PriceBlock product={product} className="price-block-large" />

            <div className="modal-tabs">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  className={`modal-tab ${tab === t.id ? "active" : ""}`}
                  onClick={() => setTab(t.id)}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {tab === "description" && (
              <p className="product-modal-desc">{product.description}</p>
            )}

            {tab === "specs" && product.specs && (
              <dl className="product-modal-specs">
                {Object.entries(product.specs).map(([label, value]) => (
                  <div className="spec-row" key={label}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            )}

            {tab === "avis" && (
              <div className="reviews-list">
                {product.reviews?.length ? (
                  product.reviews.map((r, i) => (
                    <div className="review-item" key={i}>
                      <div className="review-head">
                        <RatingStars rating={r.rating} />
                        <span className="review-author">{r.author}</span>
                      </div>
                      <p>{r.text}</p>
                    </div>
                  ))
                ) : (
                  <p className="reviews-empty">Pas encore d'avis pour ce produit.</p>
                )}
              </div>
            )}

            <button
              className="add-button add-button-large"
              onClick={() => {
                onAdd(product);
                onClose();
              }}
            >
              Ajouter au panier
            </button>

            <div className="reassurance-strip">
              <div>
                <IconTruck />
                Livraison sous 48h
              </div>
              <div>
                <IconShield />
                Paiement sécurisé
              </div>
              <div>
                <IconRotate />
                Retour sous 30 jours
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
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
              {productImages(item)[0] ? (
                <img className="cart-item-photo" src={productImages(item)[0]} alt={item.name} />
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
  const [selectedProduct, setSelectedProduct] = useState(null);
  const wishlist = useWishlist();

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
      <TrustBar />
      <div id="catalogue">
        <CategoryRail active={activeCategory} onSelect={setActiveCategory} />
        <section className="catalog">
          <div className="catalog-heading">
            <h2>Catalogue</h2>
            <span>{filtered.length} article(s)</span>
          </div>
          <div className="product-grid">
            {filtered.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onAdd={addToCart}
                onOpen={setSelectedProduct}
                wishlist={wishlist}
              />
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
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAdd={addToCart}
          wishlist={wishlist}
        />
      )}
    </>
  );
}
