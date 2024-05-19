#!/usr/bin/env bash
set -euxo pipefail

THIS_FILE=$(readlink -f "${BASH_SOURCE[0]}")
THIS_PATH=$(dirname "$THIS_FILE")
ROOT_PATH=$(dirname "$THIS_PATH")

export SOPS_AGE_KEY_FILE="$ROOT_PATH/age/keys.txt" 

#####################
##### FUNCTIONS #####
#####################

# Decrypts given encrypted file ($1) and the encrypt it again
update_secret() {
  local ENC="$1"

  local BASENAME
  BASENAME="$(basename "$ENC")"
  local FILENAME="${BASENAME%%.*}"
  local EXTENSION="${BASENAME##*.}"

  local DEC
  DEC="$(dirname "$ENC")/${FILENAME}.dec.${EXTENSION}"

  # The decrypt phase uses the SOPS_AGE_KEY_FILE key file to decrypt.
  # You must have been added to the list of recipients to be able to decrypt using your private key.
  sops --decrypt --output "$DEC" "$ENC"
  # The encrypt phase uses rules in the .sops.yaml file to determine who may decrypt (the recipients).
  sops --encrypt --output "$ENC" "$DEC"
}

# kubeconfigs
update_secret "$ROOT_PATH/clusters/staging/kubeconfig.enc.yaml"

# dev
#update_secret "$ROOT_PATH/namespaces/dev/secret.enc.yaml"
# test
#update_secret "$ROOT_PATH/namespaces/test/secret.enc.yaml"

