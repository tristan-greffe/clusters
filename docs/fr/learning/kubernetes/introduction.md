# Introduction à Kubernetes

Kubernetes, ou k8s en abrégé, est un orchestrateur de conteneurs écrit en Go. Conçu par Google, il a été rendu open source sur [GitHub](https://github.com/kubernetes/kubernetes) en 2014 et confié à la [Cloud Native Computing Foundation](https://www.cncf.io/).

## Les bénéfices de Kubernetes

| **Bénéfice** | **Description** |
|--------------|-----------------|
| **Automatisation du déploiement** | Kubernetes automatise le déploiement, la mise à l'échelle et les opérations des applications conteneurisées, offrant un équilibrage de charge, des environnements identiques, et un déploiement continu sécurisé (rolling updates et rollbacks) |
| **Haute disponibilité** | Assure la continuité des services sans interruption, même en cas de défaillance |
| **Scalabilité automatique** | Ajuste automatiquement la taille des services en fonction de la demande, augmentant ou réduisant les ressources selon les besoins |
| **Gestion de la charge**   | Expose un conteneur via DNS ou une adresse IP, répartissant la charge de manière fiable si le trafic est trop élevé |
| **Gestion d'état et restauration** | Surveille les services et effectue des réparations automatiques, redémarrant et remplaçant les conteneurs défaillants, et les détruisant s'ils ne répondent pas aux vérifications de l'état (health checks) |
| **Portabilité et flexibilité** | Permet d'exécuter des clusters sur des machines locales ou dans le cloud, facilitant le changement d'environnement et de fournisseur de cloud |
| **Gestion des conteneurs** | Assure la surveillance et la réparation automatique des services, redémarrant, remplaçant et détruisant les conteneurs échoués ou non conformes aux vérifications de l'état (health checks) |