# Operations

## Scripts

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