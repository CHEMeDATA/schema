#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { execSync } from "child_process";

import { classHandlerDir , classHandlerSupFiles} from "../scripts/config.js";

// Scan for supplement*.js files
export function insertSupplementForViewersClasses() {
	console.log("start insertSupplementForViewersClasses * viewers");

	fs.readdirSync(classHandlerSupFiles)
		.filter((file) => file.startsWith("suppl_") && file.endsWith("_method.js"))
		.forEach((file) => {
			const supplementFile = path.join(classHandlerSupFiles, file);
			if (!fs.statSync(supplementFile).isFile()) return;

			console.log(`Viewer upplement file: ${file}`);

			const objectName = file.replace(/^suppl_/, "").replace(/_method.js$/, "");
						console.log("objectName       ",objectName)

			const file2 = "suppl_" + objectName + "_import.js";
			const supplementFile2 = path.join(classHandlerSupFiles, file2);

			console.log("file",supplementFile)
			console.log("file2",supplementFile2)

			console.log(`Object name: ${objectName}`);

			const objectFile = path.join(classHandlerDir, `${objectName}Handler.js`);
			const objectFileTmp = path.join(
				classHandlerDir,
				`${objectName}_Viewer_Handler_TMP.js`
			);

			if (fs.existsSync(objectFile)) {
				console.log(`✅ Object file exists: ${objectFile}`);

				console.log(`Insertions of ${file} in ${objectFile}`);
				console.log("-------------------------");
				console.log(`Insertions of ${file2} in ${objectFile}`);
				console.log("-------------------------");

				// Show file details like ls -lart
				execSync(`ls -lart "${objectFile}"`, { stdio: "inherit" });

				// Read object file and supplement file
				const objectContent = fs.readFileSync(objectFile, "utf8");
				const supplementContent = fs.readFileSync(supplementFile, "utf8");
				const supplementContent2 = fs.readFileSync(supplementFile2, "utf8");
let updatedContent = "";
if (false){
	// Insert supplement content at marker
				const updatedContent1 = objectContent.replace(
					/\/\/ AUTOMATIC viewer METHOD INSERTION WILL BE MADE HERE/,
					`// AUTOMATIC viewer METHOD INSERTION WILL BE MADE HERE\n${supplementContent}`
				);//IMPORT

				// Insert supplement content at marker
				 updatedContent = updatedContent1.replace(
					/\/\/ AUTOMATIC viewer IMPORT INSERTION WILL BE MADE HERE/,
					`// AUTOMATIC viewer IMPORT INSERTION WILL BE MADE HERE\n${supplementContent2}`
				);//IMPORT
}
else
{


				const METHOD_MARKER = "// AUTOMATIC viewer METHOD INSERTION WILL BE MADE HERE";
				const IMPORT_MARKER = "// AUTOMATIC viewer IMPORT INSERTION WILL BE MADE HERE";

				 updatedContent = objectContent
				  .replace(new RegExp(METHOD_MARKER), `${METHOD_MARKER}\n${supplementContent}`)
				  .replace(new RegExp(IMPORT_MARKER), `${IMPORT_MARKER}\n${supplementContent2}`);

}
			

			

				// Write to temporary file first
				fs.writeFileSync(objectFileTmp, updatedContent, "utf8");

				// Show file details like ls -lart
				execSync(`ls -lart "${supplementFile}"`, { stdio: "inherit" });
				execSync(`ls -lart "${objectFileTmp}"`, { stdio: "inherit" });

				// Replace original file
				fs.renameSync(objectFileTmp, objectFile);
			} else {
				console.log(`❌ Object file missing: ${objectFile}`);
			}
		});
	console.log("Done with insertSupplementForFormInObjectClasses");
}
