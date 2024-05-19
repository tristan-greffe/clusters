This repository contains the configuration for the `dev`, `test` &`prod` namespaces. It also contains configuration for the supporting clusters (`staging` and `prod`).

  * `dev` and `test` namespaces are deployed on the `staging` cluster.
  * `prod` namespaces is deployed on the `prod` cluster.

# Prerequisites

Before you continue, ensure that the following prerequisites are installed on your system:

* [helm](https://helm.sh/docs/intro/install/) we currently require the `3.11` version since it supports the range of k8s version we manage. See [here](https://helm.sh/docs/topics/version_skew/#supported-version-skew)
* [helm-diff plugin](https://github.com/databus23/helm-diff) to be able to diff new configuration with what's currently deployed remotely.
* [helm-secrets plugin](https://github.com/jkroepke/helm-secrets) to be able to store encrypted secrets in the repo and decrypt them before deployment.
* [age](https://age-encryption.org/) this is the 'low-level' encryption tool used to encrypt/decrypt secrets.
* [sops](https://github.com/getsops/sops#encrypting-using-age) this wraps around `age` to encrypt/decrypt yaml values.

## First-Time Setup

1. clone this project

```
git clone https://github.com/tristan-greffe/clusters.git
```

2. create an [age](https://age-encryption.org/) keypair for yourself. The private key will be used to decrypt secrets in our projects.

To encrypt/decrypt secrets stored in this repo, you must be added to the list of recipients of the secret files. Start by generating a public/private key pair for yourself:

``` sh
age-keygen -o "clusters/age/keys.txt"
```

The command will print the public key in the terminal; communicate this key to an already authorized developer. This key pair functions like an ID card for yourself. Using the public part, we can encrypt files ensuring you can decrypt them. The private part is used only for decryption and should never be shared. It is stored in the clusters/age/keys.txt file.

> [!WARNING]  
> Register this age keypair in your password manager; it is essential to keep it safe.


# Operations

## Scripts

First, grant the necessary permissions to execute the scripts:

``` sh
chmod +x ./scripts/*.sh
```

### Encrypt / Decrypt

#### Description

Wrappers around sops to encrypt/decrypt files. These scripts take only one parameter: the file to encrypt for `./scripts/encrypt.sh` and the file to decrypt for `./scripts/decrypt.sh`. The wrappers will create an encrypted/decrypted file named as the source file with `.enc` (or `.dec`) inserted between the filename and the extension. No assumptions are made about the input file name conventions.

#### Usage

To encrypt:

``` sh
./scripts/encrypt.sh path/to/file.yaml
```

Will encrypt `path/to/file.yaml` to `path/to/file.enc.yaml`

To decrypt:

``` sh
./scripts/decrypt.sh path/to/file.enc.conf
```

Will decrypt `path/to/file.enc.conf` to `path/to/file.dec.conf`

### Update Secrets

#### Description

This helper command updates the secret files (all matching `*.enc.*`) to reflect changes in the list of recipients in a project's `.sops.yaml` file (i.e., the list of allowed public keys).

#### Usage

``` bash
./scripts/update-secrets.sh
```

This will update all secret files in the `clusters` project.

> [!WARNING]
> Do not use this command to update secrets after editing a secret file, as you will lose your modifications. Instead, use `./scripts/decrypt.sh` to encrypt the updated decrypted file.

## Adding a New Developer

To grant a new developer access, add their public key to the `.sops.yaml` file. This file lists path regexes indicating for each path the recipients (allowed developers) to use when encrypting a file located in the matching path.