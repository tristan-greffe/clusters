# <KubernetesIcon icon='/clusters/learning/kubernetes/icons/hpa.svg' label='Horizontal Pod Autoscaler' :width='45' :height='45' />

L'[Horizontal Pod Autoscaler (HPA)](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/) ajuste automatiquement le nombre de Pods dans un contrôleur de réplication, un déploiement, un ReplicaSet ou un StatefulSet en fonction de l'utilisation des ressources (`cpu`, `memory` ou métriques personnalisées). Cela permet de réaliser une mise à l'échelle horizontale en **ajoutant ou supprimant des instances de Pods** pour répondre à la demande.

<img src="/learning/kubernetes/hpa.svg" alt="hpa" style="width: 60%; display: block; margin: 0 auto;">

:::warning
HPA ne fonctionne pas avec les `DaemonSets`.
:::

:::info
Par défaut, un HPA vérifie les métriques toutes les 15 secondes.
:::

## Fonctionnalités

* **Ajustement Automatique** : Une fois configuré avec un **nombre `MIN` et `MAX` de répliques**, le HPA surveille et ajuste automatiquement les répliques en fonction de la charge
* **Flexibilité avec les Métriques** : Peut utiliser des **métriques personnalisées (l'heure de la journée, les week-ends ou les heures creuses)** pour adapter l'échelle en fonction des besoins spécifiques de l'application

:::warning
Si le cluster manque de capacité, le HPA ne pourra pas scaler tant que de nouveaux nœuds ne seront pas ajoutés
:::

## Fonctionnement

Le HPA fonctionne selon une boucle continue (vérifier, mettre à jour, vérifier à nouveau)

![hpa-operation](/learning/kubernetes/hpa-operation.svg)

1. **Définition du HPA**: Un fichier YAML spécifie le HPA
2. **Création**: **kubectl**  traduit le fichier YAML en requêtes HTTP REST et les envoie au `kube-apiserver`
3. **Traitement par le `kube-apiserver`**: Le `kube-apiserver` valide et stocke la configuration dans `etcd`, puis la transmet aux composants concernés
4. **Surveillance des Métriques** : Le HPA collecte régulièrement les métriques d'utilisation des ressources à partir du Metrics Server
5. **Calcul de la Mise à l'Échelle** : En fonction des métriques collectées, le HPA calcule le nombre optimal de répliques nécessaires
6. **Ajustement des Répliques** : Le HPA décide d'ajouter ou de supprimer des répliques en fonction du calcul précédent
7. **Mise à Jour des Répliques** : Les répliques sont mises à jour selon les décisions prises, assurant ainsi une adaptation dynamique à la charge.

:::warning
Une mauvaise configuration des limites de CPU et de mémoire des Pods peut entraîner des arrêts fréquents ou un gaspillage de ressources
:::

## Configuration

```yaml
apiVersion: autoscaling/v1
kind: HorizontalPodAutoscaler
metadata:
 name: hpa-phpbb
 namespace: forum
spec:
 scaleTargetRef:
   apiVersion: apps/v1
   kind: Deployment
   name: phpbb
 minReplicas: 5
 maxReplicas: 15
 targetCPUUtilizationPercentage: 50
```

| Paramètre | Description |
|-----------|-------------|
| `minReplicas` | Nombre minimum de répliques de Pod |
| `maxReplicas` | Nombre maximum de répliques de Pod |
| `targetCPUUtilizationPercentage` | Pourcentage d'utilisation du CPU au-delà duquel le HPA doit augmenter le nombre de répliques jusqu'au maximum défini |

## Test

Pour tester le HPA, il faut **simuler une augmentation de la charge** et observer la réaction du système en vérifiant les répliques

1. Script pour simuler une augmentation de la charge

```bash
curl -L https://goo.gl/S1Dc3R | bash -s 10000 "http://<cluster_IP>:<port>"
```

2. Vérification de l'ajustement du nombre de répliques en réponse à la charge accrue

```bash
watch kubectl get all -n <namespace>
```
