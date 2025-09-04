#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { execSync } from "child_process";

import { classHandlerDir , classHandlerSupFiles} from "../scripts/config.js";

// Scan for supplement*.js files
export function insertSupplementForFormInObjectClasses() {
	console.log("start insertSupplementForFormInObjectClasses");
	console.log("start insertSupplementForFormInObjectClasses");
	console.log("start insertSupplementForFormInObjectClasses");
	console.log("start insertSupplementForFormInObjectClasses");

	fs.readdirSync(classHandlerSupFiles)
		.filter((file) => file.startsWith("supplement") && file.endsWith(".js"))
		.forEach((file) => {
			const supplementFile = path.join(classHandlerSupFiles, file);
			if (!fs.statSync(supplementFile).isFile()) return;

			console.log(`Supplement file: ${file}`);

			// Extract object name: "supplementNMRspectrumObject.js" → "NMRspectrumObject"
			const objectName = file.replace(/^supplement/, "").replace(/\.js$/, "");

			console.log(`Object name: ${objectName}`);

			const file2 = "supImpZZ_" + objectName + ".js";
			const supplementFile2 = path.join(classHandlerSupFiles, file2);


			console.log(`supplementFile2: ${supplementFile2}`);
			const objectNameCapMin = objectName.charAt(0).toLowerCase() + objectName.slice(1);
			const objectFile = path.join(classHandlerDir, `${objectNameCapMin}Handler.js`);
			const objectFileTmp = path.join(
				classHandlerDir,
				`${objectName}Handler_TMP.js`
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
				var supplementContent2 =  "";
				if (fs.existsSync(supplementFile2)) {
					supplementContent2 = fs.readFileSync(supplementFile2, "utf8");
				}

				// Insert supplement content at marker
		//		const updatedContent = objectContent.replace(
		//			/\/\/ AUTOMATIC METHOD INSERTION WILL BE MADE HERE/,
		//			`// AUTOMATIC METHOD INSERTION WILL BE MADE HERE\n${supplementContent}`
		//);
				const METHOD_MARKER = "// AUTOMATIC METHOD INSERTION WILL BE MADE HERE";
				const IMPORT_MARKER = "// AUTOMATIC IMPORT INSERTION WILL BE MADE HERE";

				const updatedContent = objectContent
				  .replace(new RegExp(METHOD_MARKER), `${METHOD_MARKER}\n${supplementContent}`)
				  .replace(new RegExp(IMPORT_MARKER), `${IMPORT_MARKER}\n${supplementContent2}`);
				

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
