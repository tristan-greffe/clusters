# <KubernetesIcon icon='/clusters/learning/kubernetes/icons/vol.svg' label='Volume' :width='45' :height='45' />

Un [volume](https://kubernetes.io/docs/concepts/storage/volumes/) dans Kubernetes est une abstraction utilisée pour gérer le **stockage des données dans les pods**. Il permet de persister les données au-delà du cycle de vie des containers et de partager des données entre différents containers au sein d'un même pod.

Il existe deux **types de volumes** :

<img src="/clusters/learning/kubernetes/volume.svg" alt="volume" style="width: 60%; display: block; margin: 0 auto;">

| Type de Volume | Description | Exemple |
|----------------|-------------|---------|
| **Volumes éphémères** | Les volumes éphémères sont **créés et supprimés avec les pods** qui les utilisent. Ils sont idéals pour les données temporaires et les caches, et sont **stockés sur la node** où le pod est en cours d'exécution. | [emptyDir](https://kubernetes.io/docs/concepts/storage/volumes/#emptydir) : un volume vide créé lorsqu'un pod est assigné à une node et supprimé lorsque le pod est supprimé. [configMap](https://kubernetes.io/docs/concepts/storage/volumes/#configmap) et [secret](https://kubernetes.io/docs/concepts/storage/volumes/#secret) : utilisés pour injecter des configurations et des données sensibles. |
| **Volumes persistants (PV)** | Les volumes persistants sont **dissociés du cycle de vie des pods et des nodes**. Ils permettent de stocker des données de manière durable, indépendamment des redémarrages de pods ou de nodes. Les PV sont provisionnés par les administrateurs et peuvent être liés dynamiquement aux pods via les `PersistentVolumeClaims` (PVC). | [csi](https://kubernetes.io/docs/concepts/storage/volumes/#csi) : une interface permettant d'utiliser différents systèmes de stockage. [cephfs](https://kubernetes.io/docs/concepts/storage/volumes/#cephfs) : un système de fichiers distribué. [nfs](https://kubernetes.io/docs/concepts/storage/volumes/#nfs) : un système de fichiers réseau. |

## Les volumes éphémères

### emptyDir

L'`emptyDir` est un volume éphémère qui est créé lorsqu'un pod est assigné à une node et qui est supprimé lorsque le pod est supprimé. Ce type de volume est utile pour stocker des données temporaires qui peuvent être partagées entre les containers d'un même pod.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: example-pod
spec:
  containers:
  - name: example-container
    image: busybox
    command: [ "sh", "-c", "while true; do echo $(date) >> /data/log.txt; sleep 5; done" ]
    volumeMounts:
    - mountPath: /data
      name: example-volume
  volumes:
  - name: example-volume
    emptyDir: {}
```

### downwardAPI

Le volume `downwardAPI` permet à un pod d'**accéder à ses propres métadonnées** (labels, annotations etc.). C'est utile pour les applications qui ont besoin de connaître leurs propres métadonnées pour des configurations ou des comportements dynamiques.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: downwardapi-pod
spec:
  containers:
  - name: downwardapi-container
    image: busybox
    command: [ "sh", "-c", "cat /etc/podinfo/labels" ]
    volumeMounts:
    - mountPath: /etc/podinfo
      name: downwardapi-volume
  volumes:
  - name: downwardapi-volume
    downwardAPI:
      items:
      - path: "labels"
        fieldRef:
          fieldPath: metadata.labels
```

### projected

Le volume `projected` permet de **combiner plusieurs sources de volumes** (`secret`, `configMap`, `downwardAPI` etc.) en un seul. C'est utile pour regrouper des données provenant de différentes sources dans un seul volume.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: projected-volume-pod
spec:
  containers:
  - name: example-container
    image: busybox
    command: [ "sh", "-c", "cat /projected/labels /projected/config" ]
    volumeMounts:
    - mountPath: /projected
      name: projected-volume
  volumes:
  - name: projected-volume
    projected:
      sources:
      - downwardAPI:
          items:
          - path: "labels"
            fieldRef:
              fieldPath: metadata.labels
      - configMap:
          name: example-config
          items:
          - key: configKey
            path: "config"
```