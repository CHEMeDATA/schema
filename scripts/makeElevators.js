const fs = require("fs");
const path = require("path");

/**
 * Generates a supplement file for the given className and config.
 * @param {string} className - The class name for the function and file.
 * @param {Object} config - Configuration object containing base, derived, and fieldsToAdd.
 */
function generateSupplementFile(className, config) {
    const fileName = `supplement${className}.js`;
    const { base, derived, fieldsToAdd } = config;

    // Generate arrayOfItems content from fieldsToAdd
    const arrayOfItems = fieldsToAdd.map(field => {
        return `{
            type: "baseType",
            htmlID: "${field.name}",
            baseType: "${field.type}",
            comment: "${field.userRequest}",
            defaultValue: ${field.defaultValue},
            randomFrom: ${field.randomFrom},
            randomTo: ${field.randomTo},
            show: ${field.show}
        }`;
    }).join(",\n");

    // Generate field handling loop
    const fieldLoop = fieldsToAdd.map(field => {
        return `
        const ${field.name} = this.#getValOrDefault(dataObj, "${field.name}");
        if (${field.name} !== undefined) targetObj["${field.name}"] = ${field.name};`;
    }).join("\n");

    // Template for the function
    const content = `
// Auto-generated supplement file for ${className}
function ${className}_DataEnrichment(targetObjType, dataObj = {}) {
    const myName = "${className}_DataEnrichment"; // don't automatize in case 'use strict'
    if (targetObjType == "info") {
        return {
            sourceObjType: "${base}",
            targetObjType: "${derived}",
            uniqueHTMLcode: myName,
            elevatorMethod: myName,
            arrayOfItems: [
                ${arrayOfItems}
            ],
        };
    }

    var targetObj = {
        ...this.obj,
        $schema: \`https://chemedata.github.io/schema/v1/schema/\${targetObjType}.json\`,
    };

    // Handle fields dynamically
    ${fieldLoop}

    const content = { content: targetObj };
    const encodedContent = JSON.stringify(content);
    const linkUrl = \`https://chemedata.github.io/schema/html/\${targetObjType}.html#data=\${encodedContent}\`;

    document.getElementById(\`mergeOutput\${dataObj.uniqueHTMLcode}\`).textContent = JSON.stringify(targetObj, null, 2);
    window.open(linkUrl, "_blank");
}

module.exports = ${className}_DataEnrichment;
`;

    // Write the file
    fs.writeFileSync(path.join(__dirname, fileName), content, "utf8");
    console.log(`✅ File ${fileName} created successfully.`);
}

// Example usage:
const config = {
    base: "liquidSample",
    derived: "NMRliquidSample",
    fieldsToAdd: [
        {
            name: "tubeDiameter_mm",
            mandatory: true,
            type: "float",
            userRequest: "Enter a value in mm",
            defaultValue: 5.5,
            randomFrom: 1,
            randomTo: 10,
            show: true
        }
    ]
};

generateSupplementFile("myDataEnrichment1", config);
