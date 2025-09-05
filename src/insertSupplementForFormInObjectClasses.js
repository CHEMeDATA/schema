#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { execSync } from "child_process";

import { classHandlerDir, classHandlerSupFiles } from "../scripts/config.js";

function deduplicateIncludes(jsSource) {
	const lines = jsSource.split(/\r?\n/);
	const seen = new Set();
	const processed = lines.map((line) => {
		const trimmed = line.trim();

		if (trimmed.startsWith("import")) {
			// extract include...; portion
			const semicolonIndex = trimmed.indexOf(";");
			if (semicolonIndex !== -1) {
				const includeStmt = trimmed.slice(0, semicolonIndex + 1);

				if (seen.has(includeStmt)) {
					// already seen → comment it out
					return "// redundant " + line;
				} else {
					// first time → keep and remember
					seen.add(includeStmt);
				}
			}
		}

		return line;
	});
	console.log("seen", seen);

	return processed.join("\n");
}

// Scan for supplement*.js files
export function insertSupplementForFormInObjectClasses(
	supp1string = "supplement",
	supp2string = "supImpZZ_"
) {
	console.log("start insertSupplementForFormInObjectClasses");
	console.log("start insertSupplementForFormInObjectClasses");
	console.log("start insertSupplementForFormInObjectClasses");
	console.log(
		`start insertSupplementForFormInObjectClasses for ${supp1string} and  ${supp2string}`
	);

	fs.readdirSync(classHandlerSupFiles)
		.filter((file) => file.startsWith(supp1string) && file.endsWith(".js"))
		.forEach((file) => {
			const supplementFile = path.join(classHandlerSupFiles, file);
			if (!fs.statSync(supplementFile).isFile()) return;

			console.log(`Supplement file: ${file}`);

			// Extract object name: "supplementNMRspectrumObject.js" → "NMRspectrumObject"
			const objectName = file
				.replace(new RegExp("^" + supp1string), "")
				.replace(/\.js$/, "");

			console.log(`Object name: ${objectName}`);

			const file2 = supp2string + objectName + ".js";
			const supplementFile2 = path.join(classHandlerSupFiles, file2);

			console.log(`supplementFile2: ${supplementFile2}`);
			const objectNameCapMin =
				objectName.charAt(0).toLowerCase() + objectName.slice(1);
			const objectFile = path.join(
				classHandlerDir,
				`${objectNameCapMin}Handler.js`
			);
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

				var supplementContent2 = "";
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
					.replace(
						new RegExp(METHOD_MARKER),
						`${METHOD_MARKER}\n${supplementContent}`
					)
					.replace(
						new RegExp(IMPORT_MARKER),
						`${IMPORT_MARKER}\n${supplementContent2}`
					);

				const updatedContentDedup = deduplicateIncludes(updatedContent);
				// Write to temporary file first
				fs.writeFileSync(objectFileTmp, updatedContentDedup, "utf8");

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
