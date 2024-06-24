# Dockerfile

To create an image, you simply need to **create a [Dockerfile](https://docs.docker.com/reference/dockerfile/)** in a directory and **execute the `docker build` command** in that directory.

![dockerfile](/learning/docker/dockerfile.png)

## Dockerfile instructions

| Instruction    | Description                                               |
|------------|-----------------------------------------------------|
| `FROM`     | Choose the base image (e.g., `FROM ubuntu:latest`)  |
| `RUN`      | Execute a bash command (e.g., `RUN apt-get update`) |
| `ADD`      | Copy a file from the host machine to the image      |
| `WORKDIR`  | Change the current directory                        |
| `EXPOSE`   | Expose a container port                             |
| `CMD`      | Specify the command to run at startup               |
| `ENTRYPOINT` | Define the container entry point                  |
| `ENV`      | Set environment variables                           |
| `VOLUME`   | Create mount points                                 |
| `LABEL`    | Add metadata to the image                           |

## Essential commands

```bash
# Build the image
docker image build . -t my_image:latest

# Save the image to an archive
docker image save --output my_docker_image.tar my_image

# Load an image from an archive
docker image load --input my_docker_image.tar

# Push the image to DockerHub
docker image push username/my_image:tag
```