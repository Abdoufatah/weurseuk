# Exploitation des sources RSS

## Contrôle du 24 août 2026

Un contrôle direct des seize sources actives a identifié deux flux renvoyant une réponse HTTP `403` et une page HTML au lieu d’un flux XML : **Sud Quotidien** et **École de Synodalité de Dakar**. Le comportement est resté identique avec un en-tête de navigateur standard et un référent explicite ; il s’agit donc d’un blocage côté source, non d’une erreur de lecture locale.

Ces deux sources ont été **désactivées temporairement**, sans suppression des articles déjà importés. Les quatorze autres flux ont ensuite été synchronisés réellement : chacun a été analysé sans erreur et les contenus connus ont été marqués comme vérifiés.

| Source temporairement isolée | Motif | Condition de réactivation |
| --- | --- | --- |
| Sud Quotidien | Flux `/feed/` répond en `403` | Réactiver après confirmation d’un endpoint RSS public accessible |
| École de Synodalité de Dakar | Flux `/feed/` répond en `403` | Réactiver après levée du blocage ou fourniture d’un nouveau flux officiel |

## Diagnostic futur

Le journal de synchronisation indique désormais le **nom exact de la source** et son diagnostic lorsqu’un flux échoue. Une anomalie ultérieure peut donc être identifiée sans interrompre les autres médias.
