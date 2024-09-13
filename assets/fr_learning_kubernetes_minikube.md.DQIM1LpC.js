import{_ as e,c as t,o as i,a1 as s}from"./chunks/framework.CgL1aY5S.js";const p=JSON.parse('{"title":"Minikube","description":"","frontmatter":{},"headers":[],"relativePath":"fr/learning/kubernetes/minikube.md","filePath":"fr/learning/kubernetes/minikube.md"}'),a={name:"fr/learning/kubernetes/minikube.md"},r=s(`<h1 id="minikube" tabindex="-1">Minikube <a class="header-anchor" href="#minikube" aria-label="Permalink to &quot;Minikube&quot;">​</a></h1><p><a href="https://minikube.sigs.k8s.io/docs/" target="_blank" rel="noreferrer">Minikube</a> est un outil qui permet de faire fonctionner Kubernetes localement.</p><h2 id="fonctionnalites" tabindex="-1">Fonctionnalités <a class="header-anchor" href="#fonctionnalites" aria-label="Permalink to &quot;Fonctionnalités&quot;">​</a></h2><h3 id="commandes-de-base" tabindex="-1">Commandes de base <a class="header-anchor" href="#commandes-de-base" aria-label="Permalink to &quot;Commandes de base&quot;">​</a></h3><table><thead><tr><th>Commande</th><th>Description</th></tr></thead><tbody><tr><td><code>minikube start</code></td><td>Démarrer un cluster Minikube.</td></tr><tr><td><code>minikube stop</code></td><td>Arrêter le cluster Minikube.</td></tr><tr><td><code>minikube delete</code></td><td>Supprimer le cluster Minikube.</td></tr><tr><td><code>minikube delete --all</code></td><td>Supprimer tous les clusters Minikube.</td></tr><tr><td><code>minikube status</code></td><td>Afficher l&#39;état du cluster Minikube.</td></tr><tr><td><code>minikube dashboard</code></td><td>Ouvrir le tableau de bord Kubernetes.</td></tr><tr><td><code>minikube ip</code></td><td>Obtenir l&#39;adresse IP du cluster Minikube.</td></tr><tr><td><code>minikube ssh</code></td><td>Accéder à une session SSH dans le cluster.</td></tr><tr><td><code>minikube logs</code></td><td>Afficher les logs du cluster Minikube.</td></tr><tr><td><code>minikube kubectl -- &lt;command&gt;</code></td><td>Exécuter une commande kubectl via Minikube.</td></tr></tbody></table><h3 id="gestion-des-add-ons" tabindex="-1">Gestion des add-ons <a class="header-anchor" href="#gestion-des-add-ons" aria-label="Permalink to &quot;Gestion des add-ons&quot;">​</a></h3><p>Minikube supporte plusieurs add-ons pour enrichir les fonctionnalités de votre cluster local.</p><table><thead><tr><th>Commande</th><th>Description</th></tr></thead><tbody><tr><td><code>minikube addons list</code></td><td>Lister les add-ons disponibles.</td></tr><tr><td><code>minikube addons enable &lt;addon&gt;</code></td><td>Activer un add-on spécifique.</td></tr><tr><td><code>minikube addons disable &lt;addon&gt;</code></td><td>Désactiver un add-on spécifique.</td></tr><tr><td><code>minikube addons configure &lt;addon&gt;</code></td><td>Configurer un add-on spécifique.</td></tr></tbody></table><h3 id="acces-aux-services" tabindex="-1">Accès aux services <a class="header-anchor" href="#acces-aux-services" aria-label="Permalink to &quot;Accès aux services&quot;">​</a></h3><p>Minikube facilite l&#39;accès aux services déployés dans votre cluster.</p><table><thead><tr><th>Commande</th><th>Description</th></tr></thead><tbody><tr><td><code>minikube service &lt;service&gt; --url</code></td><td>Obtenir l&#39;URL d&#39;un service spécifique.</td></tr><tr><td><code>minikube tunnel</code></td><td>Créer un tunnel pour accéder aux services LoadBalancer.</td></tr></tbody></table><h2 id="metrics-server-metrics-server" tabindex="-1">Metrics Server (metrics server) <a class="header-anchor" href="#metrics-server-metrics-server" aria-label="Permalink to &quot;Metrics Server (metrics server)&quot;">​</a></h2><p>Le <strong>Metrics Server</strong> est un add-on qui collecte des métriques de ressources dans Kubernetes. Pour l&#39;activer dans Minikube :</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">minikube</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> addons</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> enable</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> metrics-server</span></span></code></pre></div><h2 id="ingress" tabindex="-1">Ingress <a class="header-anchor" href="#ingress" aria-label="Permalink to &quot;Ingress&quot;">​</a></h2><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">minikube</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> addons</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> enable</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ingress</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">minikube</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> addons</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> enable</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ingress-dns</span></span></code></pre></div><h2 id="alternatives" tabindex="-1">Alternatives <a class="header-anchor" href="#alternatives" aria-label="Permalink to &quot;Alternatives&quot;">​</a></h2><table><thead><tr><th>Alternative</th><th>Description</th></tr></thead><tbody><tr><td><a href="https://k3s.io/" target="_blank" rel="noreferrer">K3s</a></td><td>Distribution légère de Kubernetes.</td></tr><tr><td><a href="https://microk8s.io/" target="_blank" rel="noreferrer">MicroK8s</a></td><td>Distribution légère et rapide de Kubernetes par Canonical.</td></tr></tbody></table>`,18),d=[r];function n(o,l,c,u,h,b){return i(),t("div",null,d)}const m=e(a,[["render",n]]);export{p as __pageData,m as default};