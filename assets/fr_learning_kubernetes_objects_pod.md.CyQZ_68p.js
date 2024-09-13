import{_ as i,D as a,c as t,j as s,I as n,a as o,a1 as r,o as l,ax as d,ay as p}from"./chunks/framework.CgL1aY5S.js";const q=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"fr/learning/kubernetes/objects/pod.md","filePath":"fr/learning/kubernetes/objects/pod.md"}'),c={name:"fr/learning/kubernetes/objects/pod.md"},h={id:"",tabindex:"-1"},u=s("a",{class:"header-anchor",href:"#","aria-label":`Permalink to "<KubernetesIcon icon='/clusters/learning/kubernetes/icons/pod.svg' label='Pod' :width='45' :height='45' />"`},"​",-1),k=r('<p>Un <a href="https://kubernetes.io/docs/concepts/workloads/pods/" target="_blank" rel="noreferrer">Pod</a> est l&#39;unité de base de déploiement dans Kubernetes, représentant une <strong>instance unique d&#39;une application ou d&#39;un container</strong>. Il encapsule un ou plusieurs containers ainsi que des ressources de stockage, une adresse IP et des règles sur la manière dont les containers doivent fonctionner.</p><h2 id="caracteristiques-des-pods" tabindex="-1">Caractéristiques des Pods : <a class="header-anchor" href="#caracteristiques-des-pods" aria-label="Permalink to &quot;Caractéristiques des Pods :&quot;">​</a></h2><p><img src="'+d+`" alt="pods"></p><ul><li>Une <strong>adresse IP</strong> unique pour la communication entre les Pods</li><li>Des <strong>volumes de stockage</strong> persistants selon les besoins</li><li>Des informations de <strong>configuration</strong> définissant le comportement des containers</li></ul><div class="tip custom-block"><p class="custom-block-title">Pod multi-containers</p><p>Tous les containers d&#39;un Pod partagent le même environnement : mémoire, volumes, pile réseau et l&#39;adresse IP.</p></div><h2 id="fonctionnement" tabindex="-1">Fonctionnement <a class="header-anchor" href="#fonctionnement" aria-label="Permalink to &quot;Fonctionnement&quot;">​</a></h2><p>Les Pods sont créés et gérés par des ressources de charge de travail appelées <strong>contrôleurs</strong> (tels que <code>Deployments</code>, <code>DaemonSets</code>, <code>StatefulSets</code>, etc.). Ces contrôleurs automatisent la gestion du cycle de vie des Pods, incluant :</p><ul><li>Le remplacement des Pods défaillants</li><li>La réplication des Pods selon les besoins</li><li>L&#39;éviction des Pods lorsqu&#39;ils sont terminés ou inutiles</li></ul><p>Les contrôleurs s&#39;assurent également que les Pods en cours d&#39;exécution <strong>correspondent au déploiement défini</strong> dans le modèle de Pod. Ils vérifient l&#39;état des ressources déployées et maintiennent la stabilité de ces ressources même en cas de panne, comme la perte d&#39;une node.</p><div class="info custom-block"><p class="custom-block-title">INFO</p><p>Un Pod peut également contenir des containers d&#39;initialisation qui s&#39;exécutent lors de son démarrage.</p></div><h2 id="ressources" tabindex="-1">Ressources <a class="header-anchor" href="#ressources" aria-label="Permalink to &quot;Ressources&quot;">​</a></h2><h3 id="request" tabindex="-1">Request <a class="header-anchor" href="#request" aria-label="Permalink to &quot;Request&quot;">​</a></h3><p>Les <code>requests</code> définissent la <code>quantité minimale et initials de ressources (CPU &amp; memory)</code> allouées à un container. Par exemple, une application peut utiliser plus de 256 Mo de mémoire, mais k8s garantira un minimum de 256 Mo au container en fonction de la demande.</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">resources</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  requests</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    memory</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;64Mi&quot;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    cpu</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;250m&quot;</span></span></code></pre></div><h3 id="limits" tabindex="-1">Limits <a class="header-anchor" href="#limits" aria-label="Permalink to &quot;Limits&quot;">​</a></h3><p>Les <code>limits</code> définissent la <strong>quantité maximale de ressources (CPU &amp; memory)</strong> qu&#39;un container donné peut consommer. Notre application peut nécessiter au moins 256 Mo de mémoire, mais nous voudrons peut-être nous assurer qu&#39;elle ne consomme pas plus de 512 Mo de mémoire, c&#39;est-à-dire limiter sa consommation de mémoire à 512 Mo.</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">resources</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  limits</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    memory</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;128Mi&quot;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    cpu</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;500m&quot;</span></span></code></pre></div><h2 id="health-checks-probes" tabindex="-1">Health checks (Probes) <a class="header-anchor" href="#health-checks-probes" aria-label="Permalink to &quot;Health checks (Probes)&quot;">​</a></h2><p>Les health checks (ou probes) permettent de <strong>vérifier l&#39;état des containers dans un pod</strong>. Kubernetes propose trois types de probes : <code>Startup Probe</code>, <code>Liveness Probe</code> &amp; <code>Readiness Probe</code>. Ces probes sont des <strong>actions de diagnostic</strong> effectuées par le <code>kubelet</code> pour s&#39;assurer du bon fonctionnement des Pods.</p><img src="`+p+`" alt="probes" style="width:100%;display:block;margin:0 auto;"><ol><li><code>Startup Probe</code> se lance en premier</li><li>Une fois la <code>Startup Probe</code> réussie, les <code>Liveness Probes</code> &amp; <code>Readiness Probes</code> se lancent</li><li>En cas d&#39;échec d&#39;une action de diagnostic, <code>kubelet</code> envoie un rapport au serveur d&#39;API Kubernetes</li></ol><h3 id="startup-probe" tabindex="-1">Startup Probe <a class="header-anchor" href="#startup-probe" aria-label="Permalink to &quot;Startup Probe&quot;">​</a></h3><p>La <code>Startup Probe</code> est utilisée pour déterminer si une <strong>application conteneurisée a démarré correctement</strong>. En cas d&#39;échec, k8s considère que le container n&#39;a pas démarré correctement et le redémarrera conformément à la politique de redémarrage du pod.</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">startupProbe</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  httpGet</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    path</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/healthz</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    port</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">8080</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  initialDelaySeconds</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">10</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  periodSeconds</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">10</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  failureThreshold</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">30</span></span></code></pre></div><div class="info custom-block"><p class="custom-block-title">INFO</p><p>La <code>Startup Probe</code> utilise une requête HTTP GET pour vérifier la santé de l&#39;application</p></div><div class="info custom-block"><p class="custom-block-title">INFO</p><p>Utile pour les applications qui ont des temps de démarrage longs ou complexes</p></div><h3 id="liveness-probe" tabindex="-1">Liveness Probe <a class="header-anchor" href="#liveness-probe" aria-label="Permalink to &quot;Liveness Probe&quot;">​</a></h3><p>La <code>Liveness Probe</code> <strong>vérifie si le Pod est en cours d&#39;exécution</strong>. Si la probe échoue, le Pod est redémarré selon sa politique de redémarrage. Elle permet de savoir <strong>quand redémarrer un container</strong> lorsqu&#39;il est en échec. L&#39;état par défaut de LivenessProbe est Success.</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">livenessProbe</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  tcpSocket</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    port</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">80</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  initialDelaySeconds</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">5</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  periodSeconds</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">5</span></span></code></pre></div><div class="info custom-block"><p class="custom-block-title">INFO</p><p>La <code>Liveness Probe</code> utilise une simple vérification TCP pour tester si l&#39;application écoute sur le port 80</p></div><h3 id="readiness-probe" tabindex="-1">Readiness Probe <a class="header-anchor" href="#readiness-probe" aria-label="Permalink to &quot;Readiness Probe&quot;">​</a></h3><p>La <code>Readiness Probe</code> vérifie si l&#39;<strong>application est prête à répondre aux requêtes</strong>. Si la probe échoue, l&#39;adresse IP du Pod est retirée de la liste des points de terminaison du service. Elle permet de savoir quand un <strong>container est prêt à recevoir du trafic</strong>. L&#39;état par défaut du ReadinessProbe est Success.</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">readinessProbe</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  failureThreshold</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">3</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  httpGet</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    path</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/test.html</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    port</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">80</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    scheme</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">HTTP</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  initialDelaySeconds</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">5</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  periodSeconds</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">3</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  successThreshold</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span></span></code></pre></div><div class="info custom-block"><p class="custom-block-title">INFO</p><p>La <code>Readiness Probe</code> utilise une requête HTTP GET pour vérifier que l&#39;application peut répondre sur le chemin spécifié</p></div><h3 id="configuration" tabindex="-1">Configuration <a class="header-anchor" href="#configuration" aria-label="Permalink to &quot;Configuration&quot;">​</a></h3><p>Les probes se configurent dans les spécifications des pods. Voici les principaux paramètres :</p><table><thead><tr><th>Paramètre</th><th>Description</th></tr></thead><tbody><tr><td><code>initialDelaySeconds</code></td><td>Temps en secondes après le démarrage du container avant le début des probes (par défaut : 0)</td></tr><tr><td><code>periodSeconds</code></td><td>Fréquence en secondes à laquelle la vérification est effectuée (par défaut : 10 secondes, min : 1)</td></tr><tr><td><code>timeoutSeconds</code></td><td>Temps en secondes après lequel le test est considéré comme échoué (par défaut et min : 1 seconde)</td></tr><tr><td><code>successThreshold</code></td><td>Nombre minimum de succès consécutifs pour que la probe soit considérée réussie après un échec (par défaut et min : 1)</td></tr><tr><td><code>failureThreshold</code></td><td>Nombre minimum d&#39;échecs consécutifs pour que la probe soit considérée échouée</td></tr><tr><td><code>terminationGracePeriodSeconds</code></td><td>Temps de grâce en secondes pendant lequel kubelet attend avant de forcer l&#39;arrêt d&#39;un container</td></tr></tbody></table><table><thead><tr><th>Types d&#39;Actions</th><th>Paramètre</th><th>Description</th></tr></thead><tbody><tr><td><strong>TCPSocketAction</strong></td><td><code>tcpSocket</code></td><td>Vérifie l&#39;état d&#39;un port particulier sur le Pod. La probe réussit si le port est ouvert</td></tr><tr><td><strong>HTTPGetAction</strong></td><td><code>httpGet</code></td><td>Exécute une requête GET sur l&#39;IP du Pod. La probe réussit si le code de réponse est compris entre 200 et 399</td></tr><tr><td><strong>ExecAction</strong></td><td><code>exec</code></td><td>Exécute une commande à l&#39;intérieur du Pod. La probe réussit si la commande renvoie un code de sortie 0.</td></tr></tbody></table>`,38);function m(g,E,b,y,P,v){const e=a("KubernetesIcon");return l(),t("div",null,[s("h1",h,[n(e,{icon:"/clusters/learning/kubernetes/icons/pod.svg",label:"Pod",width:45,height:45}),o(),u]),k])}const C=i(c,[["render",m]]);export{q as __pageData,C as default};