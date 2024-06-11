# La Stack DevOps

Le DevOps, ou développement opérationnel, est un ensemble de pratiques visant à réduire le fossé entre le développement logiciel (Dev) et les opérations informatiques (Ops).

## Les Principes Clés

- **Intégration continue (CI)**
- **Livraison continue (CD)**
- **Infrastructure en tant que code (IaC)**
- **Surveillance et journalisation**

## Les Outils DevOps

![foo bar](/learning/stack-devops/stack-devops.svg#light-mode-only)
![foo bar](/learning/stack-devops/stack-devops-dark.svg#dark-mode-only)

| Catégorie             | Outils                            | Description |
|-----------------------|-----------------------------------|-------------|
| **CI/CD**             | GitHub Actions, GitLab CI, Travis CI, Jenkins | Ces outils surveillent les commits et lancent un pipeline d'intégration continue qui peut compiler du code, exécuter des tests, etc. Si tous les tests réussissent, ils déploient les changements sur un environnement de production (staging, test, prod). |
| **Container Registries** | Docker Hub, Harbor               | Plateformes de service cloud qui permettent de stocker et d'utiliser des images d'applications conteneurisées. |
| **Container Orchestration** | Kubernetes, Docker Swarm        | Plateformes qui automatisent le déploiement, la mise à l'échelle et la gestion des applications conteneurisées, offrant un cadre pour orchestrer et coordonner des conteneurs au sein d'un environnement cloud. |
| **Monitoring**        | Grafana                           | Plateforme pour la visualisation et l'analyse de données, permettant de créer des tableaux de bord interactifs et compréhensifs pour surveiller et analyser en temps réel les données provenant de diverses sources, souvent en conjonction avec Prometheus. |
|                       | Prometheus                        | Système de surveillance et d'alerte qui collecte et stocke les métriques d'applications et de systèmes en temps réel, aidant à la détection et à la résolution de problèmes en collectant des données sur les performances et le statut des serveurs. |
| **Automation**        | Ansible                           | Outil d'automatisation open source qui permet la gestion de configuration, le déploiement d'applications et l'orchestration de tâches, facilitant la configuration et la gestion des serveurs (pare-feu, cron, etc.). |
|                       | Terraform                         | Outil d'infrastructure en tant que code (IaC) open source qui permet de définir et de fournir des infrastructures de centres de données en utilisant un langage de description déclaratif, facilitant la gestion et l'orchestration des ressources cloud. |