# Partage social des éditoriaux Weurseuk

Ce protocole s’applique à chaque nouvel éditorial ou analyse native publié sur Weurseuk. Il vise à garantir un aperçu lisible sur Facebook, WhatsApp, X, LinkedIn et Telegram, sans modifier le contenu éditorial.

## 1. Préparer l’image Open Graph

L’image de partage doit être **publique**, stable et idéalement au format paysage **1200 × 630 px**. Une illustration originale fournie par l’auteur peut être utilisée telle quelle, sauf demande explicite de filigrane. Lorsqu’un article natif possède déjà une couverture stockée dans `/manus-storage/`, le portail la sert automatiquement aux robots sociaux via son propre proxy stable. En l’absence de couverture propre à l’article, le portail affiche automatiquement le logo Weurseuk comme image de repli.

Après avoir hébergé une image publique durable, ajoutez son URL dans `server/ogMiddleware.ts`, au sein de l’objet `PUBLIC_OG_IMAGES`, avec le slug exact de l’article :

```ts
const PUBLIC_OG_IMAGES = {
  "slug-de-l-article": "https://i.imgur.com/identifiant-image.jpeg",
};
```

Une URL provisoire, signée ou privée ne doit pas être utilisée : les plateformes sociales doivent pouvoir la récupérer plusieurs jours après sa publication.

## 2. Vérifier l’aperçu avant diffusion

Une fois l’article en ligne, contrôlez les balises en simulant un robot social :

```bash
curl -sS -A 'facebookexternalhit/1.1' \
  'https://weurseuk.com/editorial/slug-de-l-article' | \
  grep -E 'og:(title|description|url|image)'
```

Les quatre données attendues sont le titre, le chapeau, l’URL canonique `https://weurseuk.com/...` et l’image publique. Le chemin `/api/og/...` ne doit jamais être diffusé comme lien à partager.

## 3. Publication Facebook manuelle

Sur la page de l’article, utilisez le bouton **Facebook** de Weurseuk. Le site ouvre un guide et copie automatiquement un texte comprenant le titre, la signature, le chapeau et le lien complet. Dans Facebook :

1. Ouvrez le guide puis cliquez sur **Ouvrir Facebook**.
2. Collez le texte dans le champ de publication de la page.
3. Attendez l’affichage de l’aperçu ; vérifiez le titre et l’image.
4. Publiez uniquement après cette vérification.

> La publication automatique sur une page Facebook reste conditionnée à la mise à disposition d’un **Page Access Token** valide et à la configuration de Meta Business Suite. En attendant, ce processus manuel assure une diffusion cohérente.
