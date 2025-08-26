## Schema

Under construction!

Main schema builder repository.

run:

```zsh

echo
echo '****** Create the schema for the objects in v1/schema'
echo
rm -r v1/schema
mkdir -p v1/schema
rm derivations.json
node scripts/createSchemaSomeInstances.js

echo
echo '****** In v1/schemResolved, write a copy of each schema but removed all "allOf" and explicit "$refs" except if would be recursive (which would make infinitely long file)'
echo
rm -r v1/schemaResolved
mkdir -p v1/schemaResolved
node scripts/resolveSchemas.js

rm -r objectsJS
rm -r classHandler
mkdir -p html
mkdir -p objectsJS
mkdir -p classHandler
mkdir -p instances

node scripts/makeElevators.js
node scripts/generateHtmlForSchema.js

wget -O ./all_viewers.json https://raw.githubusercontent.com/chemedata/nmr-objects/main/all_viewers.json
mkdir -p html/src_objects
node scripts/makeFormForReaders.js
echo "get /Users/djeanner/git/MnovaJson-reader/external/ObjectBase.js"
wget -O ./html/src_objects/ObjectBase.js https://raw.githubusercontent.com/chemedata/MnovaJson-reader/main/external/ObjectBase.js
scripts/insertSupplementForFormInObjectClasses.zsh

```

