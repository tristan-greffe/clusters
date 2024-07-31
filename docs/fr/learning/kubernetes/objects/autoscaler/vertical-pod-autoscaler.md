# <KubernetesIcon icon='/clusters/learning/kubernetes/icons/vpa.svg' label='Vertical Pod Autoscaler' :width='45' :height='45' />

Le Kubernetes [Vertical Pod Autoscaler (VPA)](https://github.com/kubernetes/autoscaler/tree/master/vertical-pod-autoscaler) ajuste automatiquement les ressources (CPU et mémoire) allouées aux containers en fonction de leur utilisation. En analysant les données historiques, il **augmente ou diminue les demandes de ressources et les limites** pour optimiser la performance des applications.

<img src="/clusters/learning/kubernetes/vpa.svg" alt="vpa" style="width: 60%; display: block; margin: 0 auto;">

::: danger ⚠️ Ne pas utiliser VPA avec HPA
N'utilisez pas le VPA avec le HPA qui évolue en fonction des mêmes métriques de ressources, car ils peuvent entrer en conflit en se basant sur les mêmes métriques (CPU, mémoire), entraînant des effets secondaires indésirables.
:::

## Composants

| Composant | Description |
|-----------|-------------|
| `VPA Recommender` | Surveille l'utilisation des ressources, examine l'historique et les spécifications de déploiement, puis propose des ajustements des ressources |
| `VPA Updater` | Expulse les Pods pour appliquer les nouvelles recommandations de ressources si le mode `updateMode` est défini sur `Auto` |
| `VPA Admission Controler` | Modifie les demandes de ressources des nouveaux Pods avant leur création, en fonction des recommandations du `VPA Recommender` |

::: warning
Le VPA peut recommander plus de ressources que disponibles, empêchant le Pod de démarrer. Définir un `LimitRange` peut prévenir ce problème en limitant les ressources demandées.
:::

## Fonctionnement

![vpa-operation](/learning/kubernetes/vpa-operation.svg)

1. **Définition du VPA**: Un fichier YAML spécifie le VPA
2. **Création**: **kubectl**  traduit le fichier YAML en requêtes HTTP REST et les envoie au `kube-apiserver`
3. **Traitement par le `kube-apiserver`**: Le `kube-apiserver` valide et stocke la configuration dans `etcd`, puis la transmet aux composants concernés
4. **Analyse des ressources**: Le `VPA Recommender` lit la configuration VPA et les métriques d'utilisation des ressources
5. **Recommandations**: Le `VPA Recommender` fournit des recommandations de ressources pour les Pods
6. **Mise à jour**: Le `VPA Updater` lit les recommandations et lance la résiliation des Pods nécessitant de nouvelles ressources
7. **Recréation des Pods**: Le déploiement recrée les Pods avec les nouvelles ressources
8. **Injection des recommandations**: Le `VPA Admission Controller` injecte les recommandations de ressources dans les nouveaux Pods lors de leur création
9. **Exécution des Pods**: Les nouveaux Pods s'exécutent avec les ressources mises à jour

## Installation

1. Installer avec Helm :
```yaml
helm repo add cowboysysop https://cowboysysop.github.io/charts/
helm install vpa cowboysysop/vertical-pod-autoscaler --namespace kube-system
```

2. Vérifier les pods déployés :
```yaml
kubectl get pod -n kube-system
```

## Configuration

```yaml
apiVersion: autoscaling.k8s.io/v1beta2
kind: VerticalPodAutoscaler
metadata:
  name: vpa
  namespace: vpa
spec:
  targetRef:
    apiVersion: "apps/v1"
    kind: Deployment
    name: nginx
  updatePolicy:
    updateMode: "Auto"
  resourcePolicy:
    containerPolicies:
    - containerName: "nginx"
      minAllowed:
        cpu: "250m"
        memory: "100Mi"
      maxAllowed:
        cpu: "500m"
        memory: "600Mi"
```

### Exclure la mise à l'échelle d'un container

Utilisez le paramètre `mode` avec la valeur `Off`

```yaml
resourcePolicy:
  containerPolicies:
  - containerName: monitoring
    mode: "Off"
```

### Modes d'Update

| Mode | Description |
|------|-------------|
| `Off` | Le VPA fournit des recommandations sans modifier automatiquement les ressources |
| `Initial` | Le VPA attribue les ressources à la création du Pod sans les modifier ensuite |
| `Recreate` | Le VPA met à jour les ressources des Pods en les supprimant et les recréant |
| `Auto` | Le VPA recrée les Pods en fonction des recommandations |