
// Auto-generated supplement file for sample
sample_DataEnrichment(targetObjType, dataObj = {}) {
    const myName = "sample_DataEnrichment"; // don't automatize in case 'use strict'
    const myName2 = "sample_DataEnrichment"; // don't automatize in case 'use strict'
    if (targetObjType == "info") {
        return {
            sourceObjType: "sample",
            targetObjType: "liquidSample",
            uniqueHTMLcode: myName2,
            elevatorMethod: myName,
            arrayOfItems: [
                {
            type: "baseType",
            htmlID: "volume_L",
            baseType: "float",
            comment: "Enter a value in L (default 500 ul)",
            defaultValue: 0.0005,
            randomFrom: 1,
            randomTo: 10,
            show: true
        }
            ],
        };
    }
    var targetObj = {
        ...this.obj,
        $schema: `https://chemedata.github.io/schema/v1/schema/${targetObjType.objName}.json`,
    };

    // Handle fields dynamically
    
        const volume_L = this.#getValOrDefault(dataObj, "volume_L");
        if (volume_L !== undefined) targetObj["volume_L"] = volume_L;

    const content = { content: targetObj };
    if (content && Object.keys(content).length === 0) {console.log("content is empty");return;} 
    const encodedContent2 = JSON.stringify(content);
    const linkUrl = `${targetObjType.objName}.html#data=${encodedContent2}`;

    document.getElementById(`mergeOutput${dataObj.uniqueHTMLcode}`).textContent = JSON.stringify(targetObj, null, 2);
    window.open(linkUrl, "_blank");
}

//module.exports = sample_DataEnrichment;
