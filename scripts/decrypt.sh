#!/usr/bin/env bash
set -euo pipefail

ENCRYPTED_FILE="$1"
THIS_FILE=$(readlink -f "${BASH_SOURCE[0]}")
THIS_PATH=$(dirname "$THIS_FILE")
ROOT_PATH=$(dirname "$THIS_PATH")

#####################
##### FUNCTIONS #####
#####################

## Build the decrypted filename from an encrypted filename
## It'll insert a .dec. between filename and extension
enc2dec () {
  local ENCRYPTED_FILE="$1"

  local BASENAME
  BASENAME="$(basename "$ENCRYPTED_FILE")"
  local FILENAME="${BASENAME%%.*}"
  local EXTENSION="${BASENAME##*.}"

  printf "%s/%s.dec.%s" "$(dirname "$ENCRYPTED_FILE")" "$FILENAME" "$EXTENSION"
}

################
##### MAIN #####
################

DECRYPTED_FILE="$(enc2dec "$ENCRYPTED_FILE")"

SOPS_AGE_KEY_FILE="$ROOT_PATH/age/keys.txt" sops --decrypt --output "$DECRYPTED_FILE" "$ENCRYPTED_FILE"