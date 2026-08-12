# Audit du partage social — 12 août 2026

## Éditorial de référence

La page de l’analyse « Capture législative : la 14ᵉ législature sénégalaise au filtre des faits » expose les cinq boutons attendus : WhatsApp, X, Facebook, LinkedIn et Telegram.

Les appels de partage contrôlés dans l’aperçu ne contiennent aucune route interne `/api/og/`. Les boutons WhatsApp, X, LinkedIn et Telegram produisent des liens encodés contenant le chemin canonique de l’éditorial. Le bouton Facebook ouvre son guide de publication, qui s’appuie désormais sur la même URL canonique dans le code source.

Les balises Open Graph du domaine de production retournent un `og:title`, un `og:description`, un `og:url` canonique et une `og:image` de repli publique. Une stratégie distincte d’image par article reste à documenter pour enrichir les aperçus lorsqu’une illustration dédiée est disponible.

La page de production `https://weurseuk.com/editorial/capture-legislative-14e-legislature-senegalaise-filtre-des-faits` a également été chargée avec succès le 12 août 2026 : titre, signature Bensirac, contenu complet et cinq boutons de partage sont présents.

## Extension de couverture

Le middleware Open Graph couvre désormais les rubriques natives — notamment `politique-economie`, `analyses`, `essai` et `dossiers` — ainsi que les routes internes `/article/:slug` des contenus agrégés. Le contrôle par robot social a confirmé, dans l’aperçu, des balises spécifiques pour :

- l’éditorial **Capture législative** ;
- l’analyse **Oléagineux : le protectionnisme occidental sous le voile de la vertu écologique** ;
- l’article agrégé **Sur la Croisette, une voix venue de Dakar**.

Les articles agrégés utilisent leur `imageUrl` publique lorsqu’elle est disponible ; les autres contenus conservent le logo Weurseuk comme repli sûr. La suite de non-régression compte désormais **34 tests réussis**, dont trois dédiés aux contrats de partage et Open Graph.

Après extraction de la logique de partage dans `client/src/lib/shareUrls.ts`, cinq tests unitaires exécutables vérifient désormais les URLs finales de WhatsApp, X, Facebook, LinkedIn et Telegram. La suite complète compte **40 tests réussis**.
