import{_ as e,c as t,o as n,a1 as r}from"./chunks/framework.CgL1aY5S.js";const h=JSON.parse('{"title":"Introduction à Kubernetes","description":"","frontmatter":{},"headers":[],"relativePath":"fr/learning/kubernetes/introduction.md","filePath":"fr/learning/kubernetes/introduction.md"}'),s={name:"fr/learning/kubernetes/introduction.md"},o=r('<h1 id="introduction-a-kubernetes" tabindex="-1">Introduction à Kubernetes <a class="header-anchor" href="#introduction-a-kubernetes" aria-label="Permalink to &quot;Introduction à Kubernetes&quot;">​</a></h1><p>Kubernetes, ou k8s en abrégé, est un <strong>orchestrateur de conteneurs</strong> écrit en Go. Conçu par Google, il a été rendu open source sur <a href="https://github.com/kubernetes/kubernetes" target="_blank" rel="noreferrer">GitHub</a> en 2014 et confié à la <a href="https://www.cncf.io/" target="_blank" rel="noreferrer">Cloud Native Computing Foundation</a>.</p><h2 id="les-benefices-de-kubernetes" tabindex="-1">Les bénéfices de Kubernetes <a class="header-anchor" href="#les-benefices-de-kubernetes" aria-label="Permalink to &quot;Les bénéfices de Kubernetes&quot;">​</a></h2><table><thead><tr><th><strong>Bénéfice</strong></th><th><strong>Description</strong></th></tr></thead><tbody><tr><td><strong>Automatisation du déploiement</strong></td><td>Kubernetes automatise le déploiement, la mise à l&#39;échelle et les opérations des applications conteneurisées, offrant un équilibrage de charge, des environnements identiques, et un déploiement continu sécurisé (rolling updates et rollbacks)</td></tr><tr><td><strong>Haute disponibilité</strong></td><td>Assure la <strong>continuité des services sans interruption</strong>, même en cas de défaillance</td></tr><tr><td><strong>Scalabilité automatique</strong></td><td>Ajuste automatiquement la t<strong>aille des services en fonction de la demande</strong>, augmentant ou réduisant les ressources selon les besoins</td></tr><tr><td><strong>Gestion de la charge</strong></td><td>Expose un conteneur via DNS ou une adresse IP, <strong>répartissant la charge</strong> de manière fiable si le trafic est trop élevé</td></tr><tr><td><strong>Gestion d&#39;état et restauration</strong></td><td>Surveille les services et effectue des <strong>réparations automatiques, redémarrant et remplaçant les conteneurs défaillants</strong>, et les détruisant s&#39;ils ne répondent pas aux vérifications de l&#39;état (health checks)</td></tr><tr><td><strong>Portabilité et flexibilité</strong></td><td>Permet d&#39;exécuter des clusters sur des <strong>machines locales ou dans le cloud</strong>, facilitant le changement d&#39;environnement et de fournisseur de cloud</td></tr></tbody></table>',4),a=[o];function i(d,u,l,c,g,b){return n(),t("div",null,a)}const m=e(s,[["render",i]]);export{h as __pageData,m as default};