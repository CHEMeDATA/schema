## Schema

Under construction!

 [index](https://chemedata.github.io/schema/html/index.html)

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


cp /Users/djeanner/git/MnovaJson-reader/src/updateColumnsPositions.js ./html/src_objects/
cp /Users/djeanner/git/MnovaJson-reader/src/updateColumnsAction.js ./html/src_objects/
cp /Users/djeanner/git/MnovaJson-reader/src/updateBlockPosition.js ./html/src_objects/
cp /Users/djeanner/git/MnovaJson-reader/src/assignedCouplings.js ./html/src_objects/
cp /Users/djeanner/git/MnovaJson-reader/src/getJgraphColor.js ./html/src_objects/
cp /Users/djeanner/git/MnovaJson-reader/src/jmolInterface.js ./html/src_objects/
cp /Users/djeanner/git/MnovaJson-reader/src/getJisOK.js ./html/src_objects/

cp /Users/djeanner/git/nmr-objects/dist/JgraphObject.js ./html/src_objects/

cp /Users/djeanner/git/MnovaJson-reader/testSpinFit_assigned/01_assigned_Set.spectra.json data/
cp /Users/djeanner/git/MnovaJson-reader/testSpinFit_assigned/01_assigned_molecule.json data/
cp /Users/djeanner/git/MnovaJson-reader/testSpinFit_assigned/01_assigned_Set.spinFitResult.json data/
# jq '.[0:3]' data/01_assigned_Set.spectra.json > data/01_assigned_Set.spectra.short.json

cp /Users/djeanner/git/MnovaJson-reader/testSpinFit_assigned/01_assigned.mol data/


jq -r --argjson maxDepth 3 '
  paths(scalars) 
  | select(length <= $maxDepth) 
  | map(tostring) 
  | map(select(. | test("^[0-9]+$") | not)) 
  | join(".")
' instances/myFirstJgraphObject.json




```
