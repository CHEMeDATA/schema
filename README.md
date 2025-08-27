## Schema

Under construction!

Main schema builder repository.

run:

```zsh

rm ./all_viewers.json

wget -O ./all_viewers.json https://raw.githubusercontent.com/chemedata/nmr-objects/main/all_viewers.json

node scripts/index.js

wget -O "./html/src_objects/mnovaJsonReader.js" "https://raw.githubusercontent.com/chemedata/MnovaJson-reader/main/src/mnovaJsonReader.js"

echo "get /Users/djeanner/git/MnovaJson-reader/external/ObjectBase.js"
wget -O ./html/src_objects/ObjectBase.js https://raw.githubusercontent.com/chemedata/MnovaJson-reader/main/external/ObjectBase.js

cp /Users/djeanner/git/MnovaJson-reader/external/nmrSpectrum.js ./html/src_objects/
cp /Users/djeanner/git/MnovaJson-reader/external/graphBase.js ./html/src_objects/
cp /Users/djeanner/git/MnovaJson-reader/src/nmrAssignement.js ./html/src_objects/

cp /Users/djeanner/git/nmr-objects/dist/JgraphObject.js ./html/src_objects/


```

