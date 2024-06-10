# Docker Compose

[Docker Compose](https://docs.docker.com/compose/) permet de lancer un ensemble de conteneurs Docker en même temps. Il est utile pour les applications nécessitant plusieurs conteneurs.

## Utilisation de Docker Compose

| Commande                            | Description                                  |
|-------------------------------------|----------------------------------------------|
| `docker-compose up`                 | Déployer l'application                       |
| `docker-compose down`               | Arrêter les services et conteneurs           |
| `docker-compose restart`            | Redémarrer les services                      |
| `docker-compose ps`                 | Afficher les informations sur les conteneurs |
| `docker-compose up --scale web=3`   | Mettre à l'échelle un service                |
| `docker-compose logs <service>`     | Obtenir les logs d'un service                |

## Fichier `docker-compose.yml`

Ce fichier contient les configurations nécessaires pour l'exécution de vos conteneurs. Voici un exemple de structure :

| Élément             | Description                                                                                  |
|---------------------|----------------------------------------------------------------------------------------------|
| `version`           | Indique la version de Docker Compose utilisée                                                |
| `services`          | Définit les différents conteneurs de l'application                                           |
| `networks`          | Définit comment les services communiquent entre eux                                          |
| `volumes`           | Spécifie les volumes montés dans les conteneurs                                              |
| `configs`           | Gère les configurations injectées dans les conteneurs                                        |
| `secrets`           | Gère les secrets injectés dans les conteneurs                                                |
| `variables d'environnement` | Permet de définir des variables pour configurer le comportement des applications       |

### Exemple

```yaml
version: '3'
services:
  frontend:
    image: example/webapp
    ports:
      - "443:8043"
    networks:
      - front-tier
      - back-tier
    configs:
      - httpd-config
    secrets:
      - server-certificate

  backend:
    image: example/database
    volumes:
      - db-data:/etc/data
    networks:
      - back-tier

volumes:
  db-data:
    driver: flocker
    driver_opts:
      size: "10GiB"

configs:
  httpd-config:
    external: true

secrets:
  server-certificate:
    external:

 true

networks:
  front-tier: {}
  back-tier: {}
```