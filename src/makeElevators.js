// scripts/makeElevators.js
import fs from "fs";
import path from "path";
import { classHandlerDir, derivationsFile } from "../scripts/config.js";
const urlLocalOrGithub = ""; // "https://chemedata.github.io/schema/html/" // ${urlLocalOrGithub}

// ES module __dirname equivalent

// Generate supplement file for a given class
function generateSupplementFile(config) {
	const { base, derived, fieldsToAdd } = config;
    console.log(`---------EEE generate supplement file for derivation of ${base} into ${derived}`)

	const className = base;
	const fileName = `supplement${className}.js`;

	// Generate arrayOfItems content from fieldsToAdd
	const arrayOfItems = fieldsToAdd
		.map((field) => {
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
		})
		.join(",\n");

	// Generate field handling loop
	const fieldLoop = fieldsToAdd
		.map((field) => {
			return `
        const ${field.name} = this.#getValOrDefault(dataObj, "${field.name}");
        if (${field.name} !== undefined) targetObj["${field.name}"] = ${field.name};`;
		})
		.join("\n");

	// Template for the function
	const content = `
// Auto-generated supplement file for ${className}
${className}_DataEnrichment(targetObjType, dataObj = {}) {
    const myName = "${className}_DataEnrichment"; // don't automatize in case 'use strict'
    const myName2 = "${className}_DataEnrichment"; // don't automatize in case 'use strict'
    if (targetObjType == "info") {
        return {
            sourceObjType: "${base}",
            targetObjType: "${derived}",
            uniqueHTMLcode: myName2,
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
    if (content && Object.keys(content).length === 0) {console.log("content is empty");return;} 
    const encodedContent2 = JSON.stringify(content);
    const linkUrl = \`${urlLocalOrGithub}\${targetObjType}.html#data=\${encodedContent2}\`;

    document.getElementById(\`mergeOutput\${dataObj.uniqueHTMLcode}\`).textContent = JSON.stringify(targetObj, null, 2);
    window.open(linkUrl, "_blank");
}

//module.exports = ${className}_DataEnrichment;
`;
    console.log(`---------EEE generate supplement file for derivation  into ${path.join(classHandlerSupFiles, fileName)}`)

	fs.writeFileSync(path.join(classHandlerSupFiles, fileName), content, "utf8");
	console.log(`✅ File ${fileName} created successfully.`);
}

// Main function
export async function runElevators() {
    console.log(`--------- runElevators ---------`)
	try {
		const raw = fs.readFileSync(derivationsFile, "utf8");
		const data = JSON.parse(raw);

		data.derivations.forEach((config) => {
			generateSupplementFile(config);
		});
	} catch (err) {
		console.error("❌ Failed to generate supplements:", err);
	}
    console.log(`--------- end runElevators ---------`)
}
