# <KubernetesIcon icon='/clusters/learning/kubernetes/icons/deploy.svg' label='Déploiement' :width='45' :height='45' />

[Un déploiement](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/) permet de décrire comment **créer et mettre à jour une application sans état sans interruption (downtime)**, en spécifiant notamment les images à utiliser, la façon dont les pods doivent être mis à jour ou mis à l'échelle (**scaling**).

## Les étapes d'un déploiement

![deployment](/learning/kubernetes/deployment.svg)

1. **Définition du déploiement**: fichier de configuration YAML qui définit le déploiement. Ce fichier inclut le nombre de réplicas, les images des containers, les ports à exposer, les labels, les sélecteurs, les stratégies de mise à jour, etc.
2. **Création du déploiement**: **kubectl**  traduit le fichier YAML en requêtes HTTP REST et les envoie au `kube-apiserver`
3. **Réception de la demande par kube-apiserver**: Le `kube-apiserver` valide et persiste la configuration dans `etcd` puis renvoie la demande aux autres composants du cluster pour traitement
4. **Planification du déploiement**: Le `kube-scheduler` reçoit la demande de création de pods. Il évalue les ressources disponibles sur les nodes du cluster (CPU, mémoire, etc.) et les contraintes spécifiques (affinités, anti-affinités, tolérances, etc.) pour décider sur quel(s) node(s) les pods doivent être déployés
5. **Création du ReplicaSet**: Le `Deployment Controller` (partie du `kube-controller-manager`) crée un `ReplicaSet` basé sur le template du déploiement. Le `ReplicaSet` a un hash unique pour identifier la version de la configuration du déploiement
6. **Création et maintien des pods par le ReplicaSet**: Le `ReplicaSet` est responsable de la création des pods. Une fois créé, il prend la responsabilité de créer le nombre de pods définis dans le template du déploiement. Il surveille également ces pods et les recrée automatiquement en cas de défaillance ou de suppression, assurant ainsi la résilience et la stabilité de l'application déployée.
7. **Surveillance et auto-réparation par le Deployment Controller**: Le `Deployment Controller` géré par le `controller manager` surveille en permanence les pods créés par le `ReplicaSet`. Il assure le déploiement progressif des mises à jour, gère les rollbacks si une mise à jour échoue, et surveille la disponibilité des pods. En cas de panne d'une node ou de suppression de pods, il coordonne la création de nouveaux pods pour maintenir le déploiement dans l'état désiré (**auto-healing**).

## `Rolling update`

Lorsque le template des pods dans le fichier de configuration du déploiement change, le hash change, entraînant la création d'un nouveau `ReplicaSet`. Si le template ne change pas, le hash ne change pas, et le `ReplicaSet` est préservé, permettant une mise à l'échelle (**scaling**).

::: tip scaling
* **scaleup**: augmenter le nombre de pods
* **scaledown**: diminuer le nombre de pods
:::

![deployment-rolling-update](/learning/kubernetes/deployment-rolling-update.svg)

1. Création d'un nouveau `ReplicaSet` avec un nouveau hash
2. Création d'un nouveau pod
3. Si le pod s'est correctement lancé, destruction d'un pod de l'ancienne version
4. Répéter jusqu'au remplacement complet de tous les pods

## `Rollback`

Kubernetes conserve un historique des déploiements, ce qui permet d'effectuer des restaurations si nécessaire. Cela peut être utile en cas de problème avec la nouvelle version de notre application que nous voulons déployer. Les restaurations de déploiement mettent également à jour la révision du déploiement.

![deployment-rollback](/learning/kubernetes/deployment-rollback.svg)

1. Création d'un nouveau `ReplicaSet` avec un nouveau hash
2. Le pod échoue à se lancer correctement (ex. : le container entre dans un état de crash loop)
3. Le `ReplicaSet` reste en place et aucun pod ne sera détruit
4. Effectuer un **rollback** car `etcd` garde une trace de tous les déploiements

::: info rollback `kubectl rollout`
```bash
kubectl rollout history deployment
kubectl rollout history deployment --revision=x
kubectl rollout undo deployment
kubectl rollout undo deployment --to-revision=x
kubectl rollout status deployment
```
:::

## Alternatives

| Alternative  | Description |
|--------------|-------------|
| <KubernetesIcon icon='/clusters/learning/kubernetes/icons/ds.svg' label='daemonSet' :width='35' :height='35' />  | Déploie un pod sur touts les nodes du cluster ou d'un certain sous-ensemble de nodes. Souvent utilisé pour gérer du stockage, du monitoring ou de la journalisation de log |
| <KubernetesIcon icon='/clusters/learning/kubernetes/icons/sts.svg' label='statefulSet' :width='35' :height='35' /> | Utilisé pour des applications avec état (stateful) comme une base de données. Similaire à un déploiement, mais chaque pod est unique et possède un identifiant persistant. Les Pods ont également des volumes persistants qui peuvent stocker des données décrivant le cycle de vie de chaque Pod individuel. A la différence du déploiement qui fournit un Pod différent lors d’une suppression du Pod, le Statefulset nous renvoie un Pod identique à chaque fois. |