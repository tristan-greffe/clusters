# The DevOps Stack

`DevOps`, short for Development and Operations, is a set of practices aimed at reducing the gap between software development (Dev) and IT operations (Ops) to improve **collaboration, automate processes, and deliver high-quality software continuously and rapidly**.

![devops](/learning/stack-devops/cycle-devops.png)

## Key Principles

1. **Collaboration and Communication**: Foster a culture of collaboration between development and operations teams.
2. **Automation**: Automate development, testing, deployment, and infrastructure management processes as much as possible.
3. **Continuous Integration (CI)**: Continuously integrate and test code changes to quickly detect and correct bugs.
4. **Continuous Delivery (CD)**: Ensure that validated code is always in a deployable state to production.
5. **Monitoring and Logging**: Monitor and analyze application and infrastructure performance in real-time to proactively detect and resolve issues.
6. **Infrastructure as Code (IaC)**: Manage configurations and infrastructure using scripts and code definitions, ensuring reproducibility and version control.
7. **Continuous Improvement**: Engage in a perpetual cycle of evaluating and improving processes and tools.

## DevOps Cycle

![stack-devops](/learning/stack-devops/stack-devops.svg)

1. **Commit Creation**: Developers save their code locally (development environment).
2. **Push**: Push commits to a remote repository (GitHub, GitLab, etc.).
3. **Continuous Integration (CI)**: Monitor the repository to trigger automated workflows.
4. **Build Server**: Automate code retrieval and application build.
5. **Test Server**: After build validation, execute configured unit tests.
6. **Container Registry**: After test validation, containerize the application and push it to a container registry.
7. **Deployment**: Kubernetes retrieves the new image and deploys new containers for the application.

:::info
If using `GitHub Actions` or `GitLab CI`, the **build and test servers is managed by their cloud solution**, often combined on the same server.
:::

:::info
Typically, before deploying to production servers, **end-to-end tests are conducted on a specific cluster**
:::

## DevOps Tools

| Category             | Tools                              | Description |
|----------------------|------------------------------------|-------------|
| **CI/CD** | GitHub Actions, GitLab CI, Travis CI, Jenkins | These tools monitor commits and launch a continuous integration pipeline that can compile code, run tests, etc. Upon successful testing, they deploy changes to a production environment (staging, testing, prod). |
| **Container Registries** | Docker Hub, Harbor | Cloud service platforms for storing and utilizing containerized application images. |
| **Container Orchestration** | Kubernetes, Docker Swarm | Platforms that automate the deployment, scaling, and management of containerized applications, providing a framework to orchestrate and coordinate containers within a cloud environment. |
| **Monitoring** | Grafana | Platform for data visualization and analysis, creating interactive dashboards to monitor and analyze real-time data from various sources, often used alongside Prometheus. |
| | Prometheus | Monitoring and alerting system that collects and stores real-time metrics from applications and systems, aiding in troubleshooting and performance monitoring by gathering server performance and status data. |
| **Automation** | Ansible | Open-source automation tool that enables configuration management, application deployment, and task orchestration, simplifying server setup and management (firewall, cron, etc.). |
| | Terraform | Open-source Infrastructure as Code (IaC) tool for defining and provisioning data center infrastructures using a declarative language, facilitating cloud resource management and orchestration. |