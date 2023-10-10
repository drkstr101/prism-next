#!/usr/bin/env bash
#
# Install base dependencies needed to run cypress in a debian nodejs container

set -euo pipefail

apt-get update

DEBIAN_FRONTEND=noninteractive apt-get install --no-install-recommends -yq \
  libgtk2.0-0 \
  libgtk-3-0 \
  libnotify-dev \
  libgconf-2-4 \
  libgbm-dev \
  libnss3 \
  libxss1 \
  libasound2 \
  libxtst6 \
  xauth \
  xvfb \
  vim-tiny \
  nano \
  fonts-noto-color-emoji \
  fonts-arphic-bkai00mp \
  fonts-arphic-bsmi00lp \
  fonts-arphic-gbsn00lp \
  fonts-arphic-gkai00mp \
  fonts-arphic-ukai \
  fonts-arphic-uming \
  ttf-wqy-zenhei \
  ttf-wqy-microhei \
  xfonts-wqy

# clean up
rm -rf /var/lib/apt/lists/*
apt-get clean
