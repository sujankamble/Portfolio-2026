#!/bin/bash
set -euo pipefail

if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

if ! command -v gh &> /dev/null; then
  apt-get update -qq || true
  apt-get install -y gh
fi
