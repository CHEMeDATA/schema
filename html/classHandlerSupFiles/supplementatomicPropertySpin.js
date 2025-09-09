
// Auto-generated supplement file for atomicPropertySpin
atomicPropertySpin_DataEnrichment(targetObjType, dataObj = {}) {
    const myName = "atomicPropertySpin_DataEnrichment"; // don't automatize in case 'use strict'
    const myName2 = "atomicPropertySpin_DataEnrichment"; // don't automatize in case 'use strict'
    if (targetObjType == "info") {
        return {
            sourceObjType: "atomicPropertySpin",
            targetObjType: "atomicPropertySpinMatch",
            uniqueHTMLcode: myName2,
            elevatorMethod: myName,
            arrayOfItems: [
                {
            type: "baseType",
            htmlID: "curQuality",
            baseType: "qualityClass",
            comment: "undefined",
            defaultValue: undefined,
            randomFrom: undefined,
            randomTo: undefined,
            show: true
        },
{
            type: "baseType",
            htmlID: "satisfactory",
            baseType: "bool",
            comment: "Is the match with the experimental spectrum satisfactory ?",
            defaultValue: 10,
            randomFrom: 1,
            randomTo: 10,
            show: true
        },
{
            type: "baseType",
            htmlID: "stepNumber",
            baseType: "int",
            comment: "Step number in parameter optimization",
            defaultValue: 1,
            randomFrom: undefined,
            randomTo: undefined,
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
    
        const curQuality = this.#getValOrDefault(dataObj, "curQuality");
        if (curQuality !== undefined) targetObj["curQuality"] = curQuality;

        const satisfactory = this.#getValOrDefault(dataObj, "satisfactory");
        if (satisfactory !== undefined) targetObj["satisfactory"] = satisfactory;

        const stepNumber = this.#getValOrDefault(dataObj, "stepNumber");
        if (stepNumber !== undefined) targetObj["stepNumber"] = stepNumber;

    const content = { content: targetObj };
    if (content && Object.keys(content).length === 0) {console.log("content is empty");return;} 
    const encodedContent2 = JSON.stringify(content);
    const linkUrl = `${targetObjType.objName}.html#data=${encodedContent2}`;

    document.getElementById(`mergeOutput${dataObj.uniqueHTMLcode}`).textContent = JSON.stringify(targetObj, null, 2);
    window.open(linkUrl, "_blank");
}

//module.exports = atomicPropertySpin_DataEnrichment;
