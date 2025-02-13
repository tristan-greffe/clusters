# L'architecture de Kubernetes

Un cluster se compose de **nodes masters** et de **nodes workers**. Les nodes masters orchestrent les applications exécutées sur les nodes workers et les surveillent en permanence pour s'assurer qu'elles correspondent à l'état souhaité déclaré par l'administrateur.

![kubernetes-architecture](/learning/kubernetes/kubernetes-architecture.svg)

###
## <KubernetesIcon icon='/clusters/learning/kubernetes/icons/control-plane.svg' label='Control Plane' :width='45' :height='45' />

Le **control plane surveille l'ensemble du cluster**, redémarrant les pods non sains, mettant à l'échelle les applications et planifiant les tâches selon les besoins.

### Composants

![control-plane-architecture](/learning/kubernetes/control-plane-architecture.svg)

| Composant | Description |
| --------------| ----------- |
| <KubernetesIcon icon='/clusters/learning/kubernetes/icons/api.svg' label='kube-apiserver' :width='35' :height='35' /> | Point de terminaison de l'API REST pour interagir avec le plan de contrôle Kubernetes |
| <KubernetesIcon icon='/clusters/learning/kubernetes/icons/etcd.svg' label='etcd' :width='35' :height='35' /> | Système de base de données (clés/valeurs) pour les données du cluster. Stocke les éléments de configuration et l'état de chaque node et pod. Permet de revenir à un état antérieur, agissant comme la mémoire de sauvegarde du cluster |
| <KubernetesIcon icon='/clusters/learning/kubernetes/icons/sched.svg' label='kube-scheduler' :width='35' :height='35' /> | Surveille les nouvelles charges de travail (pods) et les affecte à une node en fonction de divers facteurs de planification (contraintes de ressources, règles d'anti-affinité, localité des données, etc.) |
| <KubernetesIcon icon='/clusters/learning/kubernetes/icons/c-m.svg' label='kube-controller-manager' :width='35' :height='35' /> | Contrôleur central qui surveille les nodes, les ensembles de réplication, les points de terminaison (services) et les comptes de service |
| <KubernetesIcon icon='/clusters/learning/kubernetes/icons/c-c-m.svg' label='cloud-controller-manager' :width='35' :height='35' /> | Interagit avec le fournisseur de cloud sous-jacent (OVH, AWS, etc.) |

### La haute disponibilité de Kubernetes

![ha-architecture](/learning/kubernetes/ha-architecture.png)

La **haute disponibilité de Kubernetes (HA)** évite les points de défaillance unique en répliquant les composants clés comme le kube-apiserver, le controller manager et etcd sur plusieurs nodes masters. Ainsi, même si un control plane tombe en panne dans un cluster multi-master (généralement trois nodes), les autres maintiennent le cluster opérationnel.

## <KubernetesIcon icon='/clusters/learning/kubernetes/icons/node.svg' label='Node Worker' :width='45' :height='45' />

### Composants

Contrairement aux composants des nodes masters qui s'exécutent généralement sur une seule node master (sauf en configuration haute disponibilité), les composants des nodes workers s'exécutent sur l'ensemble des nodes Workers.

![node-architecture](/learning/kubernetes/node-architecture.svg)

| Composant | Description |
| --------------| ----------- |
| <KubernetesIcon icon='/clusters/learning/kubernetes/icons/kubelet.svg' label='kubelet' :width='35' :height='35' /> | Agent s'exécutant sur le node Worker pour inspecter la santé des conteneurs et faire rapport aux masters. Il est également chargé d'écouter les nouvelles commandes du kube-apiserver et de les appliquer sur la node où il est installé |
| <KubernetesIcon icon='/clusters/learning/kubernetes/icons/k-proxy.svg' label='kube-proxy' :width='35' :height='35' /> | Composant chargé de gérer le trafic réseau au sein du cluster |
| container runtime | Couche qui permet d'exécuter les conteneurs (Docker, rkt, runc) |

### L'écosystéme des conteneurs

![container-ecosystem](/learning/kubernetes/container-ecosystem.png)

| Catégorie | Description |
| --------- | ----------- |
| Clients pour les conteneurs | Outils en ligne de commande pour interagir avec les conteneurs et les clusters |
| Orchestrateurs / moteurs de haut niveau | Gestion des images (pull), gestion du stockage, création de conteneurs (runc) |
| CRI (Container Runtime Interfaces) | Interface standardisée introduite par Kubernetes pour permettre aux différents gestionnaires de conteneurs (comme containerd, CRI-O, etc.) de s'intégrer de manière transparente avec Kubernetes. C'est un environnement d'exécution. |
| [OCI (Open Container Initiative)](https://opencontainers.org/) | Implémentation de référence de l'OCI (organisation sous l'égide de la [Linux Foundation](https://www.linuxfoundation.org/) qui promeut des normes) écrite en Go. Il s'agit d'un outil en ligne de commande pour lancer et gérer des conteneurs conformes à la spécification OCI. containerd et CRI-O utilisent par défaut runc. |
