# Getting Started

## Prerequisites

Before you continue, ensure that the following prerequisites are installed on your system:

* [helm](https://helm.sh/docs/intro/install/) we currently require the `3.11` version since it supports the range of k8s version we manage. See [here](https://helm.sh/docs/topics/version_skew/#supported-version-skew)
* [helm-diff plugin](https://github.com/databus23/helm-diff) to be able to diff new configuration with what's currently deployed remotely.
* [helm-secrets plugin](https://github.com/jkroepke/helm-secrets) to be able to store encrypted secrets in the repo and decrypt them before deployment.
* [age](https://age-encryption.org/) this is the 'low-level' encryption tool used to encrypt/decrypt secrets.
* [sops](https://github.com/getsops/sops#encrypting-using-age) this wraps around `age` to encrypt/decrypt yaml values.

## File Structure

```

```

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

3. grant the necessary permissions to execute the scripts:

``` sh
chmod +x ./scripts/*.sh
```

