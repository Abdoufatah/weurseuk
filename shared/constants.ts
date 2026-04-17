// Weurseuk CDN Assets
export const ASSETS = {
  logo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663077132964/gZtFuPhj9JU8iVtsGM9iQB/LOGOTRANSPARENTWEURSEUK_019a1188.png",
  bensiracProfileCard: "https://d2xsxph8kpxj0f.cloudfront.net/310519663077132964/gZtFuPhj9JU8iVtsGM9iQB/bensirac-profile-card_96ae73cb.png",
  bensiracPortrait: "https://d2xsxph8kpxj0f.cloudfront.net/310519663077132964/gZtFuPhj9JU8iVtsGM9iQB/bensirac-portrait_1363624a.png",
  coverBanner: "https://d2xsxph8kpxj0f.cloudfront.net/310519663077132964/gZtFuPhj9JU8iVtsGM9iQB/cover-banner_3fb1346b.jpg",
} as const;

// Navigation sections
export const NAV_SECTIONS = [
  { label: "Accueil", href: "/" },
  { label: "Actualité", href: "/section/actualite" },
  { label: "Politique & Économie", href: "/section/politique-economie" },
  { label: "International", href: "/section/international" },
  { label: "Société", href: "/section/societe" },
  { label: "Analyses", href: "/section/analyses" },
  { label: "Éditoriaux", href: "/editoriaux" },
  { label: "Contact", href: "/contact" },
] as const;

// Thematic categories mapping
export const CATEGORIES = [
  { name: "Politique", slug: "politique" },
  { name: "Économie", slug: "economie" },
  { name: "Société", slug: "societe" },
  { name: "International", slug: "international" },
  { name: "Culture", slug: "culture" },
  { name: "Sport", slug: "sport" },
  { name: "Sciences & Religion", slug: "sciences-religion" },
] as const;

// Region labels
export const REGIONS = {
  senegal: "Sénégal",
  afrique_ouest: "Afrique de l'Ouest",
  monde: "Monde",
} as const;

// Bensirac author profile
export const BENSIRAC = {
  alias: "Bensirac",
  title: "Éditorialiste",
  bio: "Chercheur en sciences religieuses, sociétés et dynamiques transnationales. Journaliste et analyste politique spécialisé sur le Sénégal. Ses publications se distinguent par leur rigueur scientifique, leur profondeur conceptuelle et leur niveau d'analyse extrêmement élevé.",
  photo: ASSETS.bensiracPortrait,
  profileCard: ASSETS.bensiracProfileCard,
  socialLinks: {
    twitter: "#",
    linkedin: "#",
    facebook: "#",
  },
} as const;
