## Schema

Under construction!

 [index](https://chemedata.github.io/schema/html/index.html)

Main schema builder repository.

run:

```zsh

rm ./all_viewers.json

wget -q -O ./all_viewers.json https://raw.githubusercontent.com/chemedata/nmr-objects/main/all_viewers.json

node scripts/index.js

wget -q -O "./html/src_objects/mnovaJsonReader.js" "https://raw.githubusercontent.com/chemedata/MnovaJson-reader/main/src/mnovaJsonReader.js"

echo "get /Users/djeanner/git/MnovaJson-reader/external/ObjectBase.js"
wget -q -O "./html/src_objects/objectBase.js" https://raw.githubusercontent.com/chemedata/objects-base/main/src/objectBase.js

cat /Users/djeanner/git/MnovaJson-reader/external/nmrSpectrum.js | sed 's/graphBase.js/viewerBase.js/g' | sed 's/GraphBase/ViewerBase/g' > ./html/src_objects/nmrSpectrum.js
cp /Users/djeanner/git/viewers-base/src/viewerBase.js ./html/src_objects/

cat /Users/djeanner/git/MnovaJson-reader/src/nmrAssignement.js | sed 's/graphBase.js/viewerBase.js/g' | sed 's/GraphBase/ViewerBase/g' > ./html/src_objects/nmrAssignement.js
cp hidden/jGraphViewer.js ./html/src_objects/

echo "get javaScript for jGraphObject viewer" 

cp /Users/djeanner/git/MnovaJson-reader/src/updateColumnsPositions.js ./html/src_objects/
cp /Users/djeanner/git/MnovaJson-reader/src/updateColumnsAction.js ./html/src_objects/
cp /Users/djeanner/git/MnovaJson-reader/src/updateBlockPosition.js ./html/src_objects/
cp /Users/djeanner/git/MnovaJson-reader/src/assignedCouplings.js ./html/src_objects/
cp /Users/djeanner/git/MnovaJson-reader/src/getJgraphColor.js ./html/src_objects/
cp /Users/djeanner/git/MnovaJson-reader/src/jmolInterface.js ./html/src_objects/
cp /Users/djeanner/git/MnovaJson-reader/src/getJisOK.js ./html/src_objects/

cat /Users/djeanner/git/nmr-objects/dist/jGraphObject.js |  sed 's/ObjectBase.js/objectBase.js/g' > ./html/src_objects/jGraphObject.js

echo "get data files for 01_assigned" 
cp /Users/djeanner/git/MnovaJson-reader/testSpinFit_assigned/01_assigned_Set.spectra.json data/
cp /Users/djeanner/git/MnovaJson-reader/testSpinFit_assigned/01_assigned_molecule.json data/
cp /Users/djeanner/git/MnovaJson-reader/testSpinFit_assigned/01_assigned_Set.spinFitResult.json data/

cp /Users/djeanner/git/MnovaJson-reader/testSpinFit_assigned/01_assigned.mol data/


```
