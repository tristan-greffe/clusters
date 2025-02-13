# <KubernetesIcon icon='/clusters/learning/kubernetes/icons/svc.svg' label='Service' :width='45' :height='45' />

Comme les pods sont des objets éphémères, il peut être complexe de les atteindre directement. C'est là qu'interviennent les Services. Un [service](https://kubernetes.io/docs/concepts/services-networking/service/) est une couche d'abstraction qui définit des règles permettant d'**exposer une application sous la forme d'un ou de plusieurs pods**. Les Services utilisent des labels (étiquettes) et des sélecteurs (selectors) pour identifier et sélectionner les pods à exposer.

![service](/learning/kubernetes/service.svg)

Il existe plusieurs types de Services pour exposer les applications :

* **ClusterIP** (par défaut) : Expose le Service sur une adresse IP interne au cluster, rendant le Service accessible uniquement à l'intérieur du cluster
* **NodePort** : Expose le Service sur un port statique d'un node, permettant l'accès au Service depuis l'extérieur du cluster en utilisant l'IP du'une node et le port spécifié
* **Loadbalancer** :  Expose le Service à l’extérieur du cluster en utilisant l’équilibreur de charge d’un fournisseur de cloud, attribuant une IP publique pour l'accès externe
* **ExternalName** : Mappe le Service à un nom DNS externe (par exemple, l'API d'OpenAI ou une base de données externe), redirigeant les requêtes vers un nom DNS spécifié

## ClusterIP

Le service de type **ClusterIP** est le type par défaut au sein de Kubernetes. Il permet la communication entre services (pods) à l'intérieur du cluster.

![service-clusterip](/learning/kubernetes/service-clusterip.svg)

1. Le Pod NGINX reçoit une requête de l'extérieur du cluster
2. Le `kube-proxy` intercepte cette requête et interroge le Service **ClusterIP** pour obtenir l'adresse IP interne et le port du Service (http://clusterIP:service-port), et achemine la requête vers le Service en utilisant les règles de routage (iptables ou IPVS)
3. `kube-proxy` écoute le Service **ClusterIP** via l'adresse IP (http://clusterIP:service-port)
4. `kube-proxy` utilise les règles de routage (iptables ou IPVS) pour diriger la requête vers l'un des pods disponibles qui correspond aux critères définis par les sélecteurs du Service

::: info
Le **Service Controller** attribue et gère les adresses IP internes (ClusterIP) pour les Services, et il maintient la synchronisation avec les pods correspondants via les Endpoints associés.
:::

## NodePort

Le service de type **NodePort** s'appuie sur le service de type **ClusterIP**, en l'exposant sur un port configurable dans la plage 30000 à 32767. Cela permet d'accéder au service depuis l'extérieur du cluster.

![service-nodeport](/learning/kubernetes/service-nodeport.svg)

1. Le Pod NGINX reçoit une requête de l'extérieur du cluster
2. Le `kube-proxy` intercepte cette requête et interroge le Service **ClusterIP** pour obtenir l'adresse IP interne et le port du Service (http://clusterIP:service-port), et achemine la requête vers le Service en utilisant les règles de routage (iptables ou IPVS)
3. `kube-proxy` écoute le Service **ClusterIP** via l'adresse IP (http://clusterIP:service-port)
4. `kube-proxy` utilise les règles de routage (iptables ou IPVS) pour diriger la requête vers l'un des pods disponibles qui correspond aux critères définis par les sélecteurs du Service
5. Le Service est accessible via un ou plusieurs ports ouverts sur les **NodePort**, permettant l'accès externe au cluster.

::: info
Le composant `kube-proxy` est responsable de l'écoute sur les ports externes des nodes et du transfert du trafic client du service NodePort vers le **ClusterIP**.
:::

::: info
Le **Service Controller** s'assure que le Service de type NodePort est correctement lié à son Service de type ClusterIP sous-jacent. Il garantit également que les ports NodePort dans la plage spécifiée sont disponibles et correctement configurés.
:::

## LoadBalancer

Le service de type **LoadBalancer** repose sur le service NodePort et ajoute la possibilité de configurer des équilibreurs de charge externes dans des environnements de cloud publics et privés (comme OVH, AWS, etc.). Il expose les services exécutés au sein du cluster en transférant le trafic réseau vers les nœuds du cluster.

:::info
Dans le cloud AWS et GCP, l'équilibreur de charge agit comme un `contrôleur ingress`
:::

![service-loadbalancer](/learning/kubernetes/service-loadbalancer.svg)

1. Lorsqu'un Service de type **LoadBalancer** est créé, Kubernetes envoie une demande au fournisseur de cloud pour provisionner un équilibreur de charge externe avec une adresse IP publique
2. Le contrôleur de Service de Kubernetes identifie les pods associés au Service à l'aide des sélecteurs définis, puis met à jour les Endpoints correspondants pour refléter la liste actuelle des pods disponibles
3. Le control plane interagit avec l'API du fournisseur de cloud pour configurer et déployer l'équilibreur de charge externe, en spécifiant les règles de routage nécessaires pour diriger le trafic entrant vers les nœuds du cluster via les ports NodePort associés.
4. Une fois configuré, l'équilibreur de charge attribue une adresse IP externe. Cette adresse IP est utilisée pour recevoir le trafic externe entrant, qui est ensuite acheminé vers les nœuds du cluster
5. Sur chaque node du cluster, `kube-proxy` configure les règles iptables ou IPVS nécessaires pour rediriger le trafic entrant des ports NodePort vers les pods correspondants qui exécutent le Service

::: tip [MetalLB](https://metallb.universe.tf/)
MetalLB propose une implémentation d'équilibreur de charge réseau qui s'intègre à l'équipement réseau standard, permettant aux services externes sur des clusters bare-metal de fonctionner correctement.
:::

### Stratégies de répartition de charge

| Stratégie | Description |
|-----------|-------------|
| Round Robin | Par défaut, la stratégie utilisée par le LoadBalancer est "Round Robin". Cet algorithme envoie le trafic vers une séquence de pods éligibles dans un ordre prédéterminé, sans tenir compte de la charge actuelle des pods. |
| Least Connections | Cette stratégie envoie le trafic au pod ayant le moins de connexions actives, équilibrant ainsi la charge en fonction de l'utilisation actuelle. |
| Source IP Hash | Utilise un hash de l'adresse IP source pour déterminer le pod de destination, garantissant que les requêtes d'un même client sont envoyées au même pod, ce qui est utile pour les sessions persistantes. |
| Weighted Round Robin | Permet d'attribuer des poids différents aux pods, envoyant plus de trafic vers les pods ayant une capacité supérieure ou une charge moindre. |
| Random | Envoie le trafic vers des pods choisis aléatoirement parmi les pods disponibles. |

## ExternalName

Le service de type **ExternalName** permet de communiquer avec un service situé en dehors du cluster, comme une API externe ou une base de données. Il fonctionne en mappant un nom DNS interne à un nom DNS externe.

![service-externalname](/learning/kubernetes/service-externalname.svg)