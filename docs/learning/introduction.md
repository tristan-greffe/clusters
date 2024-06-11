# The DevOps Stack

DevOps, or development operations, is a set of practices aimed at bridging the gap between software development (Dev) and IT operations (Ops).

## Key Principles

- **Continuous Integration (CI)**
- **Continuous Delivery (CD)**
- **Infrastructure as Code (IaC)**
- **Monitoring and Logging**

## DevOps Tools

![foo bar](/learning/stack-devops/stack-devops.svg#light-mode-only)
![foo bar](/learning/stack-devops/stack-devops-dark.svg#dark-mode-only)

| Category             | Tools                             | Description |
|----------------------|-----------------------------------|-------------|
| **CI/CD**            | GitHub Actions, GitLab CI, Travis CI, Jenkins | These tools monitor commits and trigger a continuous integration pipeline that can compile code, run tests, etc. If all tests pass, they deploy changes to a production environment (staging, test, prod). |
| **Container Registries** | Docker Hub, Harbor               | Cloud service platforms that allow storing and using containerized application images. |
| **Container Orchestration** | Kubernetes, Docker Swarm        | Platforms that automate the deployment, scaling, and management of containerized applications, providing a framework to orchestrate and coordinate containers within a cloud environment. |
| **Monitoring**       | Grafana                           | Platform for data visualization and analysis, enabling the creation of interactive and comprehensive dashboards to monitor and analyze real-time data from various sources, often used with Prometheus. |
|                      | Prometheus                        | Monitoring and alerting system that collects and stores application and system metrics in real-time, helping in problem detection and resolution by collecting data on server performance and status. |
| **Automation**       | Ansible                           | Open-source automation tool that facilitates configuration management, application deployment, and task orchestration, making it easier to configure and manage servers (firewall, cron, etc.). |
|                      | Terraform                         | Open-source Infrastructure as Code (IaC) tool that allows defining and provisioning data center infrastructure using a declarative configuration language, simplifying cloud resource management and orchestration. |