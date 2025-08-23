
// Auto-generated supplement file for liquidSample
function liquidSample_DataEnrichment(targetObjType, dataObj = {}) {
    const myName = "liquidSample_DataEnrichment"; // don't automatize in case 'use strict'
    if (targetObjType == "info") {
        return {
            sourceObjType: "liquidSample",
            targetObjType: "NMRliquidSample",
            uniqueHTMLcode: myName,
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
    
    const content = { content: targetObj };
    const encodedContent = JSON.stringify(content);
    const linkUrl = `https://chemedata.github.io/schema/html/${targetObjType}.html#data=${encodedContent}`;

    document.getElementById(`mergeOutput${dataObj.uniqueHTMLcode}`).textContent = JSON.stringify(targetObj, null, 2);
    window.open(linkUrl, "_blank");
}

module.exports = liquidSample_DataEnrichment;
