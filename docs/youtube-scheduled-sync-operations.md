# Synchronisation durable des revues de presse YouTube

## Périmètre

La tâche périodique **weurseuk-youtube-sync** appelle le point d’exécution protégé `/api/scheduled/youtube-sync` toutes les deux heures, à l’heure pleine, en temps universel. Elle actualise les vidéos tendances du portail ainsi que les deux émissions de revue de presse visibles en page d’accueil.

| Programme | Source | Règle de sélection | État contrôlé le 20 août 2026 |
|---|---|---|---|
| Ahmed Aïdara | Playlist officielle 2A TV | Première vidéo de la playlist dédiée | Édition du 20 août disponible : `oZ9iNkcvJ2U` |
| Fabrice Nguéma | Flux RSS officiel SenTV / D-Media | Titre contenant à la fois le nom du présentateur et « revue de presse » ou « revue des titres » | Édition du 20 août disponible : `aqwbX-ZyPcQ` |

## Garanties d’exploitation

Le point d’exécution n’accepte que la tâche planifiée dont l’identifiant est enregistré dans la table `youtube_sync_settings`. Un appel externe est refusé. Les importations reposent sur des identifiants YouTube uniques ; une relance n’ajoute donc pas de doublon.

Le traitement réel a été exécuté le 20 août 2026 avec succès : deux vidéos tendances supplémentaires ont été synchronisées, et les dernières éditions d’Ahmed Aïdara comme de Fabrice Nguéma ont été retrouvées sans créer de nouveau doublon. La tâche durable est activée avec une cadence de deux heures.
