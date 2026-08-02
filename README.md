# Le Coin des Pêcheurs — boutique en ligne d'articles de pêche

Projet de démarrage complet : front-end React (catalogue + panier) et back-end
Express connecté à **Stripe Checkout** pour le paiement réel.

```
hamecon-shop/
├── client/     → site (React + Vite)
└── server/     → API (Node/Express + Stripe)
```

## 1. Prérequis

- Node.js 18+ installé
- Un compte Stripe (gratuit) : https://dashboard.stripe.com/register

## 2. Installer et lancer en local

```bash
# Terminal 1 — API
cd server
cp .env.example .env      # puis colle tes clés Stripe dans .env
npm install
npm run dev                # démarre sur http://localhost:4000

# Terminal 2 — Site
cd client
cp .env.example .env
npm install
npm run dev                # démarre sur http://localhost:5173
```

Ouvre http://localhost:5173, ajoute des articles au panier, clique sur
"Passer au paiement" : tu es redirigé vers une vraie page Stripe Checkout
(en mode test).

## 3. Récupérer tes clés Stripe (mode test)

1. Connecte-toi sur https://dashboard.stripe.com
2. Reste en **mode test** (bascule en haut à droite)
3. Va dans *Développeurs → Clés API*
4. Copie la **clé secrète** (`sk_test_...`) dans `server/.env` (`STRIPE_SECRET_KEY`)

Pour tester un paiement, utilise une carte de test Stripe, par exemple :
`4242 4242 4242 4242`, une date future, n'importe quel CVC.

## 4. Webhook (confirmation de commande)

Le webhook (`/api/webhook`) est l'endroit où tu dois enregistrer la commande
en base de données, envoyer l'e-mail de confirmation, etc. (voir le `TODO`
dans `server/server.js`).

En local, teste-le avec la Stripe CLI :

```bash
stripe listen --forward-to localhost:4000/api/webhook
```

Elle t'affichera un `whsec_...` à mettre dans `server/.env`
(`STRIPE_WEBHOOK_SECRET`).

## 5. Passer en production

- **Clés Stripe** : dans le dashboard Stripe, active le compte (infos
  légales/bancaires) puis récupère les clés en mode **live** (`sk_live_...`).
- **Hébergement API** : Render, Railway ou Fly.io (le serveur Express doit
  tourner en continu). Renseigne les variables d'environnement du `.env` dans
  les paramètres de la plateforme.
- **Hébergement site** : `npm run build` dans `client/` génère un dossier
  `dist/` statique à déployer sur Vercel, Netlify ou Cloudflare Pages.
  Renseigne `VITE_API_URL` avec l'URL de ton API en production.
- **Webhook Stripe en prod** : dans le dashboard Stripe → *Développeurs →
  Webhooks*, ajoute l'URL `https://ton-api.com/api/webhook` et récupère le
  `whsec_...` correspondant.
- **Nom de domaine + HTTPS** : obligatoire pour le mode live de Stripe.

## 6. Prochaines étapes suggérées

- Base de données (commandes, stock, clients) — Postgres via Supabase/Neon
  est un bon point de départ.
- Emails transactionnels (confirmation de commande) — Resend ou Postmark.
- Gestion du stock et des variantes (taille, couleur).
- Compte client / historique de commandes.
- Frais de livraison et calcul de TVA (Stripe Tax peut aider).

## Sécurité

Ne mets **jamais** tes clés `sk_...` dans le code du site (`client/`) : elles
doivent rester uniquement côté serveur (`server/.env`, jamais commité dans
Git — le fichier `.gitignore` l'exclut déjà).
