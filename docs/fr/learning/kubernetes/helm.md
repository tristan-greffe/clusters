# <KubernetesIcon icon='/clusters/learning/kubernetes/icons/helm.svg' label='Helm' :width='45' :height='45' />

**[Helm](https://helm.sh/) est un gestionnaire de packages pour Kubernetes**, développé sous l'égide de la [Cloud Native Computing Foundation (CNCF)](https://www.cncf.io/). Il simplifie la gestion des applications Kubernetes en permettant de décrire, installer, mettre à jour, et gérer ces applications via des packages appelés "charts".

## Versions de Helm

### Helm 2 

Helm 2 repose sur une architecture client-serveur.

![helm2-cli](/learning/kubernetes/helm2-cli.png)

* **Tiller Server** : Le composant serveur, nommé **Tiller**, est déployé dans le cluster Kubernetes et communique avec l'API Kubernetes pour gérer les ressources.
* **Client Helm** : L'interface en ligne de commande (CLI) qui interagit avec Tiller pour installer, mettre à jour ou supprimer des charts.

### Helm 3

Helm 3 a simplifié l'architecture en supprimant Tiller, rendant ainsi Helm plus **sécurisé** et direct. **Le client interagit désormais directement avec l'API Kubernetes** sans intermédiaire.

![helm-cli](/learning/kubernetes/helm3-cli.png)


## Concepts de base

### Les charts

Un chart est un package Helm qui contient toutes les ressources nécessaires pour déployer une application Kubernetes. Il est organisé selon une structure de répertoires spécifique :

```sh
my-chart
├──.helmignore
├── Chart.yaml
├── charts
├── templates
│   ├── NOTES.txt
│   ├── _helpers.tpl
│   ├── deployment.yaml
│   ├── hpa.yaml
│   ├── ingress.yaml
│   ├── service.yaml
│   ├── serviceaccount.yaml
│   └── tests
│       └── test-connection.yaml
└── values.yaml
```

| Fichier/Répertoire | Description |
| ------------------ | ----------- |
| **.helmignore** | Liste les fichiers à ignorer lors de la création du chart, similaire à `.gitignore` |
| **Chart.yaml** | Contient des métadonnées sur le chart (nom, version, description) |
| **values.yaml** | Définit les valeurs par défaut pour les templates YAML |
| **charts/** | Répertoire pour inclure des charts dépendants |
| **templates/** |Contient les fichiers manifestes Kubernetes et les templates |
| **templates/NOTES.txt** | Message affiché après le déploiement du chart |
| **templates/_helpers.tpl** | Contient des sous-modèles réutilisables pour les templates |
| **templates/tests/:** | Contient les tests pour valider le bon fonctionnement du chart |


Un cas concret d’utilisation pourrait être la gestion de plusieurs environnements (Dev, Staging, Prod) dans un cluster Kubernetes. Chaque environnement peut avoir des paramètres différents tout en utilisant un seul chart.

![helm-chart](/learning/kubernetes/helm-chart.png)

:::info
À un niveau élevé, les charts Helm réduisent la complexité et la duplication des configurations pour différents environnements (Dev, Staging, Prod) en centralisant les templates dans un seul chart.
:::

### Releases

Une r**elease est une instance déployée d'un chart avec une configuration spécifique**. Helm stocke les releases dans des secrets Kubernetes à partir de Helm 3.

### Repositories

Les **repositories Helm sont des collections de charts**. Ils permettent de partager et de distribuer des charts via des archives. Le [Artifact Hub](https://artifacthub.io/) est un référentiel communautaire, mais on peut également créer des référentiels privés.

## Les templates

Les **templates permettent de créer des fichiers manifestes dynamiques** en utilisant le langage de template Go.

### Les principaux objets

```yaml
{{.Object.Parameter }}
```

| Object | Description |
| ------- | ----------- |
| **Release** | Utilisé pour accéder au nom de la release ou à d'autres informations dynamiques liées à la release |
| **chart** | Permet d'accéder aux valeurs définies dans `Chart.yaml` |
| **Values** | Accède aux paramètres définis dans `values.yaml` |

:::tip
Pour en savoir plus sur les objets pris en charge: la [documentation](https://helm.sh/docs/chart_template_guide/builtin_objects/)
:::

### Exemple

![helm-template](/learning/kubernetes/helm-template.png)

| Element | Description |
| ------- | ----------- |
| **.Release.Name** | Le nom de la release cours |
| **.Values.service.type** | Le type de service défini dans `values.yaml` |
| **.Values.service.port** | Le port du service défini dans `values.yaml` |

## Gestion des valeurs

Les **valeurs sont utilisées pour personnaliser les installations de chart**. Elles peuvent être définies dans `values.yaml` ou passées en ligne de commande.

**Exemple d'un fichier `values.yaml` :**

```yaml
replicaCount: 2
image:
  repository: nginx
  tag: stable
service:
  type: LoadBalancer
  port: 80
```

| Attribut | Description |
| -------- | ----------- |
| **replicaCount** | Nombre de réplicas pour le déploiement |
| **image.repository** | Nom de l'image Docker à utiliser |
| **image.tag** | Tag de l'image Docker |
| **service.type** | Type de service Kubernetes (ClusterIP, NodePort, LoadBalancer) |
| **service.port** | Port sur lequel le service sera exposé |

::: tip Personnaliser les valeurs d'un chart
Pour appliquer un fichier `values.yaml` personnalisé lors de l'installation d'un chart :

```sh
helm install my-release stable/nginx -f custom-values.yaml
```
:::

## Commandes Helm

Helm s'utilise via une CLI pour gérer les charts et les releases.

```sh
helm [command] [chart] [flags]
```

| Attribut | Description |
| -------- | ----------- |
| **command** | Action à effectuer (install, upgrade, list, delete) |
| **chart** | Nom du chart à gérer |
| **flags** | Options supplémentaires pour personnaliser l'action (-f pour spécifier un fichier values, --namespace pour choisir un namespace spécifique) |

### Exemples de commandes Helm

| Commande | Description |
| -------- | ----------- |
| `helm create my-chart` | Créer un nouveau chart. |
| `helm repo add stable https://charts.helm.sh/stable` | Ajouter un repository Helm |
| `helm search repo stable` | Rechercher des charts dans le repository stable |
| `helm install my-release stable/mysql` | Installer un chart avec un nom de release spécifique |
| `helm uninstall my-release` | Supprimer une release spécifique |
| `helm upgrade my-release stable/mysql` | Mettre à jour une release existante avec la dernière version du chart |
| `helm list` | Lister toutes les releases dans le cluster actuel |
| `helm delete my-release` | Supprimer une release spécifique du cluster |
| `helm template my-chart` | Générer des fichiers manifestes à partir d'un chart sans les installer |
| `helm ls --all` | Afficher la liste des Charts |
| `helm rollback my-release` | Revenir à une version précédente d'une release |
| `helm package .` | Créer un package d'un chart |
