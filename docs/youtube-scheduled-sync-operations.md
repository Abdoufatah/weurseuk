# Synchronisation durable des revues de presse YouTube

## Périmètre

La tâche périodique active appelle le point d’exécution protégé `/api/scheduled/youtube-sync` toutes les deux heures, à l’heure pleine, en temps universel. Elle actualise les vidéos tendances du portail ainsi que les deux émissions de revue de presse visibles en page d’accueil.

| Programme | Source | Règle de sélection | État contrôlé le 20 août 2026 |
|---|---|---|---|
| Ahmed Aïdara | Playlist officielle 2A TV | Première vidéo de la playlist dédiée | Édition du 20 août disponible : `oZ9iNkcvJ2U` |
| Fabrice Nguéma | Flux RSS officiel SenTV / D-Media | Titre contenant à la fois le nom du présentateur et « revue de presse » ou « revue des titres » | Édition du 20 août disponible : `aqwbX-ZyPcQ` |

## Garanties d’exploitation

Le point d’exécution n’accepte que la tâche planifiée dont l’identifiant est enregistré dans la table `youtube_sync_settings`. Un appel externe est refusé. Les importations reposent sur des identifiants YouTube uniques ; une relance n’ajoute donc pas de doublon.

Le traitement réel a été exécuté le 20 août 2026 avec succès : deux vidéos tendances supplémentaires ont été synchronisées, et les dernières éditions d’Ahmed Aïdara comme de Fabrice Nguéma ont été retrouvées sans créer de nouveau doublon. La tâche durable est activée avec une cadence de deux heures.

## Relève de maintenance — 22 octobre 2026

Après une période de suspension du site, les exécutions historiques de la tâche avaient parfois reçu une page « Site Unavailable » avec un code HTTP 200. Ce résultat ne correspondait pas à une synchronisation effective : la dernière écriture en base datait du 8 octobre.

La reprise manuelle contrôlée du 22 octobre a importé **133 vidéos**, dont l’édition du jour d’Ahmed Aïdara (`R1FI9AO9zTg`) et celle de Fabrice Nguéma (`E789wxxnqt4`), sans erreur d’importation. L’ancien déclencheur a été remplacé par la tâche persistante **weurseuk-youtube-sync-20261022** (`KxfBZZ6vWy6gWRwWRhEtTW`), enregistrée dans `youtube_sync_settings`. L’opération n’a provoqué aucune publication éditoriale ni action Facebook.
