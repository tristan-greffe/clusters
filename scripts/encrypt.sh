#!/usr/bin/env bash
set -euo pipefail

DECRYPTED_FILE="$1"
THIS_FILE=$(readlink -f "${BASH_SOURCE[0]}")
THIS_PATH=$(dirname "$THIS_FILE")
ROOT_PATH=$(dirname "$THIS_PATH")

#####################
##### FUNCTIONS #####
#####################

## Build the encrypted filename from a decrypted filename
## It'll insert a .enc. between filename and extension
dec2enc () {
  local DECRYPTED_FILE="$1"

  local BASENAME
  BASENAME="$(basename "$DECRYPTED_FILE")"
  local FILENAME="${BASENAME%%.*}"
  local EXTENSION="${BASENAME##*.}"

  printf "%s/%s.enc.%s" "$(dirname "$DECRYPTED_FILE")" "$FILENAME" "$EXTENSION"
}

################
##### MAIN #####
################

ENCRYPTED_FILE="$(dec2enc "$DECRYPTED_FILE")"

# Jump into decrypted file's dir because SOPS looks for .sops.yaml file
# starting from the current working directory.
cd "$(dirname "$DECRYPTED_FILE")"
SOPS_AGE_KEY_FILE="$ROOT_PATH/age/keys.txt" sops --encrypt --output "$(basename "$ENCRYPTED_FILE")" "$(basename "$DECRYPTED_FILE")"