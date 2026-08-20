# Publication Facebook — exploitation Weurseuk

## État initial sécurisé

Le moteur de publication est déployé et relié à la page **Abdou Fatah FALL**. La tâche durable `weurseuk-facebook-publisher` consulte la file toutes les cinq minutes. Au 18 août 2026, l’option de diffusion est explicitement désactivée : `isEnabled = false`, `firstPostConfirmed = false` et aucune publication n’est en file.

Cette position protège les publications antérieures : seul un éditorial publié **après** l’heure d’activation est admissible à la file. Chaque éditorial possède une ligne unique dans `facebook_publication_jobs`, ce qui exclut les doublons lors des relances.

## Format d’un post

Le post comprend le titre, le chapeau, la signature éditoriale et l’URL canonique Weurseuk. Les signatures d’alias sont respectées lorsque l’article active son alias. L’URL fournie à Facebook laisse la plateforme récupérer l’aperçu Open Graph du site.

## Première activation

L’administrateur doit confirmer explicitement la première diffusion. À cette seule condition, l’activation consignera l’heure de départ et les nouveaux articles natifs publiés après cette heure seront envoyés par la tâche planifiée. Aucun contenu historique ne sera publié automatiquement.

## Contrôle et reprise

Chaque tentative est journalisée avec son statut, le message préparé, l’URL cible, le compteur d’essais, l’identifiant du post Facebook ou l’erreur retournée par Meta. Une ligne `published` ne peut pas être publiée à nouveau. Les erreurs restent visibles sous le statut `failed` pour un traitement ultérieur.

## Validation du 18 août 2026

Après confirmation explicite de l’administrateur, l’article **« Fonds spéciaux au Sénégal : une réforme nécessaire prise en otage »** a été publié en test. La file contient une seule ligne pour cet éditorial, au statut `published`, avec un seul essai réussi et aucune erreur. Le post Meta a été retrouvé par l’API après publication ; il pointe bien vers l’URL canonique de l’analyse Weurseuk. La diffusion automatique est maintenant active pour les futurs articles natifs publiés après l’heure d’activation.

La tâche durable `weurseuk-facebook-publisher` a ensuite exécuté son premier passage autonome avec le statut `success` le 18 août 2026 à 17:30 UTC. La file étant vide après le test, cette exécution n’a envoyé aucun doublon ; elle confirme que l’automatisation planifiée atteint correctement le serveur de production.

## Publication de l’enquête ASER — 20 août 2026

Après le remplacement du jeton expiré et le contrôle du jeton de page **Abdou Fatah FALL**, l’administrateur a confirmé explicitement la relance ciblée de l’enquête ASER. La file a été réarmée uniquement pour l’article concerné ; les autres travaux historiques en échec n’ont pas été relancés.

La publication a abouti au statut `published` le 20 août 2026 à 13:50:59 UTC, avec l’identifiant Meta `1169698876216799_122121882993311185`. Le compteur d’essais est de trois, correspondant aux deux échecs causés par l’ancien jeton et à la tentative réussie après renouvellement. L’unicité de la ligne de file assure l’absence de doublon pour cet article.
