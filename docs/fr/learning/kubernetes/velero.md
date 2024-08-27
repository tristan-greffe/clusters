# <KubernetesIcon icon='/clusters/learning/kubernetes/icons/velero.png' label='Velero' :width='45' :height='45' />

[Velero](https://velero.io/) est un outil open source conçu pour **sauvegarder et restaurer** en toute sécurité, assurer la **reprise après sinistre**, et **migrer les ressources des clusters** Kubernetes ainsi que les volumes persistants. Il répond également aux besoins de continuité des activités et de reprise après sinistre (`BCDR` - Business Continuity and Disaster Recovery).

## Avantages

Velero étend les API Kubernetes pour gérer les **opérations de sauvegarde et de restauration**. Chaque opération est définie par des Custom Resource Definitions (`CRD`) dans Kubernetes et est stockée dans `ETCD`. Velero permet de **sauvegarder tous les objets du cluster ou de filtrer** par namespace, label ou type.

| **Fonctionnalité** | **Description** |
|--------------------|-----------------|
| **Opérations de sauvegarde** | Permet de configurer des intervalles de sauvegarde avant ou après l'exécution des sauvegardes. Par exemple, il est possible de vidanger la base de données avant de démarrer une sauvegarde, ce qui peut être essentiel pour garantir l'intégrité des données. |
| **Stockage basé sur le cloud** | Velero conserve la sauvegarde des objets Kubernetes sous forme d'archive dans un stockage cloud. |
| **Instantanés de volumes persistants** | Velero crée des instantanés de disque des volumes persistants en interagissant avec l'API du fournisseur de cloud. |
| **Sauvegardes planifiées** | Les sauvegardes peuvent être déclenchées manuellement ou programmées à intervalles réguliers via des tâches Cron. |
| **Opérations de restauration** | Permet de restaurer des objets et des volumes persistants à partir des sauvegardes, avec la possibilité de restaurer un sous-ensemble spécifique. |

:::info
Par défaut, Velero permet de restaurer des objets dans différents namespaces. Il est également possible d'intégrer des événements avant ou après les opérations de restauration, comme le redémarrage de conteneurs d'applications après la restauration d'une base de données.
:::

## Installation

```sh
wget https://github.com/vmware-tanzu/velero/releases/download/v1.10.0/velero-v1.10.0-linux-amd64.tar.gz
tar -zxvf velero-v1.10.0-linux-amd64.tar.gz
sudo mv velero-v1.10.0-linux-amd64/velero /usr/local/bin/
```

## Workflow de sauvegarde

![velero-backup](/learning/kubernetes/velero-backup.jpg)


1. Le processus de sauvegarde commence lorsque le client Velero appelle l'API Kubernetes pour créer un objet de sauvegarde. Par défaut, `velero backup create` génère des instantanés de disque des volumes persistants.
2. Le contrôleur de sauvegarde détecte cette demande et lance le processus de validation.
3. Une fois validée, la sauvegarde est déclenchée. Pour sauvegarder les objets, Velero interagit avec le serveur API de Kubernetes pour collecter les données.
4. Il communique également avec le service de stockage du fournisseur de cloud pour télécharger le fichier de sauvegarde.

:::tip Pour découvrir toutes les options disponibles :
```sh
velero backup create — help
```
:::

:::tip Désactiver les instantanés de volumes avec l'option suivante :
```sh
--snapshot-volumes=false
```
:::

## Synchronisation de stockage d'objets

Velero considère le stockage cloud comme source de vérité. Il assure que l'état des ressources de sauvegarde dans Kubernetes reflète celui du stockage cloud. Si un objet de sauvegarde est présent dans Kubernetes mais absent du stockage cloud, il sera synchronisé, et inversement, s'il est absent de Kubernetes, il sera supprimé.

Cette fonctionnalité est particulièrement utile lors de la migration de clusters. Elle g**arantit que les ressources de sauvegarde restent cohérentes entre Kubernetes et le stockage cloud**.

## Utilisation de Velero avec AWS S3

La **sauvegarde régulière des clusters Kubernetes est cruciale** pour une reprise après sinistre efficace. La fréquence des sauvegardes doit être adaptée aux besoins spécifiques de chaque organisation.

Velero permet de **configurer des sauvegardes vers des services de stockage cloud comme AWS S3**. Amazon Simple Storage Service (S3) est un service de stockage en nuage offrant une haute disponibilité et une sécurité renforcée. Il permet de stocker et de récupérer une quantité illimitée de données via une interface web ou des API.

AWS S3 utilise des compartiments pour stocker des objets, offrant ainsi une structure de stockage flexible et extensible. Bien que S3 ait une structure hiérarchique simple, les entreprises peuvent configurer une organisation plus complexe en utilisant les fonctionnalités de gestion d'objets avancées.

Avec les [plugins Velero](https://velero.io/plugins/), vous pouvez sauvegarder votre cluster Kubernetes non seulement sur AWS S3, mais également sur d'autres fournisseurs de cloud tels que GCP, Azure, Alibaba, DigitalOcean, etc.

Velero est une solution couramment utilisée pour mettre en place des plans de reprise d'activités (BCDR) pour les clusters Kubernetes. AWS S3, avec ses garanties de haute disponibilité, complète Velero en offrant un stockage fiable pour les sauvegardes d'`ETCD`.

:::info
Pour plus de détails sur la configuration de Velero avec AWS S3, consultez la documentation officielle : [Velero AWS Configuration](https://velero.io/docs/v1.0.0/aws-config/.).
:::