#!/usr/bin/env zsh
#!/bin/zsh

# Directory to scan
classHandlserDir="./html/classHandler"

# Loop over files starting with "supplement"
for file in "$classHandlserDir"/supplement*.js; do
    # Ensure it's a file
    [[ -f $file ]] || continue

    # Show the file name
    echo "Supplement file: $(basename $file)"

    # Extract the second part of the filename
    # "supplementNMRspectrumObject.js" → "NMRspectrumObject"
    objectName=$(basename $file .js)
    objectName=${objectName#supplement}

    echo "Object name: $objectName"

    # Check if corresponding Object.js exists
    objectFile="./html/classHandler/${objectName}Handler.js"
    if [[ -f $objectFile ]]; then
        echo "✅ Object file exists: $objectFile"
    else
        echo "❌ Object file missing: $objectFile"
    fi

	echo "Insertions of $file in $objectFile"
	echo "-------------------------"

	cat "$objectFile" \
	  | sed '/\/\/ AUTOMATIC METHOD INSERTION WILL BE MADE HERE/r '"$file" \
	  > "$objectFile_tmp.txt"
	mv "$objectFile_tmp.txt" "$objectFile"
done

echo