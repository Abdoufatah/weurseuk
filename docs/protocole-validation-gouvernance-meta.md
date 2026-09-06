# Protocole de validation — gouvernance éditoriale et accès Meta

Les protections éditoriales et l’accès à une API tierce ne relèvent pas du même niveau de contrôle. Une expiration, une révocation ou une modification de droits côté Meta ne doit jamais masquer une régression du contrôle d’arbitrage des éditoriaux ; inversement, le succès des tests unitaires internes ne garantit pas la validité du jeton de page.

| Contrôle | Commande | Attendu | Dépendance externe |
| --- | --- | --- | --- |
| Gouvernance éditoriale | `pnpm test:editorial-governance` | Tous les tests passent : validation explicite de Fatah, signature attendue, protection de la grande Une, brouillons automatisés non publiants. | Aucune |
| Jeton Meta | `pnpm test:meta-token` | Les deux tests passent seulement si le jeton de Page actif est accepté par Meta. | API Meta et secret actif |
| Suite complète | `pnpm vitest run server` | Les échecs Meta éventuels sont analysés séparément ; tout échec de gouvernance est bloquant. | Partielle |

> Un code `190` retourné par Meta correspond à un jeton invalide ou expiré. Cet échec doit conduire à la mise à jour contrôlée du secret, puis à l’exécution de `pnpm test:meta-token`. Il ne remet pas en cause à lui seul la publication déjà réussie d’un contenu ni l’intégrité des garde-fous éditoriaux.

Avant un checkpoint relatif à la gouvernance, la commande `pnpm test:editorial-governance` est la preuve interne obligatoire. Le contrôle Meta est exécuté indépendamment lors d’un changement de jeton, d’une panne de partage ou avant toute reprise de publication autorisée.
