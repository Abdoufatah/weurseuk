# Publication Facebook — durée et renouvellement du jeton

## Constat du 20 août 2026

La publication automatique de l’enquête ASER a été refusée par l’API Meta car le jeton alors enregistré était expiré lors du contrôle du 20 août 2026. Cette situation ne remet pas en cause la publication de l’article sur Weurseuk, qui est accessible publiquement ; elle bloque uniquement la diffusion sur la page Facebook.

## Règle de fonctionnement

Un jeton ne doit pas être créé pour chaque article. Le service Weurseuk conserve le même jeton et l’utilise pour toutes les publications, jusqu’à son expiration ou à son invalidation par Meta.

| Solution | Durée | Conséquence opérationnelle |
|---|---:|---|
| Jeton utilisateur de courte durée | Environ une à deux heures | À éviter pour l’automatisation : renouvellement fréquent et fragile. |
| Jeton utilisateur de longue durée | Environ soixante jours | À renouveler avant l’échéance ; le jeton de page issu de ce flux n’a pas d’échéance par défaut, mais peut être invalidé si les droits, le mot de passe ou les paramètres de sécurité changent. |
| Jeton d’utilisateur système Meta | Permanent ou soixante jours selon l’option choisie | Le plus adapté à un service serveur. Meta recommande les jetons à durée limitée avec rotation avant l’échéance pour réduire le risque de compromission. |

## Recommandation technique

Pour une automatisation durable, rattacher la page et l’application Meta au même portefeuille professionnel, créer un utilisateur système limité à la publication, puis lui attribuer uniquement les droits nécessaires — notamment `pages_manage_posts`, `pages_read_engagement` et `pages_show_list`. Le jeton peut être non expirant si les contraintes du portefeuille l’autorisent. L’option de sécurité recommandée reste un jeton système à soixante jours, renouvelé côté serveur avant expiration avec l’identifiant et le secret de l’application.

Cette configuration implique une intervention unique dans l’espace professionnel Meta : elle ne doit pas être répétée à chaque republication d’article.

## Validation d’un jeton de page — 20 août 2026

Le jeton de page nouvellement enregistré a été vérifié dans l’Explorateur de l’API Graph et côté serveur avec une requête de lecture seule vers `v26.0/me?fields=id,name`. Il identifie la page **Abdou Fatah FALL** (ID `1169698876216799`). Une requête `me/accounts?fields=id,name,tasks`, réalisée avec le jeton utilisateur associé, a également confirmé la tâche **`CREATE_CONTENT`** pour cette page.

Cette vérification confirme que le jeton est utilisable pour la page et que le droit de publication est présent. Elle ne constitue toutefois pas, à elle seule, une preuve de durée non expirante : la migration vers un utilisateur système reste la solution recommandée pour une autonomie de long terme.

## Surveillance préventive toutes les six heures

Le portail dispose d’un contrôle périodique distinct de la file de publication. Toutes les six heures, il adresse à l’API Graph une requête de **lecture seule** sur l’identifiant de page configuré (`/{pageId}?fields=id,name`). Ce contrôle ne consulte ni n’alimente la file de publication et ne peut donc publier aucun contenu.

Le résultat — date du contrôle, statut et diagnostic limité — est conservé dans les réglages Facebook du projet. En cas de refus du jeton, d’absence de configuration ou d’échec réseau, une alerte est adressée au propriétaire du projet. L’alerte rappelle qu’aucune publication n’a été tentée et invite à renouveler le jeton dans les réglages sécurisés, avant qu’une publication éditoriale ne soit bloquée.

Cette surveillance réduit le délai de détection ; elle ne remplace pas le renouvellement du jeton ni la solution à plus long terme fondée sur un utilisateur système Meta.

## Limite d’accès aux utilisateurs système

Meta précise que les utilisateurs système se créent dans **Settings → Users → System users** du portefeuille professionnel, mais que tous les portefeuilles n’y ont pas nécessairement accès. Les essais du 20 août 2026 ont confirmé l’administration de l’application par le portefeuille **WeuRSeuK** et le rôle Admin de l’utilisateur dans l’application ; l’interface Business Suite a néanmoins redirigé vers les paramètres de la page au lieu d’exposer la rubrique d’utilisateurs système. La création devra être reprise uniquement si le portefeuille fait apparaître cette rubrique ou après attribution explicite d’un rôle d’administrateur du portefeuille.

## Références

1. [Meta Business Help Center — Add system users to your business portfolio](https://www.facebook.com/business/help/503306463479099)
2. [Meta Business Help Center — About system users in Meta Business Suite](https://www.facebook.com/business/help/327596604689624)

## Sources officielles

1. [Meta for Developers — Long-Lived Access Tokens](https://developers.facebook.com/documentation/facebook-login/guides/access-tokens/get-long-lived)
2. [Meta for Developers — System Users: Install Apps, Generate, Refresh, and Revoke Tokens](https://developers.facebook.com/docs/business-management-apis/system-users/install-apps-and-generate-tokens/)
