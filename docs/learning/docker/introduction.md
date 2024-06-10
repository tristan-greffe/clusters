# Introduction to Docker

Docker is a tool based on [containerd](https://containerd.io/) that facilitates the creation and management of containers. Created by [dotCloud](https://dotcloud.co.za/), it is managed by the Open Container Initiative of the Linux Foundation.

## How Docker Works

Docker uses a client-server architecture:

![Docker Operation](/docker-operation.png)

| Component | Description |
|-----------|-------------|
| **Client** | Command-line interface (**docker-cli**) that interacts with the Docker daemon via a REST API. It can also include [Docker Desktop](https://docs.docker.com/desktop/) or the [Python Client](https://docker-py.readthedocs.io/en/stable/index.html) |
| **Docker Daemon** | anages the building, handling of images, and running of containers |
| **Docker Registries**  | Repositories of images, such as [DockerHub](https://hub.docker.com/), or private registries for enterprises |