# Minikube

[Minikube](https://minikube.sigs.k8s.io/docs/) est un outil qui permet de faire fonctionner Kubernetes localement.

## Fonctionnalités

### Commandes de base

| Commande                         | Description                                      |
|----------------------------------|--------------------------------------------------|
| `minikube start`                 | Démarrer un cluster Minikube.                    |
| `minikube stop`                  | Arrêter le cluster Minikube.                     |
| `minikube delete`                | Supprimer le cluster Minikube.                   |
| `minikube delete --all`          | Supprimer tous les clusters Minikube.            |
| `minikube status`                | Afficher l'état du cluster Minikube.             |
| `minikube dashboard`             | Ouvrir le tableau de bord Kubernetes.            |
| `minikube ip`                    | Obtenir l'adresse IP du cluster Minikube.        |
| `minikube ssh`                   | Accéder à une session SSH dans le cluster.       |
| `minikube logs`                  | Afficher les logs du cluster Minikube.           |
| `minikube kubectl -- <command>`  | Exécuter une commande kubectl via Minikube.      |

### Gestion des add-ons

Minikube supporte plusieurs add-ons pour enrichir les fonctionnalités de votre cluster local.

| Commande                                  | Description                                      |
|-------------------------------------------|--------------------------------------------------|
| `minikube addons list`                    | Lister les add-ons disponibles.                  |
| `minikube addons enable <addon>`          | Activer un add-on spécifique.                    |
| `minikube addons disable <addon>`         | Désactiver un add-on spécifique.                 |
| `minikube addons configure <addon>`       | Configurer un add-on spécifique.                 |

### Accès aux services

Minikube facilite l'accès aux services déployés dans votre cluster.

| Commande                                 | Description                                      |
|------------------------------------------|--------------------------------------------------|
| `minikube service <service> --url`       | Obtenir l'URL d'un service spécifique.           |
| `minikube tunnel`                        | Créer un tunnel pour accéder aux services LoadBalancer.|

## Metrics Server (metrics server)

Le **Metrics Server** est un add-on qui collecte des métriques de ressources dans Kubernetes. Pour l'activer dans Minikube :

```sh
minikube addons enable metrics-server
```

## Alternatives

| Alternative                              | Description                                      |
|------------------------------------------|--------------------------------------------------|
| [Kind](https://kind.sigs.k8s.io/)        | Kubernetes IN Docker, idéal pour les tests CI.   |
| [K3s](https://k3s.io/)                   | Distribution légère de Kubernetes.               |
| [MicroK8s](https://microk8s.io/)         | Distribution légère et rapide de Kubernetes par Canonical.|