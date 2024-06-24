# La Stack DevOps

Le `DevOps`, ou développement opérationnel, est un ensemble de pratiques visant à réduire le fossé entre le développement logiciel (Dev) et les opérations informatiques (Ops) pour améliorer **la collaboration entre les équipes, automatiser les processus, et livrer des logiciels de haute qualité de manière continue et rapide**.

![devops](/learning/stack-devops/cycle-devops.png)

## Les Principes Clés

1. **Collaboration et communication** : Favoriser une culture de collaboration entre les équipes de développement et d'exploitation.
2. **Automatisation** : Automatiser autant que possible les processus de développement, de test, de déploiement et de gestion des infrastructures.
3. **Intégration continue (CI)** : Intégrer et tester les modifications de code de manière continue pour détecter et corriger les bugs rapidement.
4. **Livraison continue (CD)** : Assurer que le code validé est toujours en état de déploiement en production.
5. **Surveillance et logging** : Suivre et analyser les performances des applications et des infrastructures en temps réel pour détecter et résoudre les problèmes proactivement.
6. **Infrastructure as Code (IaC)** : Gérer les configurations et l'infrastructure à l'aide de scripts et de définitions de code, facilitant ainsi la reproductibilité et la gestion des versions.
7. **Amélioration continue** : S'engager dans un cycle perpétuel d'évaluation et d'amélioration des processus et des outils.

## Cycle DevOps

![stack-devops](/learning/stack-devops/stack-devops.svg)

1. **Création du Commit**: Les développeurs sauvegardent leur code localement (environnement de développement)
2. **Push**: Envoie des commits vers un dépôt distant (GitHub, GitLab, etc.)
3. **CI (Continuous Integration)**: Surveille le dépôt pour déclencher des workflows automatisés
4. **Serveur de Build**:  Automatise la récupération du code et le buil de l'application
5. **Serveur de Test** : Après validation du build, exécute les tests unitaires configurés 
6. **Registre de Conteneurs** :  Après la validation des tests, l'application est conteneurisée et envoyée vers un registre de conteneurs
7. **Déploiement**: Kubernetes récupère la nouvelle image et déploie les nouveaux conteneurs pour l'application

:::info
Si `GitHub Actions` ou `GitLab CI` sont utilisés, **les serveurs de build et de test est géré par leur solution cloud**, souvent regroupés sur le même serveur.
:::

:::info
Généralement, avant de déployer sur les serveurs de production, des **tests e2e sont effectués sur un cluster spécifique**
:::

## Outils DevOps

| Catégorie             | Outils                            | Description |
|-----------------------|-----------------------------------|-------------|
| **CI/CD** | GitHub Actions, GitLab CI, Travis CI, Jenkins | Ces outils surveillent les commits et lancent un pipeline d'intégration continue qui peut compiler du code, exécuter des tests, etc. Si tous les tests réussissent, ils déploient les changements sur un environnement de production (staging, test, prod) |
| **Container Registries** | Docker Hub, Harbor | Plateformes de service cloud qui permettent de stocker et d'utiliser des images d'applications conteneurisées |
| **Container Orchestration** | Kubernetes, Docker Swarm | Plateformes qui automatisent le déploiement, la mise à l'échelle et la gestion des applications conteneurisées, offrant un cadre pour orchestrer et coordonner des conteneurs au sein d'un environnement cloud |
| **Monitoring** | Grafana | Plateforme pour la visualisation et l'analyse de données, permettant de créer des tableaux de bord interactifs et compréhensifs pour surveiller et analyser en temps réel les données provenant de diverses sources, souvent en conjonction avec Prometheus |
| | Prometheus | Système de surveillance et d'alerte qui collecte et stocke les métriques d'applications et de systèmes en temps réel, aidant à la détection et à la résolution de problèmes en collectant des données sur les performances et le statut des serveurs |
| **Automation** | Ansible | Outil d'automatisation open source qui permet la gestion de configuration, le déploiement d'applications et l'orchestration de tâches, facilitant la configuration et la gestion des serveurs (pare-feu, cron, etc.) |
| | Terraform | Outil d'infrastructure en tant que code (IaC) open source qui permet de définir et de fournir des infrastructures de centres de données en utilisant un langage de description déclaratif, facilitant la gestion et l'orchestration des ressources cloud |