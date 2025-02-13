# Gestion de Kubernetes

Pour interagir avec l'API de Kubernetes, il est nécessaire de fournir les spécifications au format JSON dans le corps des requêtes HTTP. Pour ce faire, il faut fournir des fichiers de configuration au format YAML et les transmettre via l'interface en ligne de commande (CLI) de Kubernetes.

![kubernetes-loop](/learning/kubernetes/kubernetes-loop.png)

1. **Écriture de fichiers YAML ou JSON** : Décrire l'état désiré de l'application
2. **Publication sur le serveur kube-api** : Envoi des informations
3. **Distribution de la charge de travail par la node master** : Le cluster correspond à l'état désiré
4. **Stockage de la charge de travail dans etcd et déploiement** : Configuration conservée et charge de travail déployée
5. **Vérification continue par Kubernetes** : Garantie que l'état actuel correspond au souhaité
6. **Boucle de vérification Kubernetes (Kubernetes watch loop)** : Réactive les pods défaillants 

::: tip Chaque objet comprend deux champs :
* **Spécification (spec)**:  Caractéristiques souhaitées pour la ressource
* **État (status)** : Description de l'état actuel, géré activement par Kubernetes
:::

## Vue d'ensemble de l'API

### [Version de l'API](https://kubernetes.io/docs/reference/using-api/#api-versioning)

| Version | Nom | Description |
| ------- | ----- | ----------- |
| Alpha |`v1alpha1` | Désactivée par défaut, non recommandée pour la production en raison de bugs potentiels. |
| Beta | `v2beta3` | 	Testée, activée en toute sécurité mais sujette à des changements dans les futures versions. |
| Stable | `vX` | Disponible pour toutes les versions futures de Kubernetes |

### [Groupes d'API](https://kubernetes.io/docs/reference/using-api/#api-groups)

Les **groupes d'API** organisent les différentes versions et types d'API.

| Groupe | Endpoint | Champ YAML `apiversion` | Description |
| ------ | -------- | ----------------------- | ----------- |
| Core ou Legacy | REST `/api/v1` | `v1` | Types de ressources et versions d'API originales de Kubernetes. |
| Nommés | REST `/apis/$NOM_GROUPE/$VERSION` | `batch/v1` | 	Types et versions d'API ajoutés après l'introduction des groupes d'API. |

## Command line tool (`kubectl`)

[kubectl](https://kubernetes.io/docs/reference/kubectl/) est l'interface en ligne de commande (CLI) pour interagir avec un cluster Kubernetes.

### Structure des commandes

```sh
kubectl [command] [TYPE] [NAME] [flags]
```
| Attribut | Description |
| -------- | ----------- |
| **command** | Type d'opération (create, describe, get, apply, delete, apply) |
| **TYPE** | Type de ressource (Pod, Service, Deployment, etc.) |
| **NAME** | Nom de la ressource |
| **flags** | Options spéciales ou actions sur la ressource (`-s` ou `--server` pour spécifier l'adresse et le port du serveur API Kubernetes) |

### Exemples de commandes

| Commande | Description |
| -------- | ----------- |
| `kubectl apply -f deployment.yml` | Appliquer une configuration à partir d'un fichier YAML |
| `kubectl get all` | Récupérer toutes les ressources |
| `kubectl api-resources` | Lister les ressources disponibles |
| `kubectl get pod --show-labels` | Vérifier les labels des Pods |
| `kubectl exec -it curl -- curl 10.43.5.10` | Exécuter une commande dans un Pod |
| `kubectl scale deployment` | Mettre à l'échelle un déploiement |
| `kubectl get namespaces` | Obtenir les namespaces |
| `kubectl get all -n namespace` | Lister les ressources dans un namespace spécifique |
| `kubectl delete service` | Supprimer un service |
| `kubectl delete deployment` | Supprimer un déploiement |
| `kubectl expose deployment` | Exposer un déploiement |

## Fichiers de configuration (YAML)

Les fichiers **YAML (Yet Another Markup Language)** sont utilisés pour configurer Kubernetes.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: wordpress
spec:
  containers:
  - name: wordpress
    image: wordpress
    ports:
    - containerPort: 80
```

| Attribut | Description |
| -------- | ----------- |
| **apiVersion** | Version de l'API Kubernetes |
| **kind** | Type d'objet à créer |
| **metadata** | Métadonnées sur l'objet (nom, labels, etc.) |
| **spec** | Spécifications de l'objet (état souhaité) |

::: tip Appliquer un Fichier YAML
```sh
kubectl apply -f wordpress.yml
```
:::