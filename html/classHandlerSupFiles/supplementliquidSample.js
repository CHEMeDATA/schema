
// Auto-generated supplement file for liquidSample
liquidSample_DataEnrichment(targetObjType, dataObj = {}) {
    const myName = "liquidSample_DataEnrichment"; // don't automatize in case 'use strict'
    const myName2 = "liquidSample_DataEnrichment"; // don't automatize in case 'use strict'
    if (targetObjType == "info") {
        return {
            sourceObjType: "liquidSample",
            targetObjType: "NMRliquidSample",
            uniqueHTMLcode: myName2,
            elevatorMethod: myName,
            arrayOfItems: [
                {
            type: "baseType",
            htmlID: "tubeDiameter_mm",
            baseType: "float",
            comment: "Enter a value in mm",
            defaultValue: 5.5,
            randomFrom: 1,
            randomTo: 10,
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
    
        const tubeDiameter_mm = this.#getValOrDefault(dataObj, "tubeDiameter_mm");
        if (tubeDiameter_mm !== undefined) targetObj["tubeDiameter_mm"] = tubeDiameter_mm;

    const content = { content: targetObj };
    if (content && Object.keys(content).length === 0) {console.log("content is empty");return;} 
    const encodedContent = JSON.stringify(content);
    const linkUrl = `https://chemedata.github.io/schema/html/${targetObjType}.html#data=${encodedContent}`;

    document.getElementById(`mergeOutput${dataObj.uniqueHTMLcode}`).textContent = JSON.stringify(targetObj, null, 2);
    window.open(linkUrl, "_blank");
}

//module.exports = liquidSample_DataEnrichment;
