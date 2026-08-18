# Référence — Publication Weurseuk sur Facebook

La configuration Meta **« Tout gérer sur votre Page »** est celle retenue pour la page Facebook *Abdou Fatah FALL*. Le 18 août 2026, la réponse officielle de l’API a confirmé les tâches `CREATE_CONTENT`, `MANAGE`, `MODERATE`, `MESSAGING`, `ANALYZE` et `ADVERTISE` pour cette page.

La documentation Meta Pages API indique que la publication nécessite un Page Access Token, ainsi que les permissions `pages_show_list`, `pages_manage_posts`, `pages_read_engagement` et `pages_manage_metadata`. Un post est envoyé par `POST /{page-id}/feed` avec un message et un lien. Les appels doivent rester côté serveur et le jeton ne doit jamais être inclus dans le client.

Le premier post réel exige une confirmation explicite de l’administrateur du portail. La file de publication doit être idempotente : un même éditorial ne peut produire qu’un seul post Facebook, même en cas de relance de tâche.

## Sources officielles

1. [Meta — Pages API: Get Started](https://developers.facebook.com/documentation/pages-api/getting-started)
2. [Meta — Manage a Page](https://developers.facebook.com/documentation/pages-api/manage-pages)
3. [Meta — Publish Page Posts](https://developers.facebook.com/documentation/pages-api/posts)
4. [Meta — Manage everything on your Page Use Case](https://developers.facebook.com/documentation/development/create-an-app/pages-use-case)
