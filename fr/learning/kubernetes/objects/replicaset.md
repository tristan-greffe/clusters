# <KubernetesIcon icon='/clusters/learning/kubernetes/icons/rs.svg' label='ReplicaSet' :width='45' :height='45' />

Un [ReplicaSet](https://kubernetes.io/docs/concepts/workloads/controllers/replicaset/) est un objet Kubernetes qui **garantit la disponibilité d'un nombre spécifié de copies (réplicas) d'un pod**. Il assure la redondance et la haute disponibilité des pods au sein d'un cluster.

## Fonctionnement

Si un pod tombe en panne ou est supprimé, le `ReplicaSet` crée automatiquement un nouveau pod pour maintenir le nombre souhaité de réplicas. Cela garantit que l'application continue de fonctionner même en cas de défaillance de certains pods.

![replicaset](/learning/kubernetes/replicaset.svg)

::: info
Un `ReplicaSet` est lié à ses pods via le champ `metadata.ownerReferences` des pods, ce qui permet au `ReplicaSet` de savoir quels pods lui appartiennent
:::

::: info
Un `ReplicaSet` est souvent créé par un objet `Deployment`, ce qui facilite la gestion des versions et les mises à jour progressives des applications
:::

## `Deployment` vs `ReplicaSet`

| `Deployment` | `ReplicaSet` |
|----------------|----------------|
| Abstraction de haut niveau qui gère les ensembles de répliques. | Abstraction de niveau inférieur qui gère le nombre souhaité de répliques d'un pod. |
| Fournit des fonctionnalités supplémentaires telles que les mises à jour progressives, les retours en arrière et la gestion des versions de l'application. | Fournit des mécanismes de base de mise à l'échelle et d'auto-réparation. |
| Gère un modèle de pods et utilise des `ReplicaSet` pour s'assurer que le nombre spécifié de répliques du pod est en cours d'exécution. | Ne gère que le nombre souhaité de répliques d'un pod. |
| Permet les mises à jour et les retours en arrière de l'application, facilitant des mises à jour transparentes et réduisant les temps d'arrêt. | Les applications doivent être mises à jour ou annulées manuellement. |
| Fournit une version de l'application, ce qui permet de gérer plusieurs versions de la même application et de revenir à une version antérieure si nécessaire. | N'offre pas de fonctionnalité de gestion de versions. |