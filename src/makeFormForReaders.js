import fs from "fs";
import path from "path";
import { all_toolsFile } from "../scripts/config.js";

import { generateSupplementFileExporter } from "./generateSupplementFileExporter.js";
import { generateSupplementFileImporter } from "./generateSupplementFileImporter.js";
import { generateSupplementFileViewer } from "./generateSupplementFileViewer.js";
import { generateSupplementFileBridge } from "./generateSupplementFileBridge.js";

/**
 * Generates a supplement file for the given className and config.
 * @param {string} className - The class name for the function and file.
 * @param {Object} config - Configuration object containing base, derived, and fieldsToAdd.
 */

// ES module fetch wrapper
async function downloadFile(url, output) {
    // ✅ Skip if file already exists
    if (fs.existsSync(output)) {
        console.log(`File already exists, skipping: ${output}`);
        return;
    }

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
    }

    const data = await response.text();
    fs.writeFileSync(output, data, "utf8");
    console.log(`...async File saved to ${output}`);
}

export function mainMakeForm() {
	// Load derivations
	const data = JSON.parse(fs.readFileSync(all_toolsFile, "utf8"));

	//const result = [];

	data.list.forEach((item) => {
		item.listObject.forEach((innerItem) => {
			if (innerItem.type === "bridge") {
				/*
	
			
			"formFields" :[
				{
					"dataPropertyName": "jsonSpectrum",
					"label": "NMR file (.json) - testing needing input file to complement one object towards another",
					"defaultValue": "dummy.json",
					"type": "file"
				},	
				{
					"dataPropertyName": "origin",
					"label": "origin",
					"defaultValue": "[Insert here the source of the data]",
					"baseType": "string"
				},	
				{
					"dataPropertyName": "frequency",
					"label": "Larmor frequency",
					"defaultValue": 500.0,
					"baseType": "double"
				}
			]

			//		"objectSchemaSource": "NMRspinSystemModel_CSA",
	//		"object": "NMRspinSystemModel_CSA",
	//		"objectSchemaTarget": "nmrSpectrumObject",
	//		"objectTarget": "NMRspectrumObject",
	//		"type": "bridge",
	//		"title": "Simulation powder-pattern spectrum from diagonal CSA",
	//		"sourceVersion": 1,
	//		"targetVersion": 1,
		}
	],
	
				

				*/
				// extract info from extraMethodsStatements.json files
				const input = {
					// innerItem ///////////////////////////////////////////////////
					objectSchemaSource: innerItem.objectSchemaSource, // here only
					object: innerItem.object, // same
					objectSchemaTarget: innerItem.objectSchemaTarget, // here only
					objectTarget: innerItem.objectTarget, // here only
					formFields: innerItem.formFields, // here only
					//objectObj: innerItem.objectObj,
					type: innerItem.type,// OK
					title: innerItem.title, // OK
					fieldsToAdd: innerItem.formFields, // diff
					jsLibraryGet: innerItem.jsLibraryGet,  // OK
					sourceVersion: innerItem.sourceVersion,  // OK
					targetVersion: innerItem.targetVersion,  // OK

					// item ///////////////////////////////////////////////////
					//jsLibrary: item.jsLibrary,
					creatorParam: item.creatorParam, // OK
					repository: item.repository, // OK
				};
				const target = "html/src_objects"
				input.fileNameAsSavedHere = "../src_objects";

				for (const lib of innerItem.jsLibraryGet) {
	    			const { repository, fileName } = lib;
					const url = `https://raw.githubusercontent.com/${repository}/main/${fileName}`;
					const output = path.join(`${target}/${path.basename(fileName)}`);
					console.log(`===✅ makeFormForBridge : getting ${path.basename(fileName)} in ${target} (from ${repository})`);
				 	downloadFile(url, output).catch(console.error);			
				}

				const url = `https://raw.githubusercontent.com/chemedata/nmr-objects/main/dist/${innerItem.object}.js`;
				const outputDEL = path.join(`./html/src_objects/${innerItem.object}.js`);
				const output = path.join("html", "src_objects", `${innerItem.object}.js`);
				console.log(`<<<✅ makeFormForBridge : Getting (from nmr-objects) ${innerItem.object}.js`)
				downloadFile(url, output).catch(console.error);
				generateSupplementFileBridge(input);
				//result.push(input);
			}		
			if (innerItem.type === "import") {
				// extract info from extraMethodsStatements.json files
				const input = {
					// innerItem
					object: innerItem.object,
					objectObj: innerItem.objectObj,
					type: innerItem.type,
					fieldsToAdd: innerItem.requiredInput, // diff
					jsLibraryGet: innerItem.jsLibraryGet,
					// item
					jsLibrary: item.jsLibrary,
					creatorParam: item.creatorParam,
					repository: item.repository,
				};
				const target = "html/src_objects"
				input.fileNameAsSavedHere = "../src_objects";

				for (const lib of innerItem.jsLibraryGet) {
	    			const { repository, fileName } = lib;
					const url = `https://raw.githubusercontent.com/${repository}/main/${fileName}`;
					const output = path.join(`${target}/${path.basename(fileName)}`);
					console.log(`===✅ makeFormForImport : getting ${path.basename(fileName)} in ${target} (from ${repository})`);
				 	downloadFile(url, output).catch(console.error);			
				}

				const url = `https://raw.githubusercontent.com/chemedata/nmr-objects/main/dist/${innerItem.object}.js`;
				const outputDEL = path.join(`./html/src_objects/${innerItem.object}.js`);
				const output = path.join("html", "src_objects", `${innerItem.object}.js`);
				console.log(`<<<✅ makeFormForReader : Getting (from nmr-objects) ${innerItem.object}.js`)
				downloadFile(url, output).catch(console.error);
				generateSupplementFileImporter(input);
				//result.push(input);
			}		

			if (innerItem.type === "export") {
				// extract info from extraMethodsStatements.json files
				const input = {
					// innerItem
					object: innerItem.object,
					objectObj: innerItem.objectObj,
					type: innerItem.type,
					outputComponents: innerItem.outputComponents, // diff
					jsLibraryGet: innerItem.jsLibraryGet,
					title: innerItem.title,
					// item possibly completely useless ??
					jsLibrary: item.jsLibrary,
					creatorParam: item.creatorParam,
					repository: item.repository,
				};
				const target = "html/src_objects"
				input.fileNameAsSavedHere = "../src_objects";

				for (const lib of innerItem.jsLibraryGet) {
	    			const { repository, fileName } = lib;
					const url = `https://raw.githubusercontent.com/${repository}/main/${fileName}`;
					const output = path.join(`${target}/${path.basename(fileName)}`);
					console.log(`===✅ makeFormForWriter : getting ${path.basename(fileName)} in ${target} (from ${repository})`);
				 	downloadFile(url, output).catch(console.error);			
				}

				const url = `https://raw.githubusercontent.com/chemedata/nmr-objects/main/dist/${innerItem.object}.js`;
				const outputDEL = path.join("./html/src_objects", `${innerItem.object}.js`);
				const output = path.join("html", "src_objects", `${innerItem.object}.js`);
				console.log(`>>>✅ makeFormForWriter : Getting (from nmr-objects) ${innerItem.object}.js`)
				downloadFile(url, output).catch(console.error);
				generateSupplementFileExporter(input);
				//result.push(input);
			}
			if (innerItem.type === "viewer") {
				console.log(`=== For ${innerItem.object}.js`)
				// extract info from extraMethodsStatements.json files
				const input = {
					// innerItem
					object: innerItem.object,
					type: innerItem.type,
					repository: innerItem.repository,
					fileNameViewerUSELESSMAXBE_REDUNDANT: innerItem.fileNameViewerUSELESSMAXBE_REDUNDANT,
					listObjectSchema: innerItem.listObjectSchema,
					jsLibraryView: innerItem.jsLibraryView,
					// item
					jsLibrary: item.jsLibrary,
					creatorParam: item.creatorParam,
					repository: item.repository,
				};
				const target = "html/src_objects"
				innerItem.fileNameAsSavedHere = "../src_objects";

				for (const lib of innerItem.jsLibraryView) {
	    			const { repository, fileName } = lib;
					const url = `https://raw.githubusercontent.com/${repository}/main/${fileName}`;
					const output = path.join(`${target}/${path.basename(fileName)}`);
					console.log(`===✅ makeFormForReader : getting ${path.basename(fileName)} in ${target} (from ${repository})`);
				 	downloadFile(url, output).catch(console.error);			
				}

				generateSupplementFileViewer(innerItem);
				//result.push(input);
			}
		});
	});
}