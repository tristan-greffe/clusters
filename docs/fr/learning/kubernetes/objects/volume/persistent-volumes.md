# <KubernetesIcon icon='/clusters/learning/kubernetes/icons/vol.svg' label='Persistent Volumes' :width='45' :height='45' />

Les [Persistent Volumes (PV)](https://kubernetes.io/docs/concepts/storage/persistent-volumes/) sont essentiels pour les applications nécessitant un stockage de données persistantes même après le redémarrage des pods ou des nodes, assurant ainsi la **continuité des données au-delà du cycle de vie des pods**.

## Fonctionnement

Un `Persistent Volume (PV)` est un espace de stockage fourni par un administrateur dans un cluster. Les développeurs demandent ce stockage en créant un `PersistentVolumeClaim (PVC)` et en le montant dans un Pod, où le volume répond aux exigences spécifiées telles que la taille et le mode d'accès.

![persistent-volume](/learning/kubernetes/persistent-volume.svg)


1. **Définition** : Un fichier de configuration YAML qui définit le `PersistentVolume`, le `PersistentVolumeClaim` et le `StorageClass`
2. **Création** : **kubectl** traduit le fichier YAML en requêtes HTTP REST et les envoie au `kube-apiserver`
3. **Réception de la demande par kube-apiserver** : Le `kube-apiserver` valide les configurations des PV, PVC, et StorageClass, puis les persiste dans `etcd`. Il renvoie ensuite la demande aux autres composants du cluster pour traitement
4. **Gestion par le PV Controller** :
   - **Association PV et PVC** : Le PV Controller tente d'**associer les PV disponibles aux PVC** en fonction des critères spécifiés (capacité, modes d'accès, StorageClass)
   - **Provisionnement dynamique** : Si un PVC ne trouve pas de PV correspondant et qu'une StorageClass avec un provisionneur est spécifiée, le PV Controller déclenche le **provisionnement dynamique d'un nouveau PV**
5. **Liaison du PVC au PV** : Une fois un PV trouvé ou provisionné, **le PV Controller lie le PVC au PV**. Il met à jour les statuts des objets pour refléter cette liaison, indiquant que le PVC est maintenant lié à un PV spécifique
6. **Utilisation du PVC par les Pods** :
   - **Spécification des volumes dans les pods** : Les développeurs **spécifient le PVC dans la section volumes des définitions de `pods` ou des `StatefulSets`**, permettant ainsi aux pods de monter le stockage persistant fourni par le PV
   - **Montage des volumes** : Lorsque les pods sont créés, ils **montent les PV via les PVC**, accédant ainsi au stockage défini par le PV
7. **Surveillance et gestion de la politique de récupération** : Le PV Controller applique la **politique de récupération du PV** (Retain, Recycle, Delete) lorsque le PVC est supprimé

::: danger ⚠️ Attention
K8s ne limite pas les PV à un `namespace`, ce qui signifie qu'un Pod, dans n'importe quel `namespace`, peut réclamer un PV
:::

###
## <KubernetesIcon icon='/clusters/learning/kubernetes/icons/pv.svg' label='PersistentVolume' :width='45' :height='45' />

Un `volume persistant (PV)` est une ressource de stockage abstraite dans un cluster, représentant le stockage physique utilisé par les pods. Il peut être provisionné statiquement par les administrateurs ou dynamiquement par Kubernetes.

### Provisionnement

Il existe deux méthodes pour provisionner des PV :

* **Provisionnement statique** : Les administrateurs créent des PV à l'avance en utilisant des fichiers manifestes PV, détaillant le stockage disponible pour les pods.
* **Provisionnement dynamique** : Kubernetes crée automatiquement des PV lorsqu'un `PersistentVolumeClaim (PVC)` demande du stockage et qu'aucun PV existant ne correspond aux critères. Cela se fait via les `StorageClasses`.

### Configuration

```yaml
apiVersion: v1
kind: PersistentVolume
metadata:
  name: datascientest-pv
spec:
  capacity:
    storage: 10Gi
  accessModes:
    - ReadWriteOnce
  hostPath:
    path: "/mnt/data"
  storageClassName: slow
```

| **Attribut**           | **Description** |
|------------------------|-----------------|
| ➡ **`capacity`**           | Indique la taille du PV |
| | |
| ➡ [`accessModes`](https://kubernetes.io/docs/concepts/storage/persistent-volumes/#access-modes) | |
| ReadWriteOnce          | Accès en lecture-écriture par un seul node |
| ReadWriteMany          | Accès en lecture-écriture par plusieurs nodes |
| ReadOnlyMany           | Accès en lecture seule par plusieurs nodes |
| ReadWriteOncePod       | Accès en lecture-écriture par un seul pod |
| | |
| ➡ [`Type de PV`](https://kubernetes.io/docs/concepts/storage/persistent-volumes/#types-of-persistent-volumes) | |
| cephfs                 | Volume CephFS |
| csi                    | Container Storage Interface (CSI) |
| fc                     | Fibre Channel (FC) |
| hostPath               | Volume HostPath (pour les tests à node unique) |
| iscsi                  | Stockage iSCSI |
| local                  | Périphériques de stockage locaux montés sur des nodes |
| nfs                    | Stockage NFS |
| rbd                    | Volume Rados Block Device (RBD pour Ceph) |
| | |
| ➡ **`storageClassName`** | nom de la classe de stockage qui liera le PV au PVC de l'utilisateur |

::: info Récupération de volume
Pour **libérer un PV pour d'autres utilisateurs, supprimez l'objet PVC**. La politique de récupération du PV (Retained, Recycled ou Deleted) détermine ce qu'il advient du PV après sa dissociation du PVC.
:::

## <KubernetesIcon icon='/clusters/learning/kubernetes/icons/pvc.svg' label='PersistentVolumeClaim' :width='45' :height='45' />

Un `PersistentVolumeClaim (PVC)` est une **requête d'espace de stockage par un utilisateur**. Les PVC permettent de demander des volumes avec des caractéristiques spécifiques, telles que la capacité et les modes d'accès. Les Pods utilisent les PVC pour se connecter aux PV, offrant ainsi une abstraction qui évite aux utilisateurs de se soucier des détails physiques du stockage.

::: info Protection de stockage en cours d'utilisation
K8s protège les PV et PVC utilisés par un Pod contre la suppression. Si un PVC est supprimé accidentellement alors qu'il est utilisé, il ne sera pas supprimé tant que le Pod ne l'utilisera plus. De même, un PV lié à un PVC ne sera pas supprimé tant qu'ils ne sont pas dissociés.
:::

::: info Extension de volumes persistants
Si une application nécessite plus de stockage, **modifiez l'objet PVC pour demander une capacité supérieure à celle du PV** initial.
:::

## <KubernetesIcon icon='/clusters/learning/kubernetes/icons/sc.svg' label='StorageClass' :width='45' :height='45' />

![storageclass](/learning/kubernetes/storageclass.svg)

Les objets de type [StorageClass](https://kubernetes.io/docs/concepts/storage/storage-classes/) sont utilisés pour **définir les classes de stockage** disponibles au sein de Kubernetes. Ils spécifient les caractéristiques et les paramètres du stockage, tels que les performances, le type de média (HDD, SSD), les politiques de réplication, etc., en fonction des capacités et des configurations prises en charge par les solutions de stockage disponibles dans le fournisseur de cloud, tel qu'AWS.

::: info
La plupart des services Kubernetes gérés (EkS , AKS , GKE , etc.) des fournisseurs de cloud fournissent une classe de stockage par défaut lorsque nous configurons un cluster Kubernetes.
:::

### Provisionnement dynamique

La `StorageClass` est **utile pour créer des PV dynamiques**. Par exemple, si un Pod nécessite une capacité de stockage de 128 MiB, vous pouvez créer un PVC associé à une StorageClass. Si Kubernetes ne trouve pas de PV correspondant au PVC, la StorageClass crée automatiquement un PV pour répondre aux besoins spécifiés.

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: pvc-datascientest
spec:
  accessModes:
    - ReadWriteOnce
  storageClassName: local-path
  resources:
    requests:
      storage: 128Mi
```

Lorsque ce manifeste est appliqué, un PV correspondant est créé automatiquement si aucun PV préexistant ne répond aux critères du PVC. La classe de stockage définie dans storageClassName assure que le PV créé correspond aux spécifications de capacité et de configuration définies dans le PVC.

::: danger ⚠️ Attention
Un PVC peut rester indéfiniment non lié si aucun PV correspondant n'existe ou si la StorageClass associée ne peut pas créer le PV.
:::