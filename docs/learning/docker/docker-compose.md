# Docker Compose

[Docker Compose](https://docs.docker.com/compose/) allows you to launch a set of Docker containers simultaneously. It is useful for applications that require multiple containers.

## Using Docker Compose

| Command                                | Description                                  |
|----------------------------------------|----------------------------------------------|
| `docker-compose up`                    | Deploy the application                       |
| `docker-compose down`                  | Stop services and containers                 |
| `docker-compose restart`               | Restart the services                         |
| `docker-compose ps`                    | Display information about the containers     |
| `docker-compose up --scale web=3`      | Scale a service                              |
| `docker-compose logs <service>`        | Get logs from a service                      |

## `docker-compose.yml` File

This file contains the necessary configurations for running your containers. Here is an example structure:

| Element              | Description                                                                                  |
|----------------------|----------------------------------------------------------------------------------------------|
| `version`            | Specifies the version of Docker Compose being used                                           |
| `services`           | Defines the different containers of the application                                          |
| `networks`           | Defines how services communicate with each other                                             |
| `volumes`            | Specifies the volumes mounted in the containers                                              |
| `configs`            | Manages configurations injected into the containers                                          |
| `secrets`            | Manages secrets injected into the containers                                                 |
| `environment variables` | Allows defining variables to configure the behavior of applications                        |

### Example

```yaml
version: '3'
services:
  frontend:
    image: example/webapp
    ports:
      - "443:8043"
    networks:
      - front-tier
      - back-tier
    configs:
      - httpd-config
    secrets:
      - server-certificate

  backend:
    image: example/database
    volumes:
      - db-data:/etc/data
    networks:
      - back-tier

volumes:
  db-data:
    driver: flocker
    driver_opts:
      size: "10GiB"

configs:
  httpd-config:
    external: true

secrets:
  server-certificate:
    external: true

networks:
  front-tier: {}
  back-tier: {}
```