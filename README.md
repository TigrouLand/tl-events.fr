# Events - Stats
Site permettant aux joueurs de voir différentes statistiques des events.

## 🚀 Déploiement

- **Client** : le client est construit et déployé de manière autonome à chaque commit par le biais de [CloudFlare Pages](https://pages.cloudflare.com/) qui nous permet de bénéficier d'une très haute disponibilité et stabilité ainsi que d'une faible latence.
- **Serveur** : le serveur est construit via les GitHub Actions qui publient à chaque commit une nouvelle image Docker, disponible sur [Docker Hub](https://hub.docker.com/r/romitou/eventsstats/tags?page=1&ordering=last_updated). Cette image est automatiquement déployée toutes les heures sur notre serveur si une nouvelle image existe.
