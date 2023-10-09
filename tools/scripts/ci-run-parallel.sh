#!/usr/bin/env bash

set -euo pipefail

pids=()

# list of commands to be run on main has env flag NX_CLOUD_DISTRIBUTED_EXECUTION set to false
NX_CLOUD_DISTRIBUTED_EXECUTION=false yarn nx-cloud record -- yarn nx format:check &
pids+=($!)

# list of commands to be run on agents
yarn nx affected --target=lint --parallel=3 &
pids+=($!)
yarn nx affected --target=test --parallel=3 &
pids+=($!)
yarn nx affected --target=build --parallel=3 &
pids+=($!)

# run all commands in parallel and bail if one of them fails
for pid in ${pids[*]}; do
  if ! wait $pid; then
    exit 1
  fi
done

exit 0
