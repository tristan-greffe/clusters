# Manipulation de Conteneurs et d'Images

## Démarrer Docker

```bash
sudo service docker start
```

## Gestion des images Docker 

### Télécharger une image

```bash
docker image pull ubuntu:latest
```

### Liste des images disponibles

```bash
docker image ls
```

- **Informations Affichées**:
  - `REPOSITORY`: Nom de l'image
  - `TAG`: Étiquette pour différencier les versions
  - `IMAGE ID`: Identifiant unique
  - `CREATED`: Date de création
  - `SIZE`: Taille

### Supprimer une image

```bash
docker image rm <IMAGE ID>
```

## Gestion des conteneurs Docker

### Lancer un conteneur

```bash
docker container run ubuntu:latest
```

- **Processus**:
  - `docker-cli` demande au démon Docker de lancer un conteneur basé sur `ubuntu:latest`.
  - Le démon télécharge l'image depuis DockerHub si elle n'est pas disponible localement.
  - Le conteneur est lancé et produit une sortie.

### Lister les conteneurs

| Commande                          | Description                            |
|-----------------------------------|----------------------------------------|
| `docker container ls`             | Lister les conteneurs en fonctionnement |
| `docker container ls --all`       | Lister tous les conteneurs             |

- **Informations Affichées** :
  - `CONTAINER ID`: Identifiant unique
  - `IMAGE`: Nom de l'image utilisée
  - `COMMAND`: Commande exécutée
  - `CREATED`: Date de lancement
  - `STATUS`: Statut du conteneur
  - `PORTS`: Tunnels réseau
  - `NAMES`: Nom du conteneur

### Lancer un conteneur

| Argument              | Utilisation                                                |
|-----------------------|------------------------------------------------------------|
| -it ou --interactive  | Interaction avec le conteneur                              |
| -d ou --detach        | Lancer en arrière-plan                                     |
| -n ou --name          | Nommer le conteneur                                        |
| --rm                  | Supprimer le conteneur après arrêt                         |
| -e                    | Définir une variable d'environnement                       |
| -p                    | Redirection de port                                        |
| --mount               | Monter un volume sur un conteneur (type=volume,src=src_volume,dst=/path_in_container) |

```bash
docker container run -it --rm --name my_ubuntu -e "ma_variable=bonjour_le_monde" ubuntu:latest bash

# Rediriger les ports 9200 et 9300 du container vers les ports 9201 et 9301 de la machine hôte
docker container run -d --rm -p 9201:9200 -p 9301:9300 ubuntu:latest

# Avec un volume
docker container run -it --name my_ubuntu --mount type=volume,src=my_volume,dst=/home/my_folder --rm ubuntu:latest bash
```

### Gestion des conteneurs

| Commande                                 | Description                                  |
|------------------------------------------|----------------------------------------------|
| `docker container start <ID or NAME>`    | Relancer un conteneur arrêté                 |
| `docker container start -a <ID or NAME>` | Relancer un conteneur avec sortie standard   |
| `docker container stop <ID or NAME>`     | Arrêter un conteneur                         |
| `docker container rm <ID or NAME>`       | Supprimer un conteneur                       |
| `docker container prune`                 | Supprimer tous les conteneurs arrêtés        |

### Visualisation & accès

| Commande | Description |
|-----------|------------|
| `docker container logs <ID or NAME> (-f --tail)` | Voir les logs d'un conteneur |
| `docker container exec -it <ID or NAME> bash` | Accéder au shell d'un conteneur en cours d'exécution |
| `docker container inspect <ID or NAME>` | Inspecter les détails d'un conteneur  |
| `docker container inspect <ID or NAME> \| grep IPAddress` | Trouver l'adresse IP du conteneur |

## Persistence des données

| Commande                                | Description                            |
|-----------------------------------------|----------------------------------------|
| `docker volume create --name <VOLUME>`  | Créer un volume                        |
| `docker volume ls`                      | Lister les volumes                     |
| `docker volume inspect <VOLUME>`        | Inspecter un volume                    |

## Nettoyage système docker

| Commande | Description |
|----------|-------------|
| `docker system prune` | Nettoyer Docker (conteneurs arrêtés, réseaux, images non référencées et caches de build) |
| `docker system prune -f` | Forcer la suppression sans confirmation |
| `docker system prune --volumes` | Inclure les volumes dans le nettoyage |