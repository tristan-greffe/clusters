# Dockerfile

Pour créer une image, il suffit de **créer un fichier [Dockerfile](https://docs.docker.com/reference/dockerfile/)** dans un dossier et d'**exécuter la commande `docker build`** dans ce dossier.

![dockerfile](/learning/docker/dockerfile.png)

## Instructions Dockerfile

| Instruction | Description |
|----------|-------------|
| `FROM` | Choisir l'image de base (e.g., `FROM ubuntu:latest`) |
| `RUN` | Exécuter une commande bash (e.g., `RUN apt-get update`) |
| `ADD` | Copier un fichier depuis la machine hôte vers l'image |
| `WORKDIR` | Changer le dossier courant |
| `EXPOSE` | Exposer un port du conteneur |
| `CMD` | Spécifier la commande exécutée au démarrage |
| `ENTRYPOINT` | Définir le point d'entrée du conteneur |
| `ENV` | Définir des variables d'environnement |
| `VOLUME` | Créer des points de montage |
| `LABEL` | Ajouter des métadonnées à l'image |


## Commandes essentielles

```bash
# Créer l'image
docker image build . -t my_image:latest

# Sauvegarder l'image dans une archive
docker image save --output my_docker_image.tar my_image

# Charger une image depuis une archive
docker image load --input my_docker_image.tar

# Poussez l'image vers DockerHub
docker image push username/my_image:tag
```