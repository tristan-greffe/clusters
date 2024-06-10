# Creating an image

To create an image, you simply need to create a `Dockerfile` in a directory and execute the `docker build` command in that directory.

## Dockerfile

| Keyword    | Usage                                               |
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

## Create & share an image

```bash
# Build the image
docker image build . -t my_image:latest

# Save the image to an archive
docker image save --output my_docker_image.tar my_image

# Load an image from an archive
docker image load --input my_docker_image.tar
```

To host an image on DockerHub:

1. Create a DockerHub account and log in with `docker login`.
2. Create an image with a two-part name: `username/imagename:tag`.
3. Push the image to DockerHub:

```bash
docker image push username/imagename:tag
```