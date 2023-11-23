 The equation of the shapes were tested in shapes.c program and the equations extracted from it to create the md files and json using the following script.
 
 Compile and use:

 ```bash
 echo "compile and test shapes.c"
 gcc shapes.c -lm 
 ./a.out
 echo "Extract equations from shapes.c"
 lorE=$(cat shapes.c | grep lorentzian-peak-type | cut -d';' -f1 | sed s/return//g | sed 's/^[ \t]*//' | sed 's/[\/&]/\\&/g')
 gauE=$(cat shapes.c | grep gaussian-peak-type | cut -d';' -f1 | sed s/return//g | sed 's/^[ \t]*//' | sed 's/[\/&]/\\&/g')
 genlorE=$(cat shapes.c | grep genlor-peak-type | cut -d';' -f1 | sed s/return//g | sed 's/^[ \t]*//' | sed 's/[\/&]/\\&/g')
 gausslorenE=$(cat shapes.c | grep gaussloren-peak-type | cut -d';' -f1 | sed s/return//g | sed 's/^[ \t]*//' | sed 's/[\/&]/\\&/g')

 echo "Set shape names"
 lorentzian="Lorentzian shape"
 gaussian="Gaussian shape"
 genlor="Generalized Lorentzian shape"
 gaussloren="Gaussian-Lorentzian shape"

echo "set shapes and equations in peak-type.md"

cat source/peak-type.md | \
 sed s/__lorentzian-peak-type__/$lorE/g | \
 sed s/__gaussian-peak-type__/$gauE/g | \
 sed s/__genlor-peak-type__/$genlorE/g | \
 sed s/__gaussloren-peak-type__/$gausslorenE/g | \
 sed s/__lorentzian__/$lorentzian/g | \
 sed s/__gaussian__/$gaussian/g | \
 sed s/__gaussloren__/$gaussloren/g | \
 sed s/__genlor__/$genlor/g | \
 cat > ../peak-type.md

echo "set shapes and equations in peak-list.md"

cat source/peak-list.md | \
 sed s/__lorentzian-peak-type__/$lorE/g | \
 sed s/__gaussian-peak-type__/$gauE/g | \
 sed s/__genlor-peak-type__/$genlorE/g | \
 sed s/__gaussloren-peak-type__/$gausslorenE/g | \
 sed s/__lorentzian__/$lorentzian/g | \
 sed s/__gaussian__/$gaussian/g | \
 sed s/__gaussloren__/$gaussloren/g | \
 sed s/__genlor__/$genlor/g | \
 cat > ../peak-list.md

echo "extracting json from peak-list.md file"

awk '/peaklist-delta-schema = /,/```/{if(!/```/) print}' ../peak-list.md | tail -n +2 > ../peaklist-delta.schema.json
awk '/peaklist-shape-schema = /,/```/{if(!/```/) print}' ../peak-list.md | tail -n +2 > ../peaklist-shape.schema.json
awk '/peak-norm-equ-schema = /,/```/{if(!/```/) print}' ../peak-type.md | tail -n +2 > ../peak-norm-equ.schema.json

 ```
