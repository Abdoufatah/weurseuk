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

- [ ] Configurer adresse email analytics@weurseuk.com via Manus
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
