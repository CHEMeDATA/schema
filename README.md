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
node scripts/updateSchema.js

echo
echo '****** In v1/schemResolved, write a copy of each schema but removed all "allOf" and explicit "$refs" except if would be recursive (which would make infinitely long file)'
echo
rm -r v1/schemaResolved
mkdir -p v1/schemaResolved
node scripts/resolveSchemas.js

rm -r html
rm -r objectsJS
rm -r classHandler
mkdir -p html
mkdir -p objectsJS
mkdir -p classHandler
mkdir -p instances

node scripts/generateHtmlForSchema.js



```

