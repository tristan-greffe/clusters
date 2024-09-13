import{_ as a,D as r,c as o,j as s,I as t,a as i,a1 as n,o as l,aG as d,aH as c}from"./chunks/framework.CgL1aY5S.js";const T=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"fr/learning/kubernetes/objects/volume/persistent-volumes.md","filePath":"fr/learning/kubernetes/objects/volume/persistent-volumes.md"}'),p={name:"fr/learning/kubernetes/objects/volume/persistent-volumes.md"},u={id:"",tabindex:"-1"},h=s("a",{class:"header-anchor",href:"#","aria-label":`Permalink to "<KubernetesIcon icon='/clusters/learning/kubernetes/icons/vol.svg' label='Persistent Volumes' :width='45' :height='45' />"`},"​",-1),k=n('<p>Les <a href="https://kubernetes.io/docs/concepts/storage/persistent-volumes/" target="_blank" rel="noreferrer">Persistent Volumes (PV)</a> sont essentiels pour les applications nécessitant un stockage de données persistantes même après le redémarrage des pods ou des nodes, assurant ainsi la <strong>continuité des données au-delà du cycle de vie des pods</strong>.</p><h2 id="fonctionnement" tabindex="-1">Fonctionnement <a class="header-anchor" href="#fonctionnement" aria-label="Permalink to &quot;Fonctionnement&quot;">​</a></h2><p>Un <code>Persistent Volume (PV)</code> est un espace de stockage fourni par un administrateur dans un cluster. Les développeurs demandent ce stockage en créant un <code>PersistentVolumeClaim (PVC)</code> et en le montant dans un Pod, où le volume répond aux exigences spécifiées telles que la taille et le mode d&#39;accès.</p><p><img src="'+d+'" alt="persistent-volume"></p><ol><li><strong>Définition</strong> : Un fichier de configuration YAML qui définit le <code>PersistentVolume</code>, le <code>PersistentVolumeClaim</code> et le <code>StorageClass</code></li><li><strong>Création</strong> : <strong>kubectl</strong> traduit le fichier YAML en requêtes HTTP REST et les envoie au <code>kube-apiserver</code></li><li><strong>Réception de la demande par kube-apiserver</strong> : Le <code>kube-apiserver</code> valide les configurations des PV, PVC, et StorageClass, puis les persiste dans <code>etcd</code>. Il renvoie ensuite la demande aux autres composants du cluster pour traitement</li><li><strong>Gestion par le PV Controller</strong> : <ul><li><strong>Association PV et PVC</strong> : Le PV Controller tente d&#39;<strong>associer les PV disponibles aux PVC</strong> en fonction des critères spécifiés (capacité, modes d&#39;accès, StorageClass)</li><li><strong>Provisionnement dynamique</strong> : Si un PVC ne trouve pas de PV correspondant et qu&#39;une StorageClass avec un provisionneur est spécifiée, le PV Controller déclenche le <strong>provisionnement dynamique d&#39;un nouveau PV</strong></li></ul></li><li><strong>Liaison du PVC au PV</strong> : Une fois un PV trouvé ou provisionné, <strong>le PV Controller lie le PVC au PV</strong>. Il met à jour les statuts des objets pour refléter cette liaison, indiquant que le PVC est maintenant lié à un PV spécifique</li><li><strong>Utilisation du PVC par les Pods</strong> : <ul><li><strong>Spécification des volumes dans les pods</strong> : Les développeurs <strong>spécifient le PVC dans la section volumes des définitions de <code>pods</code> ou des <code>StatefulSets</code></strong>, permettant ainsi aux pods de monter le stockage persistant fourni par le PV</li><li><strong>Montage des volumes</strong> : Lorsque les pods sont créés, ils <strong>montent les PV via les PVC</strong>, accédant ainsi au stockage défini par le PV</li></ul></li><li><strong>Surveillance et gestion de la politique de récupération</strong> : Le PV Controller applique la <strong>politique de récupération du PV</strong> (Retain, Recycle, Delete) lorsque le PVC est supprimé</li></ol><div class="danger custom-block"><p class="custom-block-title">⚠️ Attention</p><p>K8s ne limite pas les PV à un <code>namespace</code>, ce qui signifie qu&#39;un Pod, dans n&#39;importe quel <code>namespace</code>, peut réclamer un PV</p></div><h3 id="-1" tabindex="-1"><a class="header-anchor" href="#-1" aria-label="Permalink to &quot;&quot;">​</a></h3>',7),g={id:"-2",tabindex:"-1"},m=s("a",{class:"header-anchor",href:"#-2","aria-label":`Permalink to "<KubernetesIcon icon='/clusters/learning/kubernetes/icons/pv.svg' label='PersistentVolume' :width='45' :height='45' />"`},"​",-1),E=n(`<p>Un <code>volume persistant (PV)</code> est une ressource de stockage abstraite dans un cluster, représentant le stockage physique utilisé par les pods. Il peut être provisionné statiquement par les administrateurs ou dynamiquement par Kubernetes.</p><h3 id="provisionnement" tabindex="-1">Provisionnement <a class="header-anchor" href="#provisionnement" aria-label="Permalink to &quot;Provisionnement&quot;">​</a></h3><p>Il existe deux méthodes pour provisionner des PV :</p><ul><li><strong>Provisionnement statique</strong> : Les administrateurs créent des PV à l&#39;avance en utilisant des fichiers manifestes PV, détaillant le stockage disponible pour les pods.</li><li><strong>Provisionnement dynamique</strong> : Kubernetes crée automatiquement des PV lorsqu&#39;un <code>PersistentVolumeClaim (PVC)</code> demande du stockage et qu&#39;aucun PV existant ne correspond aux critères. Cela se fait via les <code>StorageClasses</code>.</li></ul><h3 id="configuration" tabindex="-1">Configuration <a class="header-anchor" href="#configuration" aria-label="Permalink to &quot;Configuration&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">apiVersion</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">v1</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">kind</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">PersistentVolume</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">metadata</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">datascientest-pv</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">spec</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  capacity</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    storage</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">10Gi</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  accessModes</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">ReadWriteOnce</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  hostPath</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    path</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;/mnt/data&quot;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  storageClassName</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">slow</span></span></code></pre></div><table><thead><tr><th><strong>Attribut</strong></th><th><strong>Description</strong></th></tr></thead><tbody><tr><td>➡ <strong><code>capacity</code></strong></td><td>Indique la taille du PV</td></tr><tr><td></td><td></td></tr><tr><td>➡ <a href="https://kubernetes.io/docs/concepts/storage/persistent-volumes/#access-modes" target="_blank" rel="noreferrer"><code>accessModes</code></a></td><td></td></tr><tr><td>ReadWriteOnce</td><td>Accès en lecture-écriture par un seul node</td></tr><tr><td>ReadWriteMany</td><td>Accès en lecture-écriture par plusieurs nodes</td></tr><tr><td>ReadOnlyMany</td><td>Accès en lecture seule par plusieurs nodes</td></tr><tr><td>ReadWriteOncePod</td><td>Accès en lecture-écriture par un seul pod</td></tr><tr><td></td><td></td></tr><tr><td>➡ <a href="https://kubernetes.io/docs/concepts/storage/persistent-volumes/#types-of-persistent-volumes" target="_blank" rel="noreferrer"><code>Type de PV</code></a></td><td></td></tr><tr><td>cephfs</td><td>Volume CephFS</td></tr><tr><td>csi</td><td>Container Storage Interface (CSI)</td></tr><tr><td>fc</td><td>Fibre Channel (FC)</td></tr><tr><td>hostPath</td><td>Volume HostPath (pour les tests à node unique)</td></tr><tr><td>iscsi</td><td>Stockage iSCSI</td></tr><tr><td>local</td><td>Périphériques de stockage locaux montés sur des nodes</td></tr><tr><td>nfs</td><td>Stockage NFS</td></tr><tr><td>rbd</td><td>Volume Rados Block Device (RBD pour Ceph)</td></tr><tr><td></td><td></td></tr><tr><td>➡ <strong><code>storageClassName</code></strong></td><td>nom de la classe de stockage qui liera le PV au PVC de l&#39;utilisateur</td></tr></tbody></table><div class="info custom-block"><p class="custom-block-title">Récupération de volume</p><p>Pour <strong>libérer un PV pour d&#39;autres utilisateurs, supprimez l&#39;objet PVC</strong>. La politique de récupération du PV (Retained, Recycled ou Deleted) détermine ce qu&#39;il advient du PV après sa dissociation du PVC.</p></div>`,8),P={id:"-3",tabindex:"-1"},V=s("a",{class:"header-anchor",href:"#-3","aria-label":`Permalink to "<KubernetesIcon icon='/clusters/learning/kubernetes/icons/pvc.svg' label='PersistentVolumeClaim' :width='45' :height='45' />"`},"​",-1),b=n('<p>Un <code>PersistentVolumeClaim (PVC)</code> est une <strong>requête d&#39;espace de stockage par un utilisateur</strong>. Les PVC permettent de demander des volumes avec des caractéristiques spécifiques, telles que la capacité et les modes d&#39;accès. Les Pods utilisent les PVC pour se connecter aux PV, offrant ainsi une abstraction qui évite aux utilisateurs de se soucier des détails physiques du stockage.</p><div class="info custom-block"><p class="custom-block-title">Protection de stockage en cours d&#39;utilisation</p><p>K8s protège les PV et PVC utilisés par un Pod contre la suppression. Si un PVC est supprimé accidentellement alors qu&#39;il est utilisé, il ne sera pas supprimé tant que le Pod ne l&#39;utilisera plus. De même, un PV lié à un PVC ne sera pas supprimé tant qu&#39;ils ne sont pas dissociés.</p></div><div class="info custom-block"><p class="custom-block-title">Extension de volumes persistants</p><p>Si une application nécessite plus de stockage, <strong>modifiez l&#39;objet PVC pour demander une capacité supérieure à celle du PV</strong> initial.</p></div>',3),v={id:"-4",tabindex:"-1"},C=s("a",{class:"header-anchor",href:"#-4","aria-label":`Permalink to "<KubernetesIcon icon='/clusters/learning/kubernetes/icons/sc.svg' label='StorageClass' :width='45' :height='45' />"`},"​",-1),_=n('<p><img src="'+c+`" alt="storageclass"></p><p>Les objets de type <a href="https://kubernetes.io/docs/concepts/storage/storage-classes/" target="_blank" rel="noreferrer">StorageClass</a> sont utilisés pour <strong>définir les classes de stockage</strong> disponibles au sein de Kubernetes. Ils spécifient les caractéristiques et les paramètres du stockage, tels que les performances, le type de média (HDD, SSD), les politiques de réplication, etc., en fonction des capacités et des configurations prises en charge par les solutions de stockage disponibles dans le fournisseur de cloud, tel qu&#39;AWS.</p><div class="info custom-block"><p class="custom-block-title">INFO</p><p>La plupart des services Kubernetes gérés (EkS , AKS , GKE , etc.) des fournisseurs de cloud fournissent une classe de stockage par défaut lorsque nous configurons un cluster Kubernetes.</p></div><h3 id="provisionnement-dynamique" tabindex="-1">Provisionnement dynamique <a class="header-anchor" href="#provisionnement-dynamique" aria-label="Permalink to &quot;Provisionnement dynamique&quot;">​</a></h3><p>La <code>StorageClass</code> est <strong>utile pour créer des PV dynamiques</strong>. Par exemple, si un Pod nécessite une capacité de stockage de 128 MiB, vous pouvez créer un PVC associé à une StorageClass. Si Kubernetes ne trouve pas de PV correspondant au PVC, la StorageClass crée automatiquement un PV pour répondre aux besoins spécifiés.</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">apiVersion</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">v1</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">kind</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">PersistentVolumeClaim</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">metadata</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">pvc-datascientest</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">spec</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  accessModes</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">ReadWriteOnce</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  storageClassName</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">local-path</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  resources</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    requests</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      storage</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">128Mi</span></span></code></pre></div><p>Lorsque ce manifeste est appliqué, un PV correspondant est créé automatiquement si aucun PV préexistant ne répond aux critères du PVC. La classe de stockage définie dans storageClassName assure que le PV créé correspond aux spécifications de capacité et de configuration définies dans le PVC.</p><div class="danger custom-block"><p class="custom-block-title">⚠️ Attention</p><p>Un PVC peut rester indéfiniment non lié si aucun PV correspondant n&#39;existe ou si la StorageClass associée ne peut pas créer le PV.</p></div>`,8);function y(f,q,S,F,A,D){const e=r("KubernetesIcon");return l(),o("div",null,[s("h1",u,[t(e,{icon:"/clusters/learning/kubernetes/icons/vol.svg",label:"Persistent Volumes",width:45,height:45}),i(),h]),k,s("h2",g,[t(e,{icon:"/clusters/learning/kubernetes/icons/pv.svg",label:"PersistentVolume",width:45,height:45}),i(),m]),E,s("h2",P,[t(e,{icon:"/clusters/learning/kubernetes/icons/pvc.svg",label:"PersistentVolumeClaim",width:45,height:45}),i(),V]),b,s("h2",v,[t(e,{icon:"/clusters/learning/kubernetes/icons/sc.svg",label:"StorageClass",width:45,height:45}),i(),C]),_])}const I=a(p,[["render",y]]);export{T as __pageData,I as default};