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
- [ ] Synchronisation des articles (bloquée par protection DDoS du site - à revoir plus tard)


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

- [ ] Corriger les boutons de partage : l'URL complète de l'article doit être transmise (Facebook, Twitter, WhatsApp, LinkedIn, Telegram)
- [ ] Vérifier les méta-données Open Graph (og:url, og:title, og:image) pour chaque article


## RÈGLE ÉDITORIALE À LA UNE (23/04/2026)

- [x] Dernier éditorial publié affiché à la Une du site (position featured/hero) jusqu'au prochain éditorial
- [x] Éditorial publié dans sa rubrique ET à la Une simultanément
- [ ] Intégration Facebook automatique : poster l'éditorial sur la page "Abduul Fatah" avec titre + chapeau


## CORRECTIONS SESSION 28/04/2026

- [x] Admin-agent corrigé : utilise les vraies dépêches RSS (pas d'invention de sujets)
- [x] Section "À la Une" ajoutée en page d'accueil : affiche le dernier éditorial publié
- [x] Breaking news "test" désactivées en base de données
- [x] Rendu HTML dans EditorialDetail.tsx (dangerouslySetInnerHTML pour contenu HTML)
- [x] Middleware Open Graph (ogMiddleware.ts) intégré pour partage social
- [x] Partage Facebook corrigé : URL complète de l'article transmise
- [x] Republier article Montréal (ID 120001) dans rubrique Société (pas de rubrique Culture en base)
- [ ] Désactiver définitivement le générateur de seeds fictifs
- [ ] Intégration Facebook automatique (en attente du Page Access Token)
- [ ] Reconstituer les 5 profils journalistes réels (noms à confirmer)

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
