# <KubernetesIcon icon='/clusters/learning/kubernetes/icons/ns.svg' label='Namespace' :width='45' :height='45' />

Les [Namespaces](https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/) permettent d'**isoler**, de **regrouper** et d'**organiser** les ressources au sein d'un cluster Kubernetes.

La plupart des distributions Kubernetes créent trois ou quatre `Namespaces` par défaut :

![namespace](/learning/kubernetes/namespace.svg)

| Namespace         | Description |
|-------------------|-------------|
| **default**       | Le **namespace par défaut** où les ressources sont placées si aucun namespace spécifique n'est spécifié lors de leur création |
| **kube-public**   | Utilisé par les **ressources publiques**, il n'est pas recommandé de l'utiliser par les utilisateurs du cluster |
| **kube-system**   | Utilisé par le control plane pour les **ressources système**, il n'est pas recommandé de l'utiliser par les utilisateurs du cluster |
| **kube-node-lease**| Ce namespace contient des objets **Lease** associés à chaque node. Les Leases de node permettent au `kubelet` d'envoyer des battements de cœur (heartbeats) afin que le control plane puisse détecter la défaillance d'une node |

::: tip Scope des Namespaces
Le scope des namespaces varie selon les objets :
* **Scope global** à tout le cluster : `PersistentVolumes`, `Nodes`
* **Scope restreint** au namespace : `Deployments`, `Pods`, `Services`, `StatefulSets`, `ConfigMaps`, `Secrets`, `Quotas`, etc.
:::

## Cas d'utilisation

### Isolation des Ressources

Les organisations utilisant un cluster unique pour le développement, les tests et la production peuvent utiliser les `Namespaces` pour **isoler les environnements**.

![namespace-isolation](/learning/kubernetes/namespace-isolation.svg)

### Contrôle d'Accès

Les `Namespaces` permettent l'utilisation de `RBAC` (contrôle d'accès basé sur les rôles), permettant aux équipes de définir des rôles regroupant des listes d'autorisations spécifiques.

![namespace-control](/learning/kubernetes/namespace-control.svg)

### Allocation de Ressources Physiques

Les utilisateurs peuvent définir des limites de ressources (ram, cpu etc.) sur les `Namespaces` en configurant des quotas de ressources.

![namespace-resource](/learning/kubernetes/namespace-resource.svg)

::: info
Les grandes équipes peuvent utiliser les `Namespaces` pour isoler leurs microservices.
:::