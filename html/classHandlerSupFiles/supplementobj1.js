
// Auto-generated supplement file for obj1
obj1_DataEnrichment(targetObjType, dataObj = {}) {
    const myName = "obj1_DataEnrichment"; // don't automatize in case 'use strict'
    const myName2 = "obj1_DataEnrichment"; // don't automatize in case 'use strict'
    if (targetObjType == "info") {
        return {
            sourceObjType: "obj1",
            targetObjType: "obj1size",
            uniqueHTMLcode: myName2,
            elevatorMethod: myName,
            arrayOfItems: [
                {
            type: "baseType",
            htmlID: "size",
            baseType: "float",
            comment: "Enter a value in m (default 1.91m)",
            defaultValue: 1.91,
            randomFrom: 1.4,
            randomTo: 2.1,
            show: true
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
    if (content && Object.keys(content).length === 0) {console.log("content is empty");return;} 
    const encodedContent2 = JSON.stringify(content);
    const linkUrl = `${targetObjType}.html#data=${encodedContent2}`;

    document.getElementById(`mergeOutput${dataObj.uniqueHTMLcode}`).textContent = JSON.stringify(targetObj, null, 2);
    window.open(linkUrl, "_blank");
}

//module.exports = obj1_DataEnrichment;
