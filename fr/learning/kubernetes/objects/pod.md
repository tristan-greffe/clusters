# <KubernetesIcon icon='/clusters/learning/kubernetes/icons/pod.svg' label='Pod' :width='45' :height='45' />

Un [Pod](https://kubernetes.io/docs/concepts/workloads/pods/) est l'unité de base de déploiement dans Kubernetes, représentant une **instance unique d'une application ou d'un container**. Il encapsule un ou plusieurs containers ainsi que des ressources de stockage, une adresse IP et des règles sur la manière dont les containers doivent fonctionner.

## Caractéristiques des Pods :

![pods](/learning/kubernetes/pods.jpg)

* Une **adresse IP** unique pour la communication entre les Pods
* Des **volumes de stockage** persistants selon les besoins
* Des informations de **configuration** définissant le comportement des containers

::: tip Pod multi-containers 
Tous les containers d'un Pod partagent le même environnement : mémoire, volumes, pile réseau et l'adresse IP.
:::

## Fonctionnement

Les Pods sont créés et gérés par des ressources de charge de travail appelées **contrôleurs** (tels que `Deployments`, `DaemonSets`, `StatefulSets`, etc.). Ces contrôleurs automatisent la gestion du cycle de vie des Pods, incluant :

* Le remplacement des Pods défaillants
* La réplication des Pods selon les besoins
* L'éviction des Pods lorsqu'ils sont terminés ou inutiles

Les contrôleurs s'assurent également que les Pods en cours d'exécution **correspondent au déploiement défini** dans le modèle de Pod. Ils vérifient l'état des ressources déployées et maintiennent la stabilité de ces ressources même en cas de panne, comme la perte d'une node.

::: info
Un Pod peut également contenir des containers d'initialisation qui s'exécutent lors de son démarrage.
:::

## Ressources

### Request

Les `requests` définissent la `quantité minimale et initials de ressources (CPU & memory)` allouées à un container. Par exemple, une application peut utiliser plus de 256 Mo de mémoire, mais k8s garantira un minimum de 256 Mo au container en fonction de la demande.

```yaml
resources:
  requests:
    memory: "64Mi"
    cpu: "250m"
```

### Limits

Les `limits` définissent la **quantité maximale de ressources (CPU & memory)** qu'un container donné peut consommer. Notre application peut nécessiter au moins 256 Mo de mémoire, mais nous voudrons peut-être nous assurer qu'elle ne consomme pas plus de 512 Mo de mémoire, c'est-à-dire limiter sa consommation de mémoire à 512 Mo.

```yaml
resources:
  limits:
    memory: "128Mi"
    cpu: "500m"
```

## Health checks (Probes)

Les health checks (ou probes) permettent de **vérifier l'état des containers dans un pod**. Kubernetes propose trois types de probes : `Startup Probe`, `Liveness Probe` & `Readiness Probe`. Ces probes sont des **actions de diagnostic** effectuées par le `kubelet` pour s'assurer du bon fonctionnement des Pods.

<img src="/learning/kubernetes/probes.svg" alt="probes" style="width: 100%; display: block; margin: 0 auto;">

1. `Startup Probe` se lance en premier
2. Une fois la `Startup Probe` réussie, les `Liveness Probes` & `Readiness Probes` se lancent
3. En cas d'échec d'une action de diagnostic, `kubelet` envoie un rapport au serveur d'API Kubernetes

### Startup Probe

La `Startup Probe` est utilisée pour déterminer si une **application conteneurisée a démarré correctement**. En cas d'échec, k8s considère que le container n'a pas démarré correctement et le redémarrera conformément à la politique de redémarrage du pod.

```yaml
startupProbe:
  httpGet:
    path: /healthz
    port: 8080
  initialDelaySeconds: 10
  periodSeconds: 10
  failureThreshold: 30
```

:::info
La `Startup Probe` utilise une requête HTTP GET pour vérifier la santé de l'application
:::

:::info
Utile pour les applications qui ont des temps de démarrage longs ou complexes
:::

### Liveness Probe

La `Liveness Probe` **vérifie si le Pod est en cours d'exécution**. Si la probe échoue, le Pod est redémarré selon sa politique de redémarrage. Elle permet de savoir **quand redémarrer un container** lorsqu'il est en échec. L'état par défaut de LivenessProbe est Success.

```yaml
livenessProbe:
  tcpSocket:
    port: 80
  initialDelaySeconds: 5
  periodSeconds: 5
```

:::info
La `Liveness Probe` utilise une simple vérification TCP pour tester si l'application écoute sur le port 80
:::

### Readiness Probe

La `Readiness Probe` vérifie si l'**application est prête à répondre aux requêtes**. Si la probe échoue, l'adresse IP du Pod est retirée de la liste des points de terminaison du service. Elle permet de savoir quand un **container est prêt à recevoir du trafic**. L'état par défaut du ReadinessProbe est Success.

```yaml
readinessProbe:
  failureThreshold: 3
  httpGet:
    path: /test.html
    port: 80
    scheme: HTTP
  initialDelaySeconds: 5
  periodSeconds: 3
  successThreshold: 1
```

:::info
La `Readiness Probe` utilise une requête HTTP GET pour vérifier que l'application peut répondre sur le chemin spécifié
:::

### Configuration

Les probes se configurent dans les spécifications des pods. Voici les principaux paramètres :

| Paramètre | Description |
|-----------|-------------|
| `initialDelaySeconds` | Temps en secondes après le démarrage du container avant le début des probes (par défaut : 0) |
| `periodSeconds` | Fréquence en secondes à laquelle la vérification est effectuée (par défaut : 10 secondes, min : 1) |
| `timeoutSeconds` | Temps en secondes après lequel le test est considéré comme échoué (par défaut et min : 1 seconde) |
| `successThreshold` | Nombre minimum de succès consécutifs pour que la probe soit considérée réussie après un échec (par défaut et min : 1) |
| `failureThreshold` | Nombre minimum d'échecs consécutifs pour que la probe soit considérée échouée |
| `terminationGracePeriodSeconds` | Temps de grâce en secondes pendant lequel kubelet attend avant de forcer l'arrêt d'un container |

| Types d'Actions | Paramètre | Description |
|-----------------|-----------|-------------|
| **TCPSocketAction** | `tcpSocket`| Vérifie l'état d'un port particulier sur le Pod. La probe réussit si le port est ouvert |
| **HTTPGetAction** | `httpGet` | Exécute une requête GET sur l'IP du Pod. La probe réussit si le code de réponse est compris entre 200 et 399 |
| **ExecAction** | `exec` | Exécute une commande à l'intérieur du Pod. La probe réussit si la commande renvoie un code de sortie 0. |