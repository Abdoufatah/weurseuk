# Suivi du flux — École de Synodalité de Dakar

Le 12 août 2026, le flux RSS `https://www.ecole-de-synodalite-de-dakar.synobs-africa.org/feed/` a répondu avec le statut HTTP 200 et le type `application/rss+xml` depuis l’environnement de synchronisation Weurseuk. La source est active dans la rubrique Société et son horodatage de récupération a été actualisé par le cron.

La base contient déjà des articles réels issus de ce flux, notamment le séminaire de réception et de dissémination du document final du Synode. Le blocage historique associé à une protection DDoS n’est donc plus reproductible au moment du contrôle.

Une synchronisation ciblée a été exécutée le 12 août 2026 à 15:50 UTC. Son résultat est sans erreur et sans nouvelle entrée, ce qui confirme que le flux a été lu intégralement et que ses vingt éléments les plus récents sont déjà présents ou inchangés. Le champ `lastFetchedAt` de la source active a été mis à jour à `2026-08-12 15:50:14`.

Le mécanisme de synchronisation a ensuite été renforcé : chaque élément déjà connu et revu dans un flux actualise désormais son champ `fetchedAt`, sans créer de doublon. Une seconde synchronisation ciblée a revérifié **10 articles** de l’École de Synodalité sans erreur. Les enregistrements concernés portent maintenant un `fetchedAt` compris entre `2026-08-12 15:53:03` et `15:53:05`, ce qui apporte la preuve complète de reprise : récupération, traitement et mise à jour en base.
