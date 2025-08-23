
// Auto-generated supplement file for sample
sample_DataEnrichment(targetObjType, dataObj = {}) {
    const myName = "sample_DataEnrichment"; // don't automatize in case 'use strict'
    if (targetObjType == "info") {
        return {
            sourceObjType: "sample",
            targetObjType: "liquidSample",
            uniqueHTMLcode: myName,
            elevatorMethod: myName,
            arrayOfItems: [
                {
            type: "baseType",
            htmlID: "volume_L",
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
    
        const volume_L = this.#getValOrDefault(dataObj, "volume_L");
        if (volume_L !== undefined) targetObj["volume_L"] = volume_L;

    const content = { content: targetObj };
    const encodedContent = JSON.stringify(content);
    const linkUrl = `https://chemedata.github.io/schema/html/${targetObjType}.html#data=${encodedContent}`;

    document.getElementById(`mergeOutput${dataObj.uniqueHTMLcode}`).textContent = JSON.stringify(targetObj, null, 2);
    window.open(linkUrl, "_blank");
}

//module.exports = sample_DataEnrichment;
