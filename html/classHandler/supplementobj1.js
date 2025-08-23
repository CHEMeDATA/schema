
// Auto-generated supplement file for obj1
obj1_DataEnrichment(targetObjType, dataObj = {}) {
    const myName = "obj1_DataEnrichment"; // don't automatize in case 'use strict'
    if (targetObjType == "info") {
        return {
            sourceObjType: "obj1",
            targetObjType: "obj1size",
            uniqueHTMLcode: myName,
            elevatorMethod: myName,
            arrayOfItems: [
                {
            type: "baseType",
            htmlID: "size",
            baseType: "float",
            comment: "undefined",
            defaultValue: undefined,
            randomFrom: undefined,
            randomTo: undefined,
            show: undefined
        }
            ],
        };
    }

    var targetObj = {
        ...this.obj,
        $schema: `https://chemedata.github.io/schema/v1/schema/${targetObjType}.json`,
    };

    // Handle fields dynamically
    
        const size = this.#getValOrDefault(dataObj, "size");
        if (size !== undefined) targetObj["size"] = size;

    const content = { content: targetObj };
    const encodedContent = JSON.stringify(content);
    const linkUrl = `https://chemedata.github.io/schema/html/${targetObjType}.html#data=${encodedContent}`;

    document.getElementById(`mergeOutput${dataObj.uniqueHTMLcode}`).textContent = JSON.stringify(targetObj, null, 2);
    window.open(linkUrl, "_blank");
}

//module.exports = obj1_DataEnrichment;
