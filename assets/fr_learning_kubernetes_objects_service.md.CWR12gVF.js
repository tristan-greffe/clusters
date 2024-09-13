import{_ as t,D as s,c as i,j as e,I as o,a as n,a1 as a,o as l,aA as u,aB as c,aC as d,aD as p,aE as g}from"./chunks/framework.CgL1aY5S.js";const N=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"fr/learning/kubernetes/objects/service.md","filePath":"fr/learning/kubernetes/objects/service.md"}'),v={name:"fr/learning/kubernetes/objects/service.md"},m={id:"",tabindex:"-1"},b=e("a",{class:"header-anchor",href:"#","aria-label":`Permalink to "<KubernetesIcon icon='/clusters/learning/kubernetes/icons/svc.svg' label='Service' :width='45' :height='45' />"`},"​",-1),h=a('<p>Comme les pods sont des objets éphémères, il peut être complexe de les atteindre directement. C&#39;est là qu&#39;interviennent les Services. Un <a href="https://kubernetes.io/docs/concepts/services-networking/service/" target="_blank" rel="noreferrer">service</a> est une couche d&#39;abstraction qui définit des règles permettant d&#39;<strong>exposer une application sous la forme d&#39;un ou de plusieurs pods</strong>. Les Services utilisent des labels (étiquettes) et des sélecteurs (selectors) pour identifier et sélectionner les pods à exposer.</p><p><img src="'+u+'" alt="service"></p><p>Il existe plusieurs types de Services pour exposer les applications :</p><ul><li><strong>ClusterIP</strong> (par défaut) : Expose le Service sur une adresse IP interne au cluster, rendant le Service accessible uniquement à l&#39;intérieur du cluster</li><li><strong>NodePort</strong> : Expose le Service sur un port statique d&#39;un node, permettant l&#39;accès au Service depuis l&#39;extérieur du cluster en utilisant l&#39;IP du&#39;une node et le port spécifié</li><li><strong>Loadbalancer</strong> : Expose le Service à l’extérieur du cluster en utilisant l’équilibreur de charge d’un fournisseur de cloud, attribuant une IP publique pour l&#39;accès externe</li><li><strong>ExternalName</strong> : Mappe le Service à un nom DNS externe (par exemple, l&#39;API d&#39;OpenAI ou une base de données externe), redirigeant les requêtes vers un nom DNS spécifié</li></ul><h2 id="clusterip" tabindex="-1">ClusterIP <a class="header-anchor" href="#clusterip" aria-label="Permalink to &quot;ClusterIP&quot;">​</a></h2><p>Le service de type <strong>ClusterIP</strong> est le type par défaut au sein de Kubernetes. Il permet la communication entre services (pods) à l&#39;intérieur du cluster.</p><p><img src="'+c+'" alt="service-clusterip"></p><ol><li>Le Pod NGINX reçoit une requête de l&#39;extérieur du cluster</li><li>Le <code>kube-proxy</code> intercepte cette requête et interroge le Service <strong>ClusterIP</strong> pour obtenir l&#39;adresse IP interne et le port du Service (<a href="http://clusterIP" target="_blank" rel="noreferrer">http://clusterIP</a>:service-port), et achemine la requête vers le Service en utilisant les règles de routage (iptables ou IPVS)</li><li><code>kube-proxy</code> écoute le Service <strong>ClusterIP</strong> via l&#39;adresse IP (<a href="http://clusterIP" target="_blank" rel="noreferrer">http://clusterIP</a>:service-port)</li><li><code>kube-proxy</code> utilise les règles de routage (iptables ou IPVS) pour diriger la requête vers l&#39;un des pods disponibles qui correspond aux critères définis par les sélecteurs du Service</li></ol><div class="info custom-block"><p class="custom-block-title">INFO</p><p>Le <strong>Service Controller</strong> attribue et gère les adresses IP internes (ClusterIP) pour les Services, et il maintient la synchronisation avec les pods correspondants via les Endpoints associés.</p></div><h2 id="nodeport" tabindex="-1">NodePort <a class="header-anchor" href="#nodeport" aria-label="Permalink to &quot;NodePort&quot;">​</a></h2><p>Le service de type <strong>NodePort</strong> s&#39;appuie sur le service de type <strong>ClusterIP</strong>, en l&#39;exposant sur un port configurable dans la plage 30000 à 32767. Cela permet d&#39;accéder au service depuis l&#39;extérieur du cluster.</p><p><img src="'+d+'" alt="service-nodeport"></p><ol><li>Le Pod NGINX reçoit une requête de l&#39;extérieur du cluster</li><li>Le <code>kube-proxy</code> intercepte cette requête et interroge le Service <strong>ClusterIP</strong> pour obtenir l&#39;adresse IP interne et le port du Service (<a href="http://clusterIP" target="_blank" rel="noreferrer">http://clusterIP</a>:service-port), et achemine la requête vers le Service en utilisant les règles de routage (iptables ou IPVS)</li><li><code>kube-proxy</code> écoute le Service <strong>ClusterIP</strong> via l&#39;adresse IP (<a href="http://clusterIP" target="_blank" rel="noreferrer">http://clusterIP</a>:service-port)</li><li><code>kube-proxy</code> utilise les règles de routage (iptables ou IPVS) pour diriger la requête vers l&#39;un des pods disponibles qui correspond aux critères définis par les sélecteurs du Service</li><li>Le Service est accessible via un ou plusieurs ports ouverts sur les <strong>NodePort</strong>, permettant l&#39;accès externe au cluster.</li></ol><div class="info custom-block"><p class="custom-block-title">INFO</p><p>Le composant <code>kube-proxy</code> est responsable de l&#39;écoute sur les ports externes des nodes et du transfert du trafic client du service NodePort vers le <strong>ClusterIP</strong>.</p></div><div class="info custom-block"><p class="custom-block-title">INFO</p><p>Le <strong>Service Controller</strong> s&#39;assure que le Service de type NodePort est correctement lié à son Service de type ClusterIP sous-jacent. Il garantit également que les ports NodePort dans la plage spécifiée sont disponibles et correctement configurés.</p></div><h2 id="loadbalancer" tabindex="-1">LoadBalancer <a class="header-anchor" href="#loadbalancer" aria-label="Permalink to &quot;LoadBalancer&quot;">​</a></h2><p>Le service de type <strong>LoadBalancer</strong> repose sur le service NodePort et ajoute la possibilité de configurer des équilibreurs de charge externes dans des environnements de cloud publics et privés (comme OVH, AWS, etc.). Il expose les services exécutés au sein du cluster en transférant le trafic réseau vers les nœuds du cluster.</p><div class="info custom-block"><p class="custom-block-title">INFO</p><p>Dans le cloud AWS et GCP, l&#39;équilibreur de charge agit comme un <code>contrôleur ingress</code></p></div><p><img src="'+p+'" alt="service-loadbalancer"></p><ol><li>Lorsqu&#39;un Service de type <strong>LoadBalancer</strong> est créé, Kubernetes envoie une demande au fournisseur de cloud pour provisionner un équilibreur de charge externe avec une adresse IP publique</li><li>Le contrôleur de Service de Kubernetes identifie les pods associés au Service à l&#39;aide des sélecteurs définis, puis met à jour les Endpoints correspondants pour refléter la liste actuelle des pods disponibles</li><li>Le control plane interagit avec l&#39;API du fournisseur de cloud pour configurer et déployer l&#39;équilibreur de charge externe, en spécifiant les règles de routage nécessaires pour diriger le trafic entrant vers les nœuds du cluster via les ports NodePort associés.</li><li>Une fois configuré, l&#39;équilibreur de charge attribue une adresse IP externe. Cette adresse IP est utilisée pour recevoir le trafic externe entrant, qui est ensuite acheminé vers les nœuds du cluster</li><li>Sur chaque node du cluster, <code>kube-proxy</code> configure les règles iptables ou IPVS nécessaires pour rediriger le trafic entrant des ports NodePort vers les pods correspondants qui exécutent le Service</li></ol><div class="tip custom-block"><p class="custom-block-title"><a href="https://metallb.universe.tf/" target="_blank" rel="noreferrer">MetalLB</a></p><p>MetalLB propose une implémentation d&#39;équilibreur de charge réseau qui s&#39;intègre à l&#39;équipement réseau standard, permettant aux services externes sur des clusters bare-metal de fonctionner correctement.</p></div><h3 id="strategies-de-repartition-de-charge" tabindex="-1">Stratégies de répartition de charge <a class="header-anchor" href="#strategies-de-repartition-de-charge" aria-label="Permalink to &quot;Stratégies de répartition de charge&quot;">​</a></h3><table><thead><tr><th>Stratégie</th><th>Description</th></tr></thead><tbody><tr><td>Round Robin</td><td>Par défaut, la stratégie utilisée par le LoadBalancer est &quot;Round Robin&quot;. Cet algorithme envoie le trafic vers une séquence de pods éligibles dans un ordre prédéterminé, sans tenir compte de la charge actuelle des pods.</td></tr><tr><td>Least Connections</td><td>Cette stratégie envoie le trafic au pod ayant le moins de connexions actives, équilibrant ainsi la charge en fonction de l&#39;utilisation actuelle.</td></tr><tr><td>Source IP Hash</td><td>Utilise un hash de l&#39;adresse IP source pour déterminer le pod de destination, garantissant que les requêtes d&#39;un même client sont envoyées au même pod, ce qui est utile pour les sessions persistantes.</td></tr><tr><td>Weighted Round Robin</td><td>Permet d&#39;attribuer des poids différents aux pods, envoyant plus de trafic vers les pods ayant une capacité supérieure ou une charge moindre.</td></tr><tr><td>Random</td><td>Envoie le trafic vers des pods choisis aléatoirement parmi les pods disponibles.</td></tr></tbody></table><h2 id="externalname" tabindex="-1">ExternalName <a class="header-anchor" href="#externalname" aria-label="Permalink to &quot;ExternalName&quot;">​</a></h2><p>Le service de type <strong>ExternalName</strong> permet de communiquer avec un service situé en dehors du cluster, comme une API externe ou une base de données. Il fonctionne en mappant un nom DNS interne à un nom DNS externe.</p><p><img src="'+g+'" alt="service-externalname"></p>',26);function f(P,x,I,S,q,_){const r=s("KubernetesIcon");return l(),i("div",null,[e("h1",m,[o(r,{icon:"/clusters/learning/kubernetes/icons/svc.svg",label:"Service",width:45,height:45}),n(),b]),h])}const y=t(v,[["render",f]]);export{N as __pageData,y as default};