// Serveur e-commerce minimal : session de paiement Stripe + webhook de confirmation
import "dotenv/config";
import express from "express";
import cors from "cors";
import Stripe from "stripe";
import { PRODUCTS } from "./products.js";

const app = express();
const PORT = process.env.PORT || 4000;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

if (!process.env.STRIPE_SECRET_KEY) {
  console.warn(
    "⚠️  STRIPE_SECRET_KEY manquante. Ajoute-la dans server/.env (voir .env.example)."
  );
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_placeholder");

app.use(cors({ origin: CLIENT_URL }));

// Le webhook Stripe a besoin du corps brut (raw), donc on le déclare AVANT express.json()
app.post(
  "/api/webhook",
  express.raw({ type: "application/json" }),
  (req, res) => {
    let event = req.body;

    if (process.env.STRIPE_WEBHOOK_SECRET) {
      const sig = req.headers["stripe-signature"];
      try {
        event = stripe.webhooks.constructEvent(
          req.body,
          sig,
          process.env.STRIPE_WEBHOOK_SECRET
        );
      } catch (err) {
        console.error("Signature webhook invalide:", err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
      }
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      // TODO: enregistrer la commande en base de données, envoyer un e-mail de
      // confirmation, décrémenter le stock, etc.
      console.log("✅ Paiement confirmé pour la session:", session.id);
    }

    res.json({ received: true });
  }
);

app.use(express.json());

// Recalcule les prix côté serveur à partir du catalogue — ne jamais faire
// confiance aux prix envoyés par le client.
app.post("/api/create-checkout-session", async (req, res) => {
  try {
    const { items } = req.body;
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "Panier vide" });
    }

    const line_items = items.map(({ id, qty }) => {
      const product = PRODUCTS.find((p) => p.id === id);
      if (!product) throw new Error(`Produit inconnu: ${id}`);
      return {
        price_data: {
          currency: "eur",
          product_data: { name: product.name },
          unit_amount: Math.round(product.price * 100),
        },
        quantity: Math.max(1, Math.min(qty, 20)),
      };
    });

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      success_url: `${CLIENT_URL}/success`,
      cancel_url: `${CLIENT_URL}/cancel`,
      shipping_address_collection: { allowed_countries: ["FR", "BE", "CH", "LU"] },
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/products", (req, res) => res.json(PRODUCTS));

app.listen(PORT, () => console.log(`API démarrée sur http://localhost:${PORT}`));
