
import { classHandlerSupFiles } from "../scripts/config.js";
import fs from "fs";
import path from "path";
export function generateSupplementFileViewer(config) {
	const {
		object,
		type,
		jsLibraryView,
		jsLibrary,
		repository,
		fieldsToAdd,
		fileNameViewerUSELESSMAXBE_REDUNDANT,
		creatorParam,
		listObjectSchema,
		fileNameAsSavedHere
	} = config;
	//const className = object;
	//const fileName = `supplement${className}.js`;
	//const creatorParamStringified = JSON.stringify(creatorParam);
	console.log("******************* >>>");
	console.log("object", creatorParam);
	console.log("object", object);
	console.log("type", type);
	//console.log("jsLibraryView", jsLibraryView);
	//console.log("fileNameViewerUSELESSMAXBE_REDUNDANT", fileNameViewerUSELESSMAXBE_REDUNDANT);
	//console.log("fieldsToAdd", fieldsToAdd);
	console.log("repository", repository);
	console.log("listObjectSchema", listObjectSchema);
	console.log("******************* >>>IIIIIIII fileNameAsSavedHere:",fileNameAsSavedHere);
	for (const curtObjSchema of listObjectSchema) {
		console.log("******************* ====", object, "for", curtObjSchema);
		var includeFile = "";
		for (const item of jsLibraryView) {
			if (item.include) {
				includeFile += `import { ${item.include} } from \"${fileNameAsSavedHere}/${path.basename(item.fileName)}\";\n`
				console.log(`prepare: import { ${item.include} } from \"${fileNameAsSavedHere}/${path.basename(item.fileName)}\";`);
			} 
		}
	//         
		const content = `
	${curtObjSchema}_AdditionalViewer() {
		const objClassName = "${curtObjSchema}";
		const myName = \`\${objClassName}_AdditionalViewer\`; // function name don't use js feature in case 'use strict'

		// NSKEA DATA location of automatically inserted code

		// NSKEA start
		function callGenerationGraphic(myName, viewerDataPassed) {
			const frame = document.createElement("div");
			frame.id = myName;
			frame.className = "frame red-frame";
			const container = document.getElementById("dynamicContent");
			container.appendChild(frame);
			// const svg = d3.select("#" + myName).append("svg").attr("width", 200).attr("height", 100);
			const svg = d3.select("#" + myName)
				.append("svg")
				.attr("viewBox", "0 0 900 500") // may be controled by frame size
				.style("width", "100%") // scales with container
				.style("height", "auto")
				.style("display", "block");

			var the${object} = new ${object}(viewerDataPassed, svg);
		}
		// NSKEA end
		const viewerDataPassed = ${object}.getProperDataForVisualization(this, objClassName);
		callGenerationGraphic(myName, viewerDataPassed);
	}
`
		const fileNameMethod = "suppl_"+ curtObjSchema + "_method.js";
		fs.writeFileSync(path.join(classHandlerSupFiles, fileNameMethod), content, "utf8");

		const fileNameInclude = "suppl_"+ curtObjSchema + "_import.js";
		fs.writeFileSync(path.join(classHandlerSupFiles, fileNameInclude), includeFile, "utf8");

		console.log(`✅ Files for ${curtObjSchema} created successfully.`);
	}
}
