# Docker Compose

[Docker Compose](https://docs.docker.com/compose/) allows you to **launch a set of Docker containers** simultaneously. It is useful for applications that require multiple containers.

![docker-compose](/learning/docker/docker-compose.png)

## `docker-compose.yml` instructions

| Instruction | Description |
|-------------|-------------|
| `version` | Specifies the version of Docker Compose being used |
| `services`| Defines the different containers of the application |
| `networks`| Defines how services communicate with each other |
| `volumes` | Specifies the volumes mounted in the containers |
| `configs` | Manages configurations injected into the containers |
| `secrets` | Manages secrets injected into the containers |
| `environment variables` | Allows defining variables to configure the behavior of applications |

## Essential commands

| Command                                | Description                                  |
|----------------------------------------|----------------------------------------------|
| `docker-compose up`                    | Deploy the application                       |
| `docker-compose down`                  | Stop services and containers                 |
| `docker-compose restart`               | Restart the services                         |
| `docker-compose ps`                    | Display information about the containers     |
| `docker-compose up --scale web=3`      | Scale a service                              |
| `docker-compose logs <service>`        | Get logs from a service                      |