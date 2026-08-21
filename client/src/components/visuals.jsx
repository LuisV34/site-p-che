// Visuels de marque — logo, icônes de catégorie, illustrations de secours
// pour les fiches produit tant que les vraies photos ne sont pas ajoutées.

export function LogoMark({ size = 30 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="20" cy="20" r="19" stroke="#DBA95A" strokeOpacity="0.4" />
      <path
        d="M20 8 V21"
        stroke="#F7F4EC"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M20 21 C20 27, 14 26, 14.5 21.5 C15 17.5, 20.5 18, 20 22.5"
        stroke="#DBA95A"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="20" cy="8" r="2.4" fill="none" stroke="#F7F4EC" strokeWidth="1.4" />
    </svg>
  );
}

/* ---------- Category line icons (for pills / nav) ---------- */

function IconLure() {
  return (
    <>
      <ellipse cx="10.5" cy="12" rx="6.2" ry="2.6" />
      <path d="M16.5 12 L20.5 9.3" strokeLinecap="round" />
      <path d="M16.5 12 L20.5 14.7" strokeLinecap="round" />
      <path d="M6.8 14 C6.2 16, 5.4 16.6, 4 16.8" strokeLinecap="round" strokeWidth="1.1" />
      <path d="M9 14.4 C8.6 16, 8 16.6, 7 17" strokeLinecap="round" strokeWidth="1.1" />
      <circle cx="14.8" cy="11.2" r="0.6" fill="currentColor" stroke="none" />
    </>
  );
}

function IconTacklebox() {
  return (
    <>
      <rect x="3.5" y="9.5" width="17" height="10" rx="1.2" />
      <path d="M8.5 9.5 V7.3 C8.5 6.6 9 6 9.7 6 H14.3 C15 6 15.5 6.6 15.5 7.3 V9.5" />
      <path d="M3.5 14 H20.5" strokeWidth="1.1" />
      <path d="M12 9.5 V19" strokeWidth="1.1" strokeOpacity="0.6" />
    </>
  );
}

function IconJacket() {
  return (
    <>
      <path d="M9 4.5 L12 6.5 L15 4.5" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M9 4.5 L4.5 7 L6 10 L7.5 9 V19.5 H16.5 V9 L18 10 L19.5 7 L15 4.5"
        strokeLinejoin="round"
      />
      <path d="M12 6.5 V16" strokeWidth="1.1" strokeOpacity="0.6" />
    </>
  );
}

const ICONS = {
  leurres: IconLure,
  vetements: IconJacket,
};

export function CategoryIcon({ id, size = 16 }) {
  const Icon = ICONS[id];
  if (!Icon) return null;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="category-icon"
    >
      <Icon />
    </svg>
  );
}

/* ---------- Category art (product-card placeholder) ---------- */

export function CategoryArt({ id }) {
  const Icon = ICONS[id] || IconTacklebox;
  return (
    <div className="product-art">
      <svg viewBox="0 0 120 90" className="product-art-wave" aria-hidden="true">
        <path
          d="M0 60 C 18 50, 34 50, 50 58 C 68 66, 82 66, 100 56 C 110 50, 116 52, 120 56 V90 H0 Z"
          fill="var(--river)"
          opacity="0.16"
        />
        <path
          d="M0 68 C 20 60, 36 60, 52 66 C 70 73, 84 73, 102 64 C 111 59, 116 61, 120 64 V90 H0 Z"
          fill="var(--river)"
          opacity="0.22"
        />
      </svg>
      <svg
        width="34"
        height="34"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--brass)"
        strokeWidth="1.4"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="product-art-icon"
      >
        <Icon />
      </svg>
    </div>
  );
}

/* ---------- Rating stars ---------- */

function Star({ fill }) {
  return (
    <svg width="14" height="14" viewBox="0 0 20 20" aria-hidden="true">
      <path
        d="M10 1.5 12.4 7 18.3 7.6 13.8 11.6 15.1 17.5 10 14.4 4.9 17.5 6.2 11.6 1.7 7.6 7.6 7 Z"
        fill={fill ? "var(--brass)" : "none"}
        stroke="var(--brass)"
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function RatingStars({ rating, count }) {
  if (!rating) return null;
  const rounded = Math.round(rating);
  return (
    <div className="rating-stars">
      <span className="rating-stars-icons">
        {[1, 2, 3, 4, 5].map((n) => (
          <Star key={n} fill={n <= rounded} />
        ))}
      </span>
      {count != null && <span className="rating-count">({count} avis)</span>}
    </div>
  );
}

/* ---------- Wishlist heart ---------- */

export function HeartIcon({ filled }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 20.2 C12 20.2 3.5 15.4 3.5 9.4 C3.5 6.4 5.8 4.3 8.4 4.3 C10 4.3 11.3 5.1 12 6.3 C12.7 5.1 14 4.3 15.6 4.3 C18.2 4.3 20.5 6.4 20.5 9.4 C20.5 15.4 12 20.2 12 20.2 Z"
        fill={filled ? "#B0473F" : "none"}
        stroke={filled ? "#B0473F" : "currentColor"}
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ---------- Reassurance strip icons ---------- */

export function IconTruck() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
      <rect x="2" y="7" width="12" height="9" rx="1" />
      <path d="M14 10h4l3.5 3.5V16h-7.5z" />
      <circle cx="7" cy="18.2" r="1.6" />
      <circle cx="17" cy="18.2" r="1.6" />
    </svg>
  );
}

export function IconShield() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
      <path d="M12 3 19 6 V11 C19 15.5 16 18.8 12 20.5 C8 18.8 5 15.5 5 11 V6 Z" strokeLinejoin="round" />
      <path d="M8.7 12 11 14.3 15.3 9.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconRotate() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
      <path d="M4 12a8 8 0 0 1 14-5.3M20 12a8 8 0 0 1-14 5.3" strokeLinecap="round" />
      <path d="M18 3v4.2h-4.2M6 21v-4.2h4.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ---------- Hero background scene ---------- */

export function HeroScene() {
  return (
    <svg
      className="hero-line"
      viewBox="0 0 640 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="540" cy="70" r="46" fill="url(#sunGlow)" />
      <defs>
        <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#DBA95A" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#DBA95A" stopOpacity="0" />
        </radialGradient>
      </defs>
      <path
        d="M0 60 C 220 40, 380 160, 430 300 C 460 380, 520 420, 620 430"
        stroke="#DBA95A"
        strokeWidth="1.5"
        strokeOpacity="0.7"
      />
      <g opacity="0.8">
        <path
          d="M556 328 C 572 316, 596 316, 610 326 C 598 320, 582 322, 570 332 C 582 328, 596 330, 606 340 C 590 336, 574 336, 562 344 Z"
          fill="#4C7A6E"
          fillOpacity="0.5"
        />
        <path d="M556 328 L546 322" stroke="#4C7A6E" strokeOpacity="0.5" strokeLinecap="round" />
      </g>
      <circle cx="620" cy="430" r="5" fill="#C08A34" />
      <circle cx="620" cy="430" r="10" fill="none" stroke="#C08A34" strokeOpacity="0.4" />
      <circle cx="620" cy="430" r="18" fill="none" stroke="#C08A34" strokeOpacity="0.22" />
      <path
        d="M20 440 C 140 420, 260 452, 380 434 C 460 422, 540 440, 640 424"
        stroke="#F7F4EC"
        strokeOpacity="0.08"
        strokeWidth="1"
      />
      <path
        d="M-20 468 C 110 448, 240 478, 370 460 C 460 448, 550 466, 660 450"
        stroke="#F7F4EC"
        strokeOpacity="0.06"
        strokeWidth="1"
      />
    </svg>
  );
}
