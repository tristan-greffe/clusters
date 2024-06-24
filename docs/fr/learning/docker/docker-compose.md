# Docker Compose

[Docker Compose](https://docs.docker.com/compose/) permet de **lancer un ensemble de conteneurs Docker** en même temps. Il est utile pour les applications nécessitant plusieurs conteneurs.

![docker-compose](/learning/docker/docker-compose.png)

## Instructions `docker-compose.yml`

| Instruction | Description |
|-------------|-------------|
| `version` | Indique la version de Docker Compose utilisée |
| `services`| Définit les différents conteneurs de l'application |
| `networks`| Définit comment les services communiquent entre eux |
| `volumes` | Spécifie les volumes montés dans les conteneurs |
| `configs` | Gère les configurations injectées dans les conteneurs |
| `secrets` | Gère les secrets injectés dans les conteneurs |
| `variables d'environnement` | Permet de définir des variables pour configurer le comportement des applications |

## Commandes essentielles

| Commande                            | Description                                  |
|-------------------------------------|----------------------------------------------|
| `docker-compose up`                 | Déployer l'application                       |
| `docker-compose down`               | Arrêter les services et conteneurs           |
| `docker-compose restart`            | Redémarrer les services                      |
| `docker-compose ps`                 | Afficher les informations sur les conteneurs |
| `docker-compose up --scale web=3`   | Mettre à l'échelle un service                |
| `docker-compose logs <service>`     | Obtenir les logs d'un service                |