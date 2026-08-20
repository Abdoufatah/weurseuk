# Weurseuk - Project TODO

- [x] Upload static assets (logo, author photos, cover banner) to CDN
- [x] Database schema: articles, editorials, categories, RSS sources, breaking news
- [x] tRPC procedures: CRUD editorials, list articles, RSS aggregation, categories
- [x] Global design system: gold/anthracite/white palette, premium typography, index.css theming
- [x] Navigation header with Weurseuk logo and thematic sections (Sénégal, Afrique de l'Ouest, Monde, Éditoriaux, Culture, Sport)
- [x] Hero banner with cover photo, logo overlay, and breaking news ticker
- [x] Homepage layout: featured articles grid, latest news feed, editorial highlights, ad placements
- [x] Breaking News ticker/bar on homepage
- [x] RSS aggregation backend: admin can add RSS sources and manually add aggregated articles
- [x] Aggregated articles display with source attribution and external links
- [x] Thematic sections pages: Politique, Économie, Société, International, Culture, Sport
- [x] Category filtering and dedicated navigation
- [x] Bensirac editorial blog: list and detail views for editorials
- [x] Bensirac profile page: author photo, alias, biography, published editorials list, social links
- [x] Ad placements: Leaderboard, MPU, sidebar banners with clear "Publicité" labels
- [x] Admin interface: publish editorials, manage aggregated content, performance tracking
- [x] Responsive mobile-first design across all pages
- [x] SEO optimization: meta descriptions, structured data, sitemap, performance
- [x] Vitest tests for backend procedures (22 tests passing)
- [x] Rechercher et valider les flux RSS actifs de Dakaractu, Seneweb, Le Soleil et autres médias sénégalais
- [x] Rechercher les flux RSS de médias ouest-africains (RFI Afrique, France24 Afrique, AllAfrica)
- [x] Insérer toutes les sources RSS validées en base de données (13 sources)
- [x] Lancer la synchronisation RSS et vérifier le peuplement du site en articles réels (175 articles)
- [x] Implémenter la synchronisation RSS automatique côté serveur (cron toutes les 30 minutes)
- [x] Supprimer les articles de test de la base de données (6 articles test + 4 breaking news test supprimés)
- [x] Ajouter un endpoint admin pour déclencher manuellement la synchronisation RSS
- [x] Ajouter un indicateur de dernière synchronisation dans l'admin
- [x] Réintégrer le logo PNG transparent original de Weurseuk (header, hero, favicon)
- [x] Créer la page À propos : mission, vision, valeurs, engagement éditorial, équipe, conformité Code de la Presse
- [x] Intégrer la page À propos dans la navigation et les routes
- [x] Rédiger et publier l'éditorial inaugural de Bensirac : analyse stratégique multidisciplinaire Sénégal/Afrique de l'Ouest
- [x] Corriger la génération des URLs d'éditoriaux : uniformiser /editorial/:slug dans tous les scripts et composants
- [x] Ajouter un test vérifiant que les liens breaking news vers un éditorial ne mènent pas à 404 (27 tests passing)
- [x] Nettoyer tous les contenus de test : 4 breaking news test, 2 éditoriaux test, 4 articles test supprimés
- [x] Intégrer les flux RSS YouTube de Evenprod (15 vidéos importées)
- [x] Intégrer les flux RSS YouTube de Marodi TV (15 vidéos importées)
- [x] Créer un composant ShareButtons (WhatsApp, X/Twitter, Facebook, LinkedIn, Telegram)
- [x] Intégrer ShareButtons dans la page EditorialDetail
- [x] Intégrer ShareButtons dans les ArticleCard pour les articles agrégés
- [x] Publier article portrait Bensirac sur Dr Adama Aly Pam avec photo
- [x] Publier article du Dr Adama Aly Pam : "La Bibliothèque universitaire de Dakar et la naissance de l'école de bibliothécaires"


## RESTRUCTURATION ÉDITORIALE (Nouvelle Phase)

### Phase 1 : Architecture Éditoriale
- [x] Concevoir le schéma de base de données complet (rubriques, profils, commentaires, tags)
- [x] Documenter la hiérarchie des rubriques et relations entre entités
- [x] Définir les rôles journalistes et permissions d'accès

### Phase 2 : Base de Données
- [x] Créer table `categories` avec 6 rubriques (Actualité, Politique & Économie, International, Société, Analyses, Éditorial)
- [x] Créer table `journalist_profiles` (profils spécialisés par rubrique)
- [x] Créer table `article_tags` (système d'étiquetage pour Société)
- [x] Créer table `comments` (commentaires modérés avec authentification)
- [x] Ajouter colonnes `category_id` et `journalist_id` à `editorials`
- [x] Migrer les éditoriaux existants vers les catégories appropriées

### Phase 3 : Interface d'Administration
- [x] Ajouter gestion des rubriques (CRUD)
- [x] Ajouter gestion des profils journalistes (CRUD)
- [x] Ajouter gestion des commentaires (modération)
- [x] Ajouter filtrage par rubrique dans la liste des articles
- [x] Ajouter système d'étiquetage pour Société

### Phase 4 : Migration Progressive
- [x] Reclasser les articles RSS en "Actualité" avec source mentionnée
- [x] Placer articles Dr Pam en "Analyses"
- [x] Placer éditoriaux Bensirac en "Éditorial"
- [x] Créer les 5 profils journalistes (noms à fournir)
- [x] Assigner les articles aux profils et rubriques

### Phase 5 : Refonte Navigation
- [x] Créer menu de navigation par rubrique
- [x] Ajouter page d'accueil avec affichage par rubrique
- [x] Créer pages de rubrique avec pagination et filtrage
- [x] Ajouter système de tags visibles en Société (#Éducation, #Santé, #Religion, #Environnement, #FaitsDeSociété)
- [x] Créer page de contact avec 4 emails (contact@, redaction@, commercial@, reclamations@weurseuk.com)

### Phase 6 : Commentaires et Interactions
- [x] Implémenter section commentaires sous chaque article
- [x] Ajouter système de modération des commentaires
- [x] Ajouter authentification pour commentaires
- [x] Créer interface de modération pour administrateurs

### Phase 7 : Tests et Déploiement
- [x] Tester navigation par rubrique
- [x] Tester système de commentaires
- [x] Tester modération
- [x] Vérifier affichage des articles par catégorie
- [x] Créer checkpoint et déployer


## BUGS À CORRIGER

- [x] Bug: Bouton "Analyses" ne redirige pas vers les articles du Dr Pam (CORRIGÉ : Section.tsx utilise maintenant les catégories de la base de données)


## GOOGLE ANALYTICS

- [ ] Configurer adresse email analytics@weurseuk.com via Manus (À FAIRE PLUS TARD - rappel utilisateur)
- [ ] Créer propriété Google Analytics pour weurseuk.com
- [ ] Obtenir Measurement ID (G-XXXXXXXXXX)
- [ ] Intégrer Measurement ID au site (client et serveur)
- [ ] Tester le tracking Google Analytics
- [ ] Vérifier que les événements sont enregistrés correctement


## REFONTE NAVIGATION (FEEDBACK JOURNALISTE SENIOR)

- [x] Centraliser toutes les 6 rubriques dans le même bloc
- [x] Utiliser la même typographie et styling que "Éditoriaux" et "Actualité"
- [x] Créer une hiérarchie visuelle claire et cohérente
- [x] Tester la navigation et vérifier la découverte du contenu

## INTÉGRATION ÉCOLE DE SYNODALITÉ DE DAKAR

- [x] Ajouter flux RSS de l'École de Synodalité de Dakar
- [x] Intégrer à la catégorie "Société"
- [x] Mettre à jour l’horodatage des articles déjà présents lorsqu’ils sont revérifiés par le flux, puis confirmer une ingestion récente de Synodalité en base : 10 articles revérifiés sans erreur le 12/08/2026 à 15:53 UTC


## AGENT ADMINISTRATEUR v2.2 - REVUE DE PRESSE BIQUOTIDIENNE

### Phase 1 : Architecture des Journalistes IA
- [x] Créer configuration des 5 journalistes spécialisés (Awa Diop, Moussa Fall, Aïcha Benali, Ousmane Ndiaye, Fatou Sow)
- [x] Implémenter prompts système pour chaque journaliste avec style spécifique
- [x] Créer service d'invocation des journalistes avec fallback automatique
- [x] Implémenter validation de qualité (longueur, sources, style)

### Phase 2 : Agent Administrateur
- [x] Créer Agent Administrateur pour orchestrer la revue de presse
- [x] Implémenter veille et sélection des sujets avec web_search
- [x] Implémenter invocation des 5 journalistes en parallèle
- [x] Implémenter auto-contrôle qualité avant publication
- [x] Implémenter système de fallback pour pannes

### Phase 3 : Scheduler Biquotidien
- [x] Créer scheduler pour exécution à 07h30 et 14h30 GMT
- [x] Implémenter génération automatique de sessions
- [x] Implémenter validation et publication automatique
- [x] Implémenter tRPC procedures pour invoquer les journalistes
- [x] Intégrer scheduler au démarrage du serveur

### Phase 4 : Correction des Rubriques Centralisées
- [x] Corriger l'affichage des 6 rubriques centralisées en production
- [x] Ajouter fallback des rubriques si API échoue
- [x] Tester affichage en développement et production

### Phase 5 : Tests et Validation
- [x] Vérifier que les rubriques s'affichent correctement
- [x] Vérifier que les journalistes peuvent être invoqués
- [x] Vérifier que le scheduler est actif
- [x] Tester la compilation et le build


## INTERFACE D'ADMINISTRATION

**DÉCISION** : Demander à Manus de développer une interface d'administration générique pour tous les utilisateurs Webdev
- [ ] Soumettre demande de fonctionnalité à Manus (help.manus.im)


## CORRECTIONS CRITIQUES (17/04/2026)

- [x] Auditer l'Agent Administrateur v2.2 : articles n'étaient PAS persistés en DB → CORRIGÉ (admin-agent.ts réécrit avec db.createEditorial)
- [x] Unifier les deux schedulers en conflit → CORRIGÉ (press-review-scheduler.ts réécrit)
- [x] Scheduler v2.2 actif et fonctionnel (07h30 et 14h30 GMT)
- [x] Déplacer les analyses de Dr Pam vers la rubrique "Analyses" (ID 90001 et 90002 → catégorie 30008)
- [x] Réserver la rubrique "Éditorial" exclusivement à Bensirac (ID 60003 → catégorie 30009)
- [x] Publier article PAm (ID 90001) qui était en DRAFT
- [x] Supprimer test editorial (ID 60006) avec categoryId null

## VÉRIFICATIONS POST-CORRECTION (17/04/2026)

- [x] Exécuter manuellement le scheduler v2.2 : 5 articles créés en DB (Fatou Sow, Awa Diop, Moussa Fall, Aïcha Benali, Ousmane Ndiaye)
- [x] Unifier les imports tRPC/routers avec le scheduler actif (tous pointent vers server/journalists)
- [x] Vérifier en production que les articles de Dr Pam apparaissent dans Analyses
- [x] Vérifier en production que Éditorial ne contient que Bensirac
- [x] Confirmer suppression du test editorial ID 60006

## CORRECTIONS URGENTES (17/04/2026 - 2)

- [x] Nettoyer la rubrique Éditorial : filtrage par categoryId 30009 (Bensirac uniquement)
- [x] Corriger les erreurs 404 : page Éditoriaux filtre maintenant par catégorie
- [x] Vérifier que chaque journaliste publie dans sa rubrique respective
- [x] Uniformiser les boutons de rubriques sur la page d'accueil (même style que Éditoriaux/Actualités du hero)

## VÉRIFICATIONS FINALES (17/04/2026)

- [x] Vérifier en base la catégorie de chaque article : TOUTES les catégories sont correctes
  - Actualité (30004): 2 articles (Fatou Sow)
  - Politique & Économie (30005): 4 articles (Awa Diop, Moussa Fall)
  - International (30006): 2 articles (Aïcha Benali)
  - Société (30007): 3 articles (Ousmane Ndiaye + Vues d'Afrique)
  - Analyses (30008): 2 articles (Dr Pam)
  - Éditorial (30009): 1 article (Bensirac uniquement)
- [x] Vérifier dans l'UI : page Éditoriaux filtre par categoryId 30009 (Bensirac seul)
- [x] Corriger imports/exports : supprimé server/jobs/ et server/agents/ (anciens fichiers obsolètes)


## REFONTE PAGE D'ACCUEIL (17/04/2026 - FINAL)

- [x] Remplacer le logo par LOGOTRANSPARENTWEURSEUK.png (header, hero, meta tags, og:image)
- [x] Utiliser ce même logo comme favicon
- [x] Supprimer les boutons "Éditoriaux" et "Actualités" du hero
- [x] Abaisser le bloc logo + phrase "L'information de référence..." dans le hero
- [x] Remonter les 6 boutons de rubriques juste après le hero (Actualité, Politique & Économie, International, Société, Analyses, Éditorial)
- [x] Garder le layout de couverture intact (À la Une, articles, sidebar Éditoriaux + Bensirac)
- [x] Favicon visible dans l'onglet du navigateur


## PARTAGE SOCIAL (19/04/2026)

- [x] Vérifier que ShareButtons reçoit une URL canonique complète dans EditorialDetail et dans les cartes d’articles agrégés, pour Facebook, X, WhatsApp, LinkedIn et Telegram
- [x] Ajouter un test unitaire exécutable couvrant la génération des URLs de partage pour les cinq réseaux
- [x] Auditer des pages représentatives — éditorial, article natif hors éditorial et article agrégé — pour confirmer og:url, og:title et og:image
- [x] Documenter et appliquer une stratégie d’image Open Graph par article ; conserver le logo comme repli technique lorsque l’article ne dispose pas d’image dédiée


## RÈGLE ÉDITORIALE À LA UNE (23/04/2026)

- [x] Dernier éditorial publié affiché à la Une du site (position featured/hero) jusqu'au prochain éditorial
- [x] Éditorial publié dans sa rubrique ET à la Une simultanément
- [x] Intégration Facebook automatique : poster les nouveaux articles natifs sur la page « Abdou Fatah FALL » avec titre, chapeau et lien canonique


## CORRECTIONS SESSION 28/04/2026

- [x] Admin-agent corrigé : utilise les vraies dépêches RSS (pas d'invention de sujets)
- [x] Section "À la Une" ajoutée en page d'accueil : affiche le dernier éditorial publié
- [x] Breaking news "test" désactivées en base de données
- [x] Rendu HTML dans EditorialDetail.tsx (dangerouslySetInnerHTML pour contenu HTML)
- [x] Middleware Open Graph (ogMiddleware.ts) intégré pour partage social
- [x] Partage Facebook corrigé : URL complète de l'article transmise
- [x] Republier article Montréal (ID 120001) dans rubrique Société (pas de rubrique Culture en base)
- [x] Désactiver définitivement le générateur de seeds fictifs — les tests de création utilisent désormais des mocks et n’écrivent plus en base
- [x] Intégration Facebook automatique : jeton validé, file idempotente, tâche planifiée et post de test réussis le 18/08/2026
- [ ] Reconstituer les 5 profils journalistes réels (noms à confirmer)

## ENQUÊTE EXCLUSIVE — ASER (20/08/2026)
- [x] Vérifier les faits, documents et formulations relatifs à l’ASER, à l’ARCOP et à la procédure judiciaire
- [x] Préparer l’enquête « ASER : vingt-cinq ans d’électrification rurale, des engagements inachevés et des capitaux difficiles à suivre » sous la signature d’Abdou Fatah Fall
- [x] Classer l’article en Enquête exclusive, le mettre à la Une et intégrer des références vérifiables
- [x] Obtenir confirmation explicite avant diffusion publique et vérification de l’affichage

## PHOTO DR ADAMA ALY PAM (30/04/2026)

- [x] Uploader la photo du Dr Pam sur le CDN (AdamaAliPAm.png)
- [x] Mettre à jour le profil journaliste Dr Pam en base avec photoUrl (ID 60001)
- [x] Afficher la photo de l'auteur à côté du chapeau dans EditorialDetail.tsx (dynamique selon authorId)

## ÉDITORIAL SAHEL (02/05/2026)

- [x] Extraire et analyser le contenu du PDF editorial_sahel_AbdouFatahFall.pdf (11 pages)
- [x] Corriger erreur TypeScript router n8n ajouté depuis GitHub (virgule manquante)
- [x] Mettre à jour profil Bensirac (ID 30001) : name=Abdou Fatah Fall, photoUrl CDN
- [x] Publier éditorial Sahel (ID 630001) : categoryId=30009, authorId=30001, isFeatured=1
- [x] Dé-featurer les anciens éditoriaux Bensirac avant publication du nouveau

## REFONTE NAVIGATION HEADER (03/05/2026)

- [x] Synchroniser les changements GitHub (suppression ancienne barre de menus)
- [x] Remonter la barre de rubriques comme navigation principale visible sans scroll (header sticky compact, hero 280px)
- [x] Supprimer la section redondante Nos Rubriques de la page d'accueil

## PHOTO AUTEUR CARTE À LA UNE (04/05/2026)

- [x] Afficher la photo de l'auteur (depuis le profil journaliste lié) dans l'espace vide à gauche de la carte À la Une sur la page d'accueil

## REFONTE HERO PAGE D'ACCUEIL (05/05/2026)

- [x] Fusionner hero + carte À la Une en un seul bloc immersif pleine largeur visible sans scroll

## VÉRIFICATION DOMAINE FACEBOOK (06/05/2026)
- [x] Ajouter la balise méta facebook-domain-verification dans le head du site (content: s740xu2sxqhvtjdvo5k9q9mqwjfimd)
- [x] Corriger l’injection de la balise : la balise est présente dans le HTML public de weurseuk.com lors du contrôle du 20/08/2026
- [x] Réassocier weurseuk.com et www.weurseuk.com au déploiement actif : le domaine public est de nouveau accessible et la page d’accueil a été vérifiée le 20/08/2026
- [x] Déployer et vérifier le domaine dans Meta Business Suite
- [x] Guider l’accès de l’administrateur à Business Settings puis à la rubrique Domains
- [x] Fournir un accès direct à la rubrique Meta Domains lorsque le menu Business Settings reste introuvable

## SIGNALEMENT ASSISTANCE — ROUTAGE PUBLIC (18/08/2026)
- [x] Préparer un dossier de signalement avec constats, URLs concernées et captures de preuve
- [x] Fournir le message complet prêt à soumettre à l’assistance Manus
- [x] Obtenir le Page Access Token pour la Page "Abdou Fatah FALL"
- [x] Configurer la publication automatique des éditoriaux sur Facebook — tâche planifiée Weurseuk remplace le webhook n8n

## VIDÉO HERO PAGE D'ACCUEIL (08-09/05/2026)

- [x] Convertir PAGEACCUEILWEURSEUK.MOV en MP4/WebM optimisé pour le web (15Mo, 1080p, H.264)
- [x] Uploader la vidéo sur le CDN (/manus-storage/hero-video_61b2ff3e.mp4)
- [x] Remplacer l'image hero par la vidéo (autoplay, muted, loop) dans Home.tsx
- [x] Créer vidéo crossfade avec ffmpeg xfade (fondu croisé 1.5s entre fin et début)
- [x] Optimiser la vidéo (CRF 28, 12Mo, 18.2s)
- [x] Uploader sur CDN : /manus-storage/hero-video-crossfade-opt_b953971a.mp4
- [x] Intégrer dans Home.tsx avec autoplay, muted, loop, playsInline et poster fallback

## PROCESS IMAGES D'ILLUSTRATION (26/05/2026 - RÈGLE DÉFINITIVE)

- [x] Overlay de survol auteur sur les cartes articles natifs (photo auteur + nom + rôle + accroche)
- [x] authorRole retourné par toutes les fonctions DB (getPublishedEditorials, getLatestNativeEditorials, getEditorialsByCategory)
- [x] Props authorName/authorPhotoUrl/authorRole passées à ArticleCard dans Editoriaux.tsx

## BADGES EXCLUSIF+URGENT (26/05/2026)

- [x] Champ `type` ajouté dans getPublishedEditorials, getLatestNativeEditorials, getEditorialsByCategory, getEditorialBySlug (server/db.ts)
- [x] Badge EXCLUSIF (rouge, point animé) + URGENT (ambre, ⚡) dans ArticleCard.tsx (prop articleType)
- [x] Badge EXCLUSIF+URGENT dans EditorialDetail.tsx (page de lecture, header article)
- [x] Badge EXCLUSIF dans le bloc latestThree de Home.tsx (À la Une)
- [x] articleType={ed.type} passé dans Editoriaux.tsx (sans cast any)
- [x] Éditorial "La recomposition silencieuse" (id 1860001) publié avec type='exclusive'

### Règle permanente — à appliquer à chaque nouvel article natif
1. Demander à Fatah : "Avez-vous une image pour cet article ?"
   - OUI → optimiser (recadrage 16:9) + uploader sur CDN
   - NON → au choix de Fatah :
     a. Générer une image IA thématique **avec filigrane weurseuk.com**
     b. Utiliser la photo de l'auteur en 16:9 (sans filigrane)
2. Filigrane "weurseuk.com" : uniquement sur photos d'auteurs (portraits) ET images IA générées
3. Images fournies par Fatah : sans filigrane (sauf demande explicite)
4. Overlay hover sur les cartes : photo auteur + nom + rôle + accroche (100 chars)

## AMÉLIORATION PARTAGE FACEBOOK (26/05/2026)

- [x] Dialog guide Facebook : copie automatique du texte (titre + auteur + chapeau + lien) avant ouverture de Facebook
- [x] Bouton Facebook ouvre un Dialog avec le texte prêt à coller + instructions en 3 étapes
- [x] Middleware OG corrigé : og:url = URL canonique de l'article (plus /api/og/...)
- [x] Image OG : mapping slug → URL Imgur publique permanente (sans signature CloudFront)
- [x] Image OG éditorial Sonko/Diomaye : https://i.imgur.com/s2BDkNU.jpeg (accessible par Facebook)
- [x] Pour chaque nouvel éditorial : uploader l'image sur Imgur et ajouter dans PUBLIC_OG_IMAGES (ogMiddleware.ts) — À faire pour chaque nouvel article (processus documenté)

## ARTICLE SONKO / DETTE CACHÉE (16/06/2026)

- [x] Transcrire l'audio de l'interview Sonko (RFI/France 24, 15 juin 2026) — 1min41s
- [x] Analyser la transcription : stratégies rhétoriques, implicites, jeu discursif
- [x] Rédiger l'article complet d'analyse politico-linguistique (Bensirac, rubrique Analyses)
- [x] Insérer l'article en base de données (ID 1860007, authorId=30001, categoryId=30008)
- [x] Rédiger la version condensée Facebook (500 mots, accroche percutante, lien Weurseuk)
- [x] Réécrire l'article v2 : glissement sémantique comme axe central, différenciation typographique des intervenants
- [x] Signer l'article du vrai nom : Abdou Fatah FALL (au lieu de Bensirac)
- [x] Intégrer l'extrait vidéo (1:41) dans l'article avec lecteur HTML5 et crédit © RFI / France 24
- [x] Mettre à jour la version Facebook v2
- [x] Remplacer l'espace vide à côté du chapeau par le lecteur vidéo de l'extrait (détection auto si contenu contient .mp4)

## INTÉGRATION VIDÉOS YOUTUBE SÉNÉGAL — GÉNÉRATION DE TRAFIC (16/06/2026)

- [x] Créer la table youtube_channels en base (channelId, name, subscribers, category)
- [x] Créer la table youtube_videos en base (videoId, channelId, title, thumbnail, publishedAt)
- [x] Insérer les 25 plus grandes chaînes YouTube sénégalaises (EvenProd, Pikini, 2STV, Senegal7, Yesdakar, etc.)
- [x] Implémenter le cron de récupération des dernières vidéos via RSS YouTube (toutes les 30 min)
- [x] Créer le composant frontend YouTubeVideoSlot (sidebar + horizontal + grid)
- [x] Intégrer le composant dans la page d'accueil (horizontal après section Musique + sidebar)
- [x] Corriger l'erreur LIMIT MySQL (paramètre interpolé au lieu de prepared statement)
- [x] Tester l'affichage : 234 vidéos synchronisées, 4 vignettes affichées en tendances

## DOSSIER TRAITE NÉGRIÈRE (20/06/2026)

- [x] Publier le dossier "Traite négrière : le temps de solder les comptes" sur Weurseuk
- [x] Insérer en base de données (rubrique Dossiers ID 30010, auteur Pape Amadou Fall ID 60002)
- [x] Corriger attribution auteur : Pape Amadou Fall (pas Abdou Fatah Fall)
- [x] Supprimer mention incorrecte « Dossier rédigé par Abdou Fatah FALL » du contenu HTML
- [x] Corriger bio Pape Amadou Fall : journaliste, historien et écrivain (pas analyste)
- [x] Mettre en featured (À la Une)
- [x] Préparer la version Facebook (en attente — à faire quand Page Access Token disponible)

## PAGE TÉLÉVISION — RTS / TFM / SenTV (21/06/2026)

- [x] Identifier les channel IDs YouTube de RTS (UCdtKKcnU-hHejE2mVVk61kA), TFM (UCRTvsVtErHN7whqmn8sbwvA), SenTV (UClbOJguayTPGnpVVk61kA)
- [x] Créer la page Télévision avec lecteurs YouTube intégrés (live + dernières vidéos)
- [x] Ajouter "Télévision" dans la navigation principale
- [x] Tester l'affichage et déployer

## ARTICLE SÉNÉGAL-FMI : RIGUEUR COMPTABLE (12/07/2026)

- [x] Transcrire et analyser le document AWERSEK-RESTRUCTURATIONDETTE.docx
- [x] Publier l'article "Sénégal-FMI : Le piège de la rigueur comptable face aux impératifs du développement"
- [x] Insérer en base de données (rubrique Dossiers ID 30010, auteur Pape Amadou Fall ID 60002)
- [x] Mettre en featured (À la Une)

## ARTICLE XENOPHOBIE EN AFRIQUE (12/07/2026)

- [x] Transcrire et analyser le texte Pape Fall sur la xenophobie en Afrique du Sud et au Senegal
- [x] Publier l'article "De Pretoria a Dakar : la xenophobie, exutoire d'economies en peine"
- [x] Inserer en base de donnees (rubrique Analyses ID 30008, auteur Pape Amadou Fall ID 60002)
- [x] Mettre en featured (A la Une)


## REDESIGN MODERNE DU SITE (22/07/2026)

- [x] Créer une palette de couleurs moderne : or/charcoal/crème (OKLCH)
- [x] Refactoriser le CSS avec variables OKLCH et animations natives
- [x] Moderniser la typographie : Playfair Display + Inter
- [x] Ajouter des ombres sophistiquées et transitions fluides
- [x] Implémenter animations fade-slide-up et slide-in-right
- [x] Vérifier la responsivité mobile/tablet/desktop
- [x] Conserver l'image de fond signature du site
- [x] Corriger le redesign cassé : approche minimale (variables CSS + Header seulement)
- [x] Navigation uppercase avec soulignement doré actif
- [x] Ajout shadow-sm/md/lg au thème Tailwind 4
- [x] Couleurs or plus profondes (oklch 0.65 0.16 70)
- [x] Typographie Inter avec font-smoothing et kerning
- [x] Transitions cubic-bezier pour les cards hover
- [x] Restaurer les polices d'origine (suppression Inter forcé)
- [x] Corriger le dépassement du header (text-[11px], px-2, sans flex-wrap)
- [x] Moderniser les blocs À la Une : grille 3 colonnes, cards plein-cadre, overlay gradient, badges dorés, zoom hover

## TÂCHES BLOQUÉES EN ATTENTE (À FAIRE PLUS TARD)

### Facebook Automatique (Bloqué - Attente Page Access Token)
- [x] Obtenir et vérifier les droits du Page Access Token pour la Page "Abdou Fatah FALL" : `CREATE_CONTENT` confirmé le 18/08/2026
- [x] Enregistrer le Page Access Token dans un secret sécurisé du projet
- [x] Valider le Page Access Token contre l’API Meta sans effectuer de publication
- [x] Renouveler le Page Access Token : nouveau jeton validé contre l’API Meta le 18/08/2026
- [x] Implémenter le flux de publication automatique des éditoriaux sur Facebook avec confirmation explicite avant le premier post
- [x] Créer une file de publication persistante, idempotente et traçable pour les contenus natifs publiés
- [x] Créer le service serveur Facebook : préparation du message, appel API, journalisation des succès et erreurs
- [x] Ajouter une tâche périodique fiable pour vider la file sans doublon après activation
- [x] Créer un mode d’activation explicite, désactivé par défaut, afin de bloquer le premier post réel
- [x] Ajouter les tests de non-régression du format de publication, de l’idempotence et du blocage avant confirmation
- [x] Sélectionner les nouveaux articles Facebook selon leur date d’insertion, et non leur date éditoriale éventuellement rétrodattée
- [x] Vérifier le domaine dans Meta Business Suite et consigner son statut

## TEST FACEBOOK — FONDS SPÉCIAUX (18/08/2026)
- [x] Activer la diffusion automatique après confirmation explicite de l’administrateur
- [x] Publier en test l’article « Fonds spéciaux au Sénégal : une réforme nécessaire prise en otage »
- [x] Vérifier l’identifiant du post, le lien canonique et l’absence de doublon
- [x] Rétablir l’accès public du domaine : weurseuk.com est accessible et l’enquête ASER a été vérifiée publiquement le 20/08/2026. L’aperçu Meta reste à contrôler séparément après vérification de domaine.

### Processus à Documenter
- [x] Créer un guide pour uploader les images OG sur Imgur pour chaque nouvel éditorial
- [x] Documenter le processus de publication Facebook manuelle en attendant l'automatisation

## REVUE DE PRESSE AHMED AÏDARA — AUTOMATISATION (28/07/2026)
- [x] Analyser l'architecture YouTube existante (cron, table youtube_videos)
- [x] Créer endpoint tRPC `pressReview.getLatest` : récupère la 1ère vidéo de la playlist PLPiTOZE0J9YbxIu1eRdkPLUAA8EbJ5ywa
- [x] Intégrer la sync playlist dans le cron YouTube existant (toutes les 2h)
- [x] Créer section "Revue de presse du jour" sur la page d'accueil avec lecteur YouTube intégré
- [x] Afficher automatiquement la revue la plus récente en Une chaque jour
- [x] Tester et publier

## ENCADRÉ MUSICAL JANGGI — AJUSTEMENT VISUEL (18/08/2026)
- [x] Réduire la hauteur et la largeur visuelle de l’encart musical sur la page d’accueil
- [x] Conserver le lecteur YouTube et les informations éditoriales dans une mise en page compacte
- [x] Vérifier le rendu desktop et mobile, puis publier

## ANALYSE BENSIRAC — CAPTURE LÉGISLATIVE (12/08/2026)
- [x] Publier « Capture législative : la 14ᵉ législature sénégalaise au filtre des faits » sous la signature Bensirac
- [x] Classer l’analyse dans la rubrique Éditoriaux et la mettre à la Une
- [x] Vérifier la signature, le rendu complet et le lien de lecture

## ANALYSE ABDOU FATAH FALL — FONDS SPÉCIAUX (14/08/2026)
- [x] Publier « Fonds spéciaux au Sénégal : une réforme nécessaire prise en otage » sous la signature d’Abdou Fatah Fall
- [x] Classer l’analyse dans la rubrique Analyses et la mettre à la Une
- [x] Vérifier l’affichage, la signature et les boutons de partage

## REFINEMENT DES ARTICLES À LA UNE (12/08/2026)
- [x] Repenser uniquement le graphisme des cartes À la Une dans un style doux, haut de gamme et engageant
- [x] Préserver la compacité, la lisibilité mobile, l’accroche et les données éditoriales existantes
- [x] Vérifier le rendu desktop et mobile, puis publier

## FIABILISATION DU JETON FACEBOOK (20/08/2026)
- [ ] Mettre en place une procédure de renouvellement durable du jeton de la page Facebook et documenter son échéance
- [x] Contrôler périodiquement la validité du jeton de page et alerter avant qu’une publication ne soit bloquée
- [x] Ajouter un endpoint planifié qui valide le jeton et la page Facebook en lecture seule, sans publier de contenu
- [x] Persister l’identifiant de tâche, le dernier contrôle et le dernier diagnostic du jeton Facebook
- [x] Créer une tâche durable exécutant ce contrôle toutes les six heures

## CONFIGURATION UTILISATEUR SYSTÈME META (20/08/2026)
- [ ] Guider la création d’un utilisateur système Meta, l’attribution de la page et de l’application, puis générer un jeton de publication durable
- [ ] Enregistrer, valider et documenter le jeton durable avant de relancer les publications Facebook en attente
- [ ] Ouvrir l’accès direct aux utilisateurs système du portefeuille WeuRSeuK pour effectuer la configuration par le chemin le plus court
- [ ] Atteindre Business Settings depuis l’accueil Meta Business Suite lorsque le lien direct redirige vers la page
- [ ] Passer des paramètres de page aux paramètres du portefeuille WeuRSeuK via le menu de navigation Meta
- [ ] Contourner la redirection vers la page en ouvrant les paramètres avec l’identifiant du portefeuille WeuRSeuK
- [ ] Contrôler dans Meta for Developers si l’application Weurseuk page publisher est reliée au portefeuille et si un droit d’administration manque
- [ ] Examiner les rôles de l’application Weurseuk page publisher avant la création de l’utilisateur système
- [ ] Ouvrir et contrôler la liste des rôles Meta de l’application Weurseuk page publisher
- [x] Confirmer que le compte connecté est Admin de l’application Weurseuk page publisher, gérée par le portefeuille WeuRSeuK

## VALIDATION DU JETON FACEBOOK FOURNI (20/08/2026)
- [x] Enregistrer le jeton communiqué dans le stockage sécurisé, contrôler sa validité et ses droits sans publier de contenu
- [x] Vérifier dans l’Explorateur Meta que le jeton de page Abdou Fatah FALL possède les droits nécessaires, sans créer de publication
- [x] Confirmer dans la réponse `me/accounts` la présence de la tâche `CREATE_CONTENT` pour la page Abdou Fatah FALL
- [x] Identifier un canal de transmission sûr du jeton, distinct du champ sécurisé qui bloque le collage
- [x] Contrôler la nouvelle valeur enregistrée dans Settings par une requête Meta de lecture seule
- [x] Réarmer et publier uniquement l’enquête ASER après confirmation explicite de l’utilisateur

## AUTORISATIONS META POUR PUBLICATION (20/08/2026)
- [x] Générer un jeton de page associé aux permissions `pages_manage_posts` et `pages_read_engagement`, requises par Meta pour publier
- [x] Réenregistrer ce jeton à droits étendus et reprendre la publication ASER autorisée
- [x] Générer un nouveau jeton après la sélection visible des quatre autorisations, puis resélectionner la page Abdou Fatah FALL
- [x] Vérifier le jeton de page avec `me?fields=id,name` plutôt que la requête `me/accounts` réservée au jeton utilisateur
- [x] Recharger et valider côté serveur le nouveau jeton enregistré dans Settings avant la reprise ASER

## PARCOURS META ALTERNATIF (20/08/2026)
- [x] Guider la génération et la vérification manuelle d’un jeton Meta complet lorsque le champ sécurisé ne peut pas être utilisé
- [x] Utiliser un parcours Meta direct car le champ sécurisé n’accepte pas le collage du jeton
- [x] Identifier le chemin de gestion des secrets effectivement visible dans l’interface du projet

## ACCUEIL ET REVUE DE PRESSE FABRICE NGUÉMA (20/08/2026)
- [x] Retirer l’encart vidéo JANGGI de la page d’accueil sans modifier les articles À la Une
- [x] Identifier la chaîne ou la playlist officielle de Fabrice Nguéma consacrée à sa revue de presse
- [x] Automatiser l’import et l’affichage de la revue de presse Fabrice Nguéma selon le modèle Ahmed Aïdara
- [x] Vérifier en production la présence des deux revues, puis publier

## FIABILISATION DE LA SYNCHRONISATION DES REVUES (20/08/2026)
- [x] Migrer l’actualisation YouTube des revues Ahmed Aïdara et Fabrice Nguéma vers une tâche périodique durable et vérifier son exécution

## SECTION TÉLÉVISION — CHAÎNES NATIONALES ET INTERNATIONALES (20/08/2026)
- [x] Vérifier les chaînes et flux officiels de RTS, 2STV, SenTV, TV5MONDE et France 24
- [x] Ajouter les principales chaînes sénégalaises complémentaires à la sélection Télévision
- [x] Réorganiser la section Télévision pour distinguer les chaînes sénégalaises et internationales
- [x] Vérifier le rendu public des lecteurs et publier

## EXTENSION TÉLÉVISION — NOUVELLES CHAÎNES SÉNÉGALAISES (20/08/2026)
- [x] Vérifier les comptes officiels YouTube de iTV, Marodi TV et Evenprod ; identifier Canal Info News comme archive historique non active
- [x] Ajouter ces quatre entrées à la sélection sénégalaise de la page Télévision avec un statut d’archive explicite pour Canal Info News
- [x] Tester les lecteurs, publier et vérifier leur rendu public

## VISIBILITÉ TÉLÉVISION SUR L’ACCUEIL (20/08/2026)
- [x] Ajouter un module compact de sélection Télévision dès la page d’accueil, sans modifier la présentation des articles À la Une
- [x] Rendre les onze sources cliquables vers la rubrique Télévision et vérifier le rendu responsive en production

## COMPACTION DES REVUES DE PRESSE SUR L’ACCUEIL (20/08/2026)
- [x] Réduire l’encombrement des encarts Ahmed Aïdara et Fabrice Nguéma sans retirer les lecteurs ni les liens vidéo
- [x] Vérifier le rendu compact en production, sur mobile et sur ordinateur

## HARMONISATION REVUES ET TÉLÉVISION (20/08/2026)
- [x] Ajuster les deux revues de presse au gabarit compact des écrans Télévision
- [x] Préserver les liens vers les éditions complètes et vérifier le rendu en production

## HIÉRARCHIE ÉDITORIALE DES REVUES QUOTIDIENNES (20/08/2026)
- [x] Positionner les revues de presse Ahmed Aïdara et Fabrice Nguéma avant les vidéos tendances sur l’accueil
- [x] Vérifier l’ordre en production sans modifier la Une ni les formats compacts

## GALERIE TÉLÉVISION SUR L’ACCUEIL (20/08/2026)
- [x] Positionner la Télévision immédiatement sous les deux revues de presse quotidiennes
- [x] Afficher des écrans vidéo compacts à partir des sources officielles des chaînes sélectionnées
- [x] Tester la galerie de lecteurs et publier

## FORMAT COMPACT TÉLÉVISION (20/08/2026)
- [x] Aligner les encarts Télévision sur la densité et le format des vidéos tendances
- [x] Réduire la hauteur du module afin de remonter les dépêches sur l’accueil
- [x] Vérifier le rendu compact en production sans modifier l’ordre des revues

## COMPOSITION TÉLÉVISION ET DÉPÊCHES (20/08/2026)
- [x] Répartir les écrans Télévision dans deux colonnes latérales autour des dépêches centrales
- [x] Positionner le flux des dernières dépêches juste après la Une sur ordinateur tout en préservant les revues quotidiennes
- [x] Vérifier la lecture des écrans et les liens, puis publier

## ÉQUILIBRE DES COLONNES TÉLÉVISION (20/08/2026)
- [x] Ajouter Marodi TV et Evenprod pour afficher trois écrans de chaque côté des dépêches
- [x] Préserver les dimensions compactes et vérifier la nouvelle composition en production

## SYNTHÈSE DE VEILLE BENSIRAC À LA UNE (20/08/2026)
- [x] Réaliser une veille croisée des grands médias et sélectionner le sujet dominant du jour
- [x] Vérifier les faits à partir de sources primaires et de médias de référence
- [x] Rédiger une synthèse native signée Bensirac avec références vérifiables
- [x] Retirer l’article actuellement à la Une, publier la synthèse dans Éditoriaux et vérifier son affichage public
- [x] Ajouter une illustration dont les droits de réutilisation et le crédit sont explicitement indiqués

## REMPLACEMENT COMPACT DE LA CARTE CROISE TTE (20/08/2026)
- [x] Retirer « Sur la Croisette, une voix venue de Dakar » de la section À la Une secondaire, sans modifier le bloc éditorial supérieur
- [x] Présenter la synthèse Bensirac dans la carte et le gabarit propres à la section À la Une
- [x] Vérifier la nouvelle carte À la Une en production

## PROTOCOLE DE SYNTHÈSE SOURCÉE À LA UNE (20/08/2026)
- [x] Exiger au moins deux sources indépendantes ou une source primaire pour chaque fait publié dans une synthèse
- [x] Distinguer explicitement les faits établis, les déclarations attribuées et les éléments non confirmés
- [x] Publier les sources consultées et ne retenir à la Une qu’une synthèse satisfaisant ce protocole
