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
wget -q -O./html/src_objects/ObjectBase.js https://raw.githubusercontent.com/chemedata/MnovaJson-reader/main/external/ObjectBase.js

cp /Users/djeanner/git/MnovaJson-reader/external/nmrSpectrum.js ./html/src_objects/
cp /Users/djeanner/git/MnovaJson-reader/external/graphBase.js ./html/src_objects/
cp /Users/djeanner/git/MnovaJson-reader/src/nmrAssignement.js ./html/src_objects/

echo "get javaScript for jGraphObject viewer" 

cp /Users/djeanner/git/MnovaJson-reader/src/updateColumnsPositions.js ./html/src_objects/
cp /Users/djeanner/git/MnovaJson-reader/src/updateColumnsAction.js ./html/src_objects/
cp /Users/djeanner/git/MnovaJson-reader/src/updateBlockPosition.js ./html/src_objects/
cp /Users/djeanner/git/MnovaJson-reader/src/assignedCouplings.js ./html/src_objects/
cp /Users/djeanner/git/MnovaJson-reader/src/getJgraphColor.js ./html/src_objects/
cp /Users/djeanner/git/MnovaJson-reader/src/jmolInterface.js ./html/src_objects/
cp /Users/djeanner/git/MnovaJson-reader/src/getJisOK.js ./html/src_objects/

cp /Users/djeanner/git/nmr-objects/dist/jGraphObject.js ./html/src_objects/

echo "get data files for 01_assigned" 
cp /Users/djeanner/git/MnovaJson-reader/testSpinFit_assigned/01_assigned_Set.spectra.json data/
cp /Users/djeanner/git/MnovaJson-reader/testSpinFit_assigned/01_assigned_molecule.json data/
cp /Users/djeanner/git/MnovaJson-reader/testSpinFit_assigned/01_assigned_Set.spinFitResult.json data/

cp /Users/djeanner/git/MnovaJson-reader/testSpinFit_assigned/01_assigned.mol data/


```
