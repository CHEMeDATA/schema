// ES module imports
import fs from "fs";
import path from "path";
//import { fileURLToPath } from "url";
import { schemaDir, instanceDir, htmlDir, srcDir, classHandlerSupFiles } from "../scripts/config.js";


/**
 * Converts a schema reference (`$ref`) to a corresponding HTML file link
 * @param {string} ref - The `$ref` value (e.g., "https://example.com/schema.json")
 * @returns {string} - The HTML file name (e.g., "schema.html") or original ref
 */
function getHtmlLink(ref) {
	if (!ref) return "-";
	const fileName = path.basename(ref, ".json") + ".html";
	return `<a href="${fileName}">${fileName}</a>`;
}

/**
 * Create handler JS file for schema
 */
function createHandlerForFile(fileName) {
	const classHandlerFolderRelativeToRootHTMLNoDot = "classHandler"; // could be absolute path

	const shortName = path.basename(fileName, ".json");
	const refCap =
		shortName.charAt(0).toUpperCase() + shortName.slice(1) + "Handler";
	const handlerPath = path.join(
		htmlDir,
		classHandlerFolderRelativeToRootHTMLNoDot
	);
	const handlerPathGeneric = path.join(srcDir, "GENERIChandler.js");
	const refCapMin = shortName.charAt(0).toLowerCase() + shortName.slice(1);

	const handlerPathOut = path.join(handlerPath, `${refCapMin}Handler.js`);

	// 1. Read the generic template
	let content = fs.readFileSync(handlerPathGeneric, "utf8");

	// Add auto-generated comment at the top
	content =
		`// This file was automatically generated. Do not edit manually.\n` +
		content;

	// 2. Replace all occurrences of "GENERIChandler" with handlerClassName
	content = content.replace(/GENERIChandler/g, refCap);

	// 3. Merge content into output file
	fs.writeFileSync(handlerPathOut, content, { flag: "w" });

	// 3. Merge content into output file
	fs.writeFileSync(handlerPathOut, content, { flag: "w" });

	// 4a. Conditionally append the supplemental file (e.g., supObj1.js)
	const supFileName = `sup${shortName}.js`;
	const supFilePath = path.join(classHandlerSupFiles, supFileName);

	if (fs.existsSync(supFilePath)) {
		const supContent = fs.readFileSync(supFilePath, "utf8");
		fs.appendFileSync(handlerPathOut, "\n" + supContent);
				console.log(`     Supplemental file found: ${supFileName}`);
	} else {
		console.log(`Supplemental file not found: ${supFileName}`);
	}

	// 4b. Conditionally append the supplemental file (e.g., supObj1.js)
	const supFileName1 = `supplement${shortName}.js`;
	const supFilePath1 = path.join(classHandlerSupFiles, supFileName1);

	if (fs.existsSync(supFilePath1)) {
		const supContent = fs.readFileSync(supFilePath1, "utf8");
		fs.appendFileSync(handlerPathOut, "\n" + supContent);
	} else {
		console.log(`Supplemental file not found: ${supFileName1}`);
	}

	// 5. Append closing bracket
	fs.appendFileSync(handlerPathOut, "\n}\n");
}

/**
 * Generates an HTML page for a given schema
 * @param {string} fileName - Schema file name (e.g., "groupObject1.json")
 */
function generateHtmlForSchema(fileName, ref) {
	const displayTableProperties = true;
	const filePath = path.join(schemaDir, fileName);
	const schema = JSON.parse(fs.readFileSync(filePath, "utf8"));

	const refCap = ref.charAt(0).toUpperCase() + ref.slice(1);

	// Generate table of components
	let propertiesTable = ``;
	if (displayTableProperties) {
		// Check if schema extends another schema using "allOf"
		let baseSchemaRows = "";
		if (schema["allOf"] && Array.isArray(schema["allOf"])) {
			schema["allOf"].forEach((item) => {
				if (item["$ref"]) {
					const baseSchemaLink = getHtmlLink(item["$ref"]);
					baseSchemaRows += `
                <tr>  <td><strong>Derived from</strong></td>  <td>Object</td>  <td>${baseSchemaLink}</td>  <td>✅ Yes</td>  </tr>`;
				}
			});
		}
		propertiesTable = `<h2>Properties:</h2>
            <table>
                <tr>  <th>Property</th>  <th>Type</th>  <th>Schema Reference</th>  <th>Required</th>  </tr>${baseSchemaRows}`;
		if (schema.properties) {
			Object.keys(schema.properties).forEach((key) => {
				const property = schema.properties[key];
				let type = property.type ? property.type : "Object";
				let schemaRef = property["$ref"] ? getHtmlLink(property["$ref"]) : "-";
				const isRequired =
					schema.required && schema.required.includes(key) ? "✅ Yes" : "❌ No";

				if (type === "array" && property.items) {
					if (property.items.type) {
						schemaRef = property.items.type; // Use the type of array items
					} else if (property.items["$ref"]) {
						schemaRef = getHtmlLink(property.items["$ref"]); // Use the reference of array items
					}
				}

				propertiesTable += `
                <tr>  <td>${key}</td>  <td>${type}</td>  <td>${schemaRef}</td>  <td>${isRequired}</td>  </tr>`;
			});
		} else {
			propertiesTable += `
                <tr><td colspan="4">No properties defined.</td></tr>`;
		}
		propertiesTable += `
            </table>`;
	}

	// Scan instances folder for matching instances
	const instanceFiles = fs.existsSync(instanceDir)
		? fs.readdirSync(instanceDir).filter((file) => file.endsWith(".json"))
		: [];

	const matchingInstances = instanceFiles.filter((instanceFile) => {
		const instancePath = path.join(instanceDir, instanceFile);
		const instanceData = JSON.parse(fs.readFileSync(instancePath, "utf8"));
		return instanceData["$schema"] === schema["$id"];
	});

	let instanceOptions = matchingInstances
		.map((file) => `                <option value="${file}">${file}</option>`)
		.join("\n");

	let instanceSelector =
		matchingInstances.length > 0
			? `
            <h2>Load JSON Instance</h2>
            <select id="instanceSelector">
                <option value="">Select an instance...</option>
${instanceOptions}
            </select>
    `
			: `            <p>No instances found for this schema.</p>`;
	const refCapMaj = refCap; //refCap.charAt(0).toUpperCase() + refCap.slice(1);
	const refCapMin = refCap.charAt(0).toLowerCase() + refCap.slice(1);
	// Generate HTML content
	const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Schema: ${fileName}</title>


            <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                table { border-collapse: collapse; width: 100%; }
                th, td { padding: 10px; border: 1px solid black; text-align: left; }
                th { background-color: #f2f2f2; }
                textarea { width: 100%; height: 200px; font-family: monospace; }
                #validationMessage { font-weight: bold; }
                .frame { padding: 20px; margin: 10px 0; border-radius: 5px; }
                .blue-frame { background-color: #cce5ff; border: 1px solid #007bff; }
                .red-frame { background-color: #f8d7da; border: 1px solid #dc3545; }
                .green-frame { background-color: #d4edda; border: 1px solid #28a745; }
                #returnButton { display: inline-block; padding: 10px 15px; background-color: #007BFF; 
                color: white; text-decoration: none; border-radius: 5px; margin-top: 20px; }
            </style>

        </head>
        <body>

            <h1>Schema: ${fileName}</h1>
            <p><strong>Schema ID:</strong> 
                <a href="${schema["$id"]}" target="_blank">${schema["$id"]}</a>
            </p>

            ${propertiesTable}
            ${instanceSelector}
            <h2>Edit JSON Instance</h2>
            <textarea id="jsonEditor"></textarea>
            <p id="validationMessage"></p>
            <div id="dynamicContent"></div>
            <p>
                <a href="index.html" id="returnButton">⬅ Return to Object List</a>
            </p>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/ajv/6.12.6/ajv.min.js"></script>
            
            <script type="module">
                 //   import Ajv from "https://cdnjs.cloudflare.com/ajax/libs/ajv/6.12.6/ajv.min.js"; // not a module
  import * as d3 from "https://d3js.org/d3.v7.min.js";

  // Local modules (make sure these files have proper exports)
  import { validateJSON } from './src/validateSchema.js';
  import { fetchSchemas } from './src/validateSchema.js';
  //import * as htmlScripts from './src/htmlScripts.js';
  import { loadFromURL, loadInstance, updateFeatureOfObject } from './src/htmlScripts.js';
  import { ${refCapMaj}Handler } from './classHandler/${refCapMin}Handler.js';
  import { JgraphObject } from './src_objects/jGraphObject.js';
  import { NMRspectrumObject } from './src_objects/nmrSpectrumObject.js';
document.addEventListener("DOMContentLoaded", function () {
    const editor = document.getElementById("jsonEditor");
    const selector = document.getElementById("instanceSelector");
    const validationMessage = document.getElementById("validationMessage");

    // Create the mainObject after DOM is ready
    const mainObject = new ${refCapMaj}Handler({});

    if (selector) {
        selector.addEventListener("change", function () {
            loadInstance(selector.value, mainObject, editor, validationMessage);
        });
    }

    // Live validation
    editor.addEventListener("input", function () {
        try {
            const jsonData = editor.isShortDontUseValue ? editor.data : JSON.parse(editor.value);
            const schemas = JSON.parse(editor.dataset.schema || "{}");
            validateJSON(jsonData, schemas, validationMessage);
            updateFeatureOfObject(jsonData, mainObject, editor, validationMessage);
            mainObject.editor = editor;
            mainObject.mainObject = mainObject;
            mainObject.jsonData = jsonData;
            mainObject.validationMessage = validationMessage;
        } catch (err) {
            validationMessage.textContent = "❌ Invalid JSON format";
        }
    });

    // If you want to load from URL
    loadFromURL(mainObject, editor, validationMessage);
});

        </script>
        </body>
        </html>
    `;

	fs.writeFileSync(
		path.join(htmlDir, `${path.basename(fileName, ".json")}.html`),
		htmlContent,
		"utf8"
	);

	createHandlerForFile(fileName);

	return {
		name: fileName,
		link: path.basename(fileName, ".json") + ".html",
	};
}

// Generate HTML for all schemas
export function mainGeneration() {
	var list = [];
	fs.readdirSync(schemaDir).forEach((file) => {
		if (file.endsWith(".json")) {
			console.log("Generating HTML for", file);
			let ref = path.basename(file, ".json"); //file.replace(".json","");
			list.push(generateHtmlForSchema(file, ref));
		}
	});
	return list;
}
/**
 * Generates an index.html file listing all schemas
 */
export function generateIndexPage(schemaList, fileName = "index.html") {
	let indexContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Schema Index</title>  
        </head>
        <body>
            <h1>Schema Documentation</h1>
            <ul>
`;
	schemaList.forEach((schema) => {
		indexContent += `                <li><a href="${
			schema.link
		}">${schema.name.replace(".json", "")}</a></li>\n`;
	});

	indexContent += `            </ul>
        <a href="./index.html">On-line list</a>
        
        </body>
        </html>
    `;

	fs.writeFileSync(path.join(htmlDir, fileName), indexContent, "utf8");
	console.log(`✅ {$fileName} generated successfully!`);
}
