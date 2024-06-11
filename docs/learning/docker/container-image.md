# Container and Image Management

## Start Docker

```bash
sudo service docker start
```

## Docker image management

### Download an image

```bash
docker image pull ubuntu:latest
```

### List available images

```bash
docker image ls
```

- **Displayed Information**:
  - `REPOSITORY`: Image name
  - `TAG`: Label for version differentiation
  - `IMAGE ID`: Unique identifier
  - `CREATED`: Creation date
  - `SIZE`: Size

### Remove an image

```bash
docker image rm <IMAGE ID>
docker rmi <IMAGE ID>
```

## Docker container management

### Run a container
s
```bash
docker container run ubuntu:latest
```

- **Process**:
  - `docker-cli` asks the Docker daemon to run a container based on `ubuntu:latest`.
  - The daemon downloads the image from DockerHub if it's not available locally.
  - The container is launched and produces output.

### List containers

| Command                          | Description                              |
|----------------------------------|------------------------------------------|
| `docker container ls`            | List running containers                  |
| `docker container ls --all`      | List all containers                      |

- **Displayed Information**:
  - `CONTAINER ID`: Unique identifier
  - `IMAGE`: Name of the image used
  - `COMMAND`: Executed command
  - `CREATED`: Launch date
  - `STATUS`: Container status
  - `PORTS`: Network tunnels
  - `NAMES`: Container name

### Run a container

| Argument              | Usage                                                             |
|-----------------------|-------------------------------------------------------------------|
| -it or --interactive  | Interaction with the container                                    |
| -d or --detach        | Run in the background                                             |
| -n or --name          | Name the container                                                |
| --rm                  | Remove the container after stopping                               |
| -e                    | Set an environment variable                                       |
| -p                    | Port mapping                                                      |
| --mount               | Mount a volume to a container (type=volume,src=src_volume,dst=/path_in_container) |

```bash
docker container run -it --rm --name my_ubuntu -e "my_variable=hello_world" ubuntu:latest bash

# Map container ports 9200 and 9300 to host machine ports 9201 and 9301
docker container run -d --rm -p 9201:9200 -p 9301:9300 ubuntu:latest

# With a volume
docker container run -it --name my_ubuntu --mount type=volume,src=my_volume,dst=/home/my_folder --rm ubuntu:latest bash
```

### Container management

| Command                                | Description                                  |
|----------------------------------------|----------------------------------------------|
| `docker container start <ID or NAME>`  | Restart a stopped container                  |
| `docker container start -a <ID or NAME>` | Restart a container with standard output     |
| `docker container stop <ID or NAME>`   | Stop a container                             |
| `docker container rm <ID or NAME>`     | Remove a container                           |
| `docker container prune`               | Remove all stopped containers                |

### Visualization & access

| Command                                            | Description                                            |
|----------------------------------------------------|--------------------------------------------------------|
| `docker container logs <ID or NAME> (-f --tail)`   | View logs of a container                               |
| `docker container exec -it <ID or NAME> bash`      | Access the shell of a running container                |
| `docker container inspect <ID or NAME>`            | Inspect container details                              |
| `docker container inspect <ID or NAME> \| grep IPAddress` | Find the container's IP address                         |

## Data persistence

| Command                                | Description                            |
|----------------------------------------|----------------------------------------|
| `docker volume create --name <VOLUME>` | Create a volume                        |
| `docker volume ls`                     | List volumes                           |
| `docker volume inspect <VOLUME>`       | Inspect a volume                       |
| `docker volume rm <VOLUME>`            | Delete a volume                        |
| `docker volume ls -f dangling=true`    | List all dangling volumes              |
| `docker volume prune`                  | Delete all dangling volumes            |

## Docker system cleanup

| Command                            | Description                                                     |
|------------------------------------|-----------------------------------------------------------------|
| `docker system prune`              | Clean up Docker (stopped containers, networks, unreferenced images, and build caches) |
| `docker system prune -f`           | Force cleanup without confirmation                              |
| `docker system prune --volumes`    | Include volumes in the cleanup                                  |