## Schema

Under construction!

 [index](https://chemedata.github.io/schema/html/index.html)

Main schema builder repository.

run:

```zsh
rm -r ./html/src_objects/
mkdir -p ./html/src_objects/
rm ./all_tools.json

wget -q -O ./all_tools.json https://raw.githubusercontent.com/chemedata/nmr-objects/main/all_tools.json

node scripts/index.js

wget -q -O "./html/src_objects/mnovaJsonReader.js" "https://raw.githubusercontent.com/chemedata/MnovaJson-reader/main/src/mnovaJsonReader.js"

echo "get /Users/djeanner/git/MnovaJson-reader/external/objectBase.js"
wget -q -O "./html/src_objects/objectBase.js" https://raw.githubusercontent.com/chemedata/objects-base/main/src/objectBase.js


echo "get javaScript for jGraphObject viewer" 


echo "get data files for 01_assigned" 
cp /Users/djeanner/git/MnovaJson-reader/testSpinFit_assigned/01_assigned_Set.spectra.json data/
cp /Users/djeanner/git/MnovaJson-reader/testSpinFit_assigned/01_assigned_molecule.json data/
cp /Users/djeanner/git/MnovaJson-reader/testSpinFit_assigned/01_assigned_Set.spinFitResult.json data/

cp /Users/djeanner/git/MnovaJson-reader/testSpinFit_assigned/01_assigned.mol data/


```
