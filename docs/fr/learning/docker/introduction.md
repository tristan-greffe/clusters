# Introduction à Docker

Docker est un outil basé sur [containerd](https://containerd.io/) qui facilite la création et la gestion des conteneurs. Créé par [dotCloud](https://dotcloud.co.za/), il est géré par l'Open Container Initiative de la Linux Foundation.

## Fonctionnement de Docker

Docker utilise une architecture client-serveur :

![Docker Operation](/docker-operation.png)

| Composant | Description |
|-----------|-------------|
| **Client** | Interface en ligne de commande (**docker-cli**) qui interagit avec le démon Docker via une API REST. Peut également inclure [Docker Desktop](https://docs.docker.com/desktop/) ou [Client Python](https://docker-py.readthedocs.io/en/stable/index.html) |
| **Docker Daemon** | Gère la construction, la gestion des images et le lancement des conteneurs |
| **Docker Registries**  | Répertoires d'images, comme [DockerHub](https://hub.docker.com/), ou des registres privés pour les entreprises. |