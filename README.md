## Schema

Under construction!

Main schema builder repository.

run:

```zsh
rm -r v1/schema
rm -r v1/schemaResolved
mkdir -p v1/schema
echo
echo '****** Create the schema for the objects in v1/schema'
echo

node scripts/updateSchema.js

echo
echo '****** In v1/schemResolved, write a copy of each schema but removed all "allOf" and explicit "$refs" except if would be recursive (which would make infinitely long file)'
echo

mkdir -p v1/schemaResolved

node scripts/resolveSchemas.js
```

