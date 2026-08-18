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
