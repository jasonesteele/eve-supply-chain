#!/usr/bin/env bash

parent_path=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
cd "$parent_path"

export TMPDIR=/tmp/eve-supply-chain-$$
rm -rf $TMPDIR
mkdir -p $TMPDIR

export DATADIR=${TMPDIR}/data

# Extract YAML from the static data export
unzip $1 '*.yaml' -d $DATADIR

# Convert YAML
for file in `find $DATADIR -name '*.yaml'`; do
  echo "Converting $file to JSON..."
  ruby -ryaml -rjson -e 'puts JSON.pretty_generate(YAML.load(ARGF))' < ${file} > ${file%.yaml}.json
done

# Strip out converted yaml files
find $DATADIR -type f -name '*.yaml' |xargs rm

# Copy results
rm -rf ../src/client/assets/sde
mv $DATADIR/sde ../src/client/assets

echo rm -rf $TMPDIR
